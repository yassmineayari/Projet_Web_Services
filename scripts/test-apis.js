const http = require('http');
const https = require('https');

const results = [];
const uid = Date.now();
let userId;
let vehicleId;
let zoneId;
let incidentId;
let notificationId;
let accessToken;

function request(method, url, body, headers = {}) {
  return new Promise((resolve) => {
    const parsed = new URL(url);
    const lib = parsed.protocol === 'https:' ? https : http;
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
        ...headers,
      },
    };
    const req = lib.request(opts, (res) => {
      let raw = '';
      res.on('data', (c) => (raw += c));
      res.on('end', () => {
        let json = null;
        try {
          json = raw ? JSON.parse(raw) : null;
        } catch {
          json = raw;
        }
        resolve({ status: res.statusCode, body: json, raw });
      });
    });
    req.on('error', (err) => resolve({ status: 0, error: err.message }));
    if (data) req.write(data);
    req.end();
  });
}

function gql(query, variables) {
  return request('POST', 'http://localhost:3000/graphql', { query, variables });
}

async function test(name, fn, acceptStatuses = []) {
  try {
    const out = await fn();
    const ok =
      (out.status >= 200 && out.status < 300) || acceptStatuses.includes(out.status);
    results.push({ name, ok, status: out.status, error: out.error, body: out.body });
    if (!ok) console.log(`FAIL ${name}`, out.status, out.body || out.error);
    else console.log(`OK   ${name}`, out.status);
    return out;
  } catch (e) {
    results.push({ name, ok: false, error: e.message });
    console.log(`FAIL ${name}`, e.message);
    return null;
  }
}

async function main() {
  console.log('=== REST microservices ===\n');

  const restEmail = `test${uid}@traffic.com`;

  await test('Auth register', () =>
    request('POST', 'http://localhost:3001/auth/register', {
      email: restEmail,
      password: 'Password123!',
      firstName: 'Test',
      lastName: 'User',
    }),
  );

  const loginRest = await test('Auth login REST', () =>
    request('POST', 'http://localhost:3001/auth/login', {
      email: restEmail,
      password: 'Password123!',
    }),
  );
  if (loginRest?.body?.accessToken) accessToken = loginRest.body.accessToken;

  await test('Vehicles create REST', async () => {
    const r = await request('POST', 'http://localhost:3002/vehicles', {
      plateNumber: `XY-${uid}`,
      brand: 'Peugeot',
      model: '308',
      type: 'CAR',
    });
    if (r.body?.id) vehicleId = r.body.id;
    return r;
  });

  await test('Vehicles list REST', () => request('GET', 'http://localhost:3002/vehicles'));

  await test('Traffic create zone REST', async () => {
    const r = await request('POST', 'http://localhost:3003/traffic/zones', {
      name: 'Zone Test',
      description: 'Test zone',
      centerLatitude: 48.85,
      centerLongitude: 2.35,
      radiusKm: 1.5,
    });
    if (r.body?.id) zoneId = r.body.id;
    return r;
  });

  await test('Traffic list zones REST', () =>
    request('GET', 'http://localhost:3003/traffic/zones'),
  );

  await test('Incidents create REST', async () => {
    const r = await request('POST', 'http://localhost:3004/incidents', {
      type: 'ACCIDENT',
      title: 'Test incident',
      description: 'Desc',
      latitude: 48.85,
      longitude: 2.35,
    });
    if (r.body?.id) incidentId = r.body.id;
    return r;
  });

  await test('Incidents list REST', () => request('GET', 'http://localhost:3004/incidents'));

  console.log('\n=== GraphQL gateway ===\n');

  const regGql = await test('GQL register', () =>
    gql(
      `mutation($e:String!,$p:String!,$f:String!,$l:String!){
        register(email:$e,password:$p,firstName:$f,lastName:$l){
          accessToken user{ id email }
        }
      }`,
      {
        e: `gql${uid}@traffic.com`,
        p: 'Password123!',
        f: 'Gql',
        l: 'User',
      },
    ),
  );
  if (regGql?.body?.data?.register?.user?.id) userId = regGql.body.data.register.user.id;

  await test('GQL login', () =>
    gql(
      `mutation($e:String!,$p:String!){
        login(email:$e,password:$p){ accessToken user{ id } }
      }`,
      { e: `gql${uid}@traffic.com`, p: 'Password123!' },
    ),
  );

  await test('GQL createVehicle', () =>
    gql(
      `mutation {
        createVehicle(plateNumber:"GQL-${uid}",brand:"Renault",model:"Clio",type:"CAR"){
          id plateNumber status
        }
      }`,
    ),
  );

  await test('GQL vehicles', () =>
    gql(`query { vehicles { id plateNumber } }`),
  );

  await test('GQL createTrafficZone', () =>
    gql(
      `mutation {
        createTrafficZone(name:"GQL Zone",description:"d",centerLatitude:48.8,centerLongitude:2.3,radiusKm:2){
          id name density
        }
      }`,
    ),
  );

  await test('GQL createIncident', () =>
    gql(
      `mutation {
        createIncident(type:"ACCIDENT",title:"GQL Inc",description:"d",latitude:48.8,longitude:2.3){
          id title status
        }
      }`,
    ),
  );

  if (userId) {
    await test('GQL notificationsByUser', () =>
      gql(`query($id:String!){ notificationsByUser(userId:$id){ id } }`, {
        id: userId,
      }),
    );
  }

  const vlist = await gql(`query { vehicles { id } }`);
  const vid = vlist?.body?.data?.vehicles?.[0]?.id;
  if (vid) {
    await test('GQL recordGPS', () =>
      gql(
        `mutation($id:String!){
          recordGPS(vehicleId:$id,latitude:48.86,longitude:2.35,speed:40,heading:90){ id latitude }
        }`,
        { id: vid },
      ),
    );
    await test('GQL vehicleHistory', () =>
      gql(
        `query($id:String!){ vehicleHistory(vehicleId:$id){ vehicle{ id } history{ id } } }`,
        { id: vid },
      ),
    );
  }

  await test('GQL trafficZones (decimals)', () =>
    gql(
      `query { trafficZones { id centerLatitude centerLongitude radiusKm averageSpeed } }`,
    ),
  );

  await test('GQL incidents list', () =>
    gql(`query { incidents { id latitude longitude } }`),
  );

  await test('GQL congestedZones', () =>
    gql(`query { congestedZones { id density } }`),
  );

  const failed = results.filter((r) => !r.ok);
  console.log(`\n=== Summary: ${results.length - failed.length}/${results.length} passed ===`);
  if (failed.length) {
    console.log('\nFailed:');
    failed.forEach((f) => console.log('-', f.name, f.status, JSON.stringify(f.body)?.slice(0, 200)));
    process.exit(1);
  }
}

main();
