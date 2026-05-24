import { useState, useEffect, useCallback } from "react";

// ─── GRAPHQL CLIENT ────────────────────────────────────────────────
const GQL_URL = "http://localhost:3000/graphql";

async function gql(query, variables = {}, token) {
  try {
    const res = await fetch(GQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ query, variables }),
    });
    const json = await res.json();
    if (json.errors?.length) throw new Error(json.errors[0].message);
    return { data: json.data, error: null };
  } catch (e) {
    return { data: null, error: e.message };
  }
}

// ─── GRAPHQL OPERATIONS ────────────────────────────────────────────
const OPS = {
  // Auth
  LOGIN: `mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken refreshToken expiresIn
      user { id email firstName lastName role isActive createdAt }
    }
  }`,
  REGISTER: `mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      accessToken refreshToken expiresIn
      user { id email firstName lastName role isActive createdAt }
    }
  }`,

  // Vehicles
  VEHICLES: `query { vehicles { id plateNumber brand model type status currentLatitude currentLongitude createdAt } }`,
  CREATE_VEHICLE: `mutation CreateVehicle($plateNumber: String!, $brand: String!, $model: String!, $type: String!) {
    createVehicle(plateNumber: $plateNumber, brand: $brand, model: $model, type: $type) { id plateNumber }
  }`,
  UPDATE_VEHICLE_STATUS: `mutation UpdateVehicleStatus($vehicleId: String!, $status: String!) {
    updateVehicleStatus(vehicleId: $vehicleId, status: $status) { id status }
  }`,
  RECORD_GPS: `mutation RecordGPS($vehicleId: String!, $latitude: Float!, $longitude: Float!, $speed: Float, $heading: Float) {
    recordGPS(vehicleId: $vehicleId, latitude: $latitude, longitude: $longitude, speed: $speed, heading: $heading) { id latitude longitude speed }
  }`,
  DELETE_VEHICLE: `mutation DeleteVehicle($id: String!) { deleteVehicle(id: $id) { id } }`,

  // Traffic zones
  TRAFFIC_ZONES: `query { trafficZones { id name description centerLatitude centerLongitude radiusKm density vehicleCount averageSpeed createdAt } }`,
  CONGESTED_ZONES: `query { congestedZones { id name density vehicleCount averageSpeed } }`,
  CREATE_ZONE: `mutation CreateTrafficZone($name: String!, $description: String!, $centerLatitude: Float!, $centerLongitude: Float!, $radiusKm: Float!) {
    createTrafficZone(name: $name, description: $description, centerLatitude: $centerLatitude, centerLongitude: $centerLongitude, radiusKm: $radiusKm) { id name }
  }`,
  UPDATE_ZONE_DENSITY: `mutation UpdateZoneDensity($zoneId: String!, $vehicleCount: Float!, $averageSpeed: Float!) {
    updateZoneDensity(zoneId: $zoneId, vehicleCount: $vehicleCount, averageSpeed: $averageSpeed) { id density vehicleCount averageSpeed }
  }`,
  DELETE_ZONE: `mutation DeleteTrafficZone($id: String!) { deleteTrafficZone(id: $id) { id } }`,

  // Incidents
  INCIDENTS: `query { incidents { id type title description status latitude longitude reportedBy assignedTo affectedRoads createdAt } }`,
  ACTIVE_INCIDENTS: `query { activeIncidents { id type title description status latitude longitude reportedBy assignedTo affectedRoads createdAt } }`,
  CREATE_INCIDENT: `mutation CreateIncident($type: String!, $title: String!, $description: String!, $latitude: Float!, $longitude: Float!, $reportedBy: String) {
    createIncident(type: $type, title: $title, description: $description, latitude: $latitude, longitude: $longitude, reportedBy: $reportedBy) { id title }
  }`,
  UPDATE_INCIDENT_STATUS: `mutation UpdateIncidentStatus($incidentId: String!, $status: String!) {
    updateIncidentStatus(incidentId: $incidentId, status: $status) { id status }
  }`,
  ASSIGN_INCIDENT: `mutation AssignIncident($incidentId: String!, $assignedTo: String!) {
    assignIncident(incidentId: $incidentId, assignedTo: $assignedTo) { id assignedTo }
  }`,
  DELETE_INCIDENT: `mutation DeleteIncident($id: String!) { deleteIncident(id: $id) { id } }`,

  // Notifications
  NOTIFICATIONS_BY_USER: `query NotificationsByUser($userId: String!) { notificationsByUser(userId: $userId) { id title message type isRead createdAt } }`,
  UNREAD_NOTIFICATIONS: `query UnreadNotifications($userId: String!) { unreadNotifications(userId: $userId) { id title message type isRead createdAt } }`,
  MARK_READ: `mutation MarkNotificationAsRead($id: String!) { markNotificationAsRead(id: $id) { id isRead } }`,
  MARK_ALL_READ: `mutation MarkAllNotificationsAsRead($userId: String!) { markAllNotificationsAsRead(userId: $userId) { id isRead } }`,
  DELETE_NOTIFICATION: `mutation DeleteNotification($id: String!) { deleteNotification(id: $id) { id } }`,
};

// ─── DESIGN TOKENS ─────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#0a0c10;--bg2:#111318;--bg3:#181c22;
    --border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.13);
    --text:#e8eaf0;--muted:#7a808c;
    --accent:#4f8ef7;--accent2:#7b5cf5;
    --green:#34d399;--amber:#f59e0b;--red:#f87171;--teal:#2dd4bf;
    --font:'DM Sans',sans-serif;--mono:'Space Mono',monospace;
    --r:10px;--rl:16px;--shadow:0 4px 24px rgba(0,0,0,0.4);
  }
  body{font-family:var(--font);background:var(--bg);color:var(--text);min-height:100vh}
  ::-webkit-scrollbar{width:4px;height:4px}
  ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:4px}
  .app{display:flex;height:100vh;overflow:hidden}

  /* Sidebar */
  .sidebar{width:220px;flex-shrink:0;background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column}
  .sidebar-brand{padding:20px 20px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px}
  .brand-icon{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
  .brand-name{font-size:15px;font-weight:600;letter-spacing:-0.3px}
  .brand-sub{font-size:10px;color:var(--muted);font-family:var(--mono);margin-top:1px}
  .sidebar-nav{flex:1;padding:12px 10px;overflow-y:auto}
  .nav-label{font-size:10px;font-weight:600;letter-spacing:.08em;color:var(--muted);text-transform:uppercase;padding:8px 10px 4px}
  .nav-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:var(--r);cursor:pointer;font-size:13.5px;color:var(--muted);transition:all .15s;user-select:none;margin-bottom:2px}
  .nav-item:hover{background:var(--bg3);color:var(--text)}
  .nav-item.active{background:rgba(79,142,247,0.12);color:var(--accent)}
  .nav-item .icon{font-size:16px}
  .sidebar-footer{padding:12px 10px;border-top:1px solid var(--border)}
  .user-card{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:var(--r);cursor:pointer;transition:background .15s}
  .user-card:hover{background:var(--bg3)}
  .user-avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--accent2),var(--teal));display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;flex-shrink:0}
  .user-name{font-size:13px;font-weight:500}
  .user-role{font-size:11px;color:var(--muted)}
  .logout-btn{margin-left:auto;background:none;border:none;color:var(--muted);cursor:pointer;font-size:14px;padding:4px;border-radius:6px;transition:color .15s}
  .logout-btn:hover{color:var(--red)}

  /* Main */
  .main{flex:1;display:flex;flex-direction:column;overflow:hidden}
  .topbar{padding:16px 28px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:var(--bg2);flex-shrink:0}
  .page-title{font-size:18px;font-weight:600;letter-spacing:-0.3px}
  .page-sub{font-size:12px;color:var(--muted);margin-top:2px}
  .content{flex:1;overflow-y:auto;padding:24px 28px}

  /* Cards */
  .card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--rl);padding:20px}
  .card-title{font-size:14px;font-weight:600;margin-bottom:4px}
  .card-sub{font-size:12px;color:var(--muted)}

  /* Stats */
  .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px}
  .stat-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--rl);padding:18px 20px}
  .stat-label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;font-weight:500}
  .stat-value{font-size:26px;font-weight:600;font-family:var(--mono);margin:6px 0 4px;letter-spacing:-1px}
  .stat-delta{font-size:12px;color:var(--muted)}

  /* Grid */
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}

  /* Table */
  .table-wrap{overflow-x:auto}
  table{width:100%;border-collapse:collapse;font-size:13px}
  thead th{text-align:left;padding:10px 14px;font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border)}
  tbody tr{transition:background .12s}
  tbody tr:hover{background:var(--bg3)}
  tbody td{padding:11px 14px;border-bottom:1px solid var(--border);vertical-align:middle}

  /* Badges */
  .badge{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700;font-family:var(--mono)}
  .badge-green{background:rgba(52,211,153,.12);color:var(--green)}
  .badge-amber{background:rgba(245,158,11,.12);color:var(--amber)}
  .badge-red{background:rgba(248,113,113,.12);color:var(--red)}
  .badge-blue{background:rgba(79,142,247,.12);color:var(--accent)}
  .badge-purple{background:rgba(123,92,245,.12);color:var(--accent2)}
  .badge-teal{background:rgba(45,212,191,.12);color:var(--teal)}
  .badge-gray{background:rgba(255,255,255,.05);color:var(--muted)}

  /* Buttons */
  .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:var(--r);font-size:13px;font-weight:500;cursor:pointer;border:1px solid var(--border2);background:var(--bg3);color:var(--text);transition:all .15s;font-family:var(--font)}
  .btn:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.2)}
  .btn:active{transform:scale(.97)}
  .btn-primary{background:var(--accent);border-color:var(--accent);color:#fff}
  .btn-primary:hover{background:#6a9ff8}
  .btn-danger{background:rgba(248,113,113,.1);border-color:var(--red);color:var(--red)}
  .btn-sm{padding:5px 10px;font-size:12px}
  .btn-icon{padding:7px;background:var(--bg3);border:1px solid var(--border);border-radius:var(--r);color:var(--muted);cursor:pointer;transition:all .15s;font-size:14px;display:flex;align-items:center}
  .btn-icon:hover{color:var(--text);border-color:var(--border2)}

  /* Forms */
  .form-group{margin-bottom:16px}
  .form-label{display:block;font-size:12px;font-weight:500;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em}
  .form-input,.form-select,.form-textarea{width:100%;padding:9px 12px;background:var(--bg3);border:1px solid var(--border2);border-radius:var(--r);color:var(--text);font-size:13.5px;font-family:var(--font);transition:border-color .15s;outline:none}
  .form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(79,142,247,.15)}
  .form-select option{background:var(--bg2)}
  .form-textarea{resize:vertical;min-height:80px}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}

  /* Modal */
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px}
  .modal{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--rl);padding:24px;width:100%;max-width:500px;box-shadow:var(--shadow);animation:slideUp .2s ease}
  .modal-wide{max-width:640px}
  @keyframes slideUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
  .modal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
  .modal-title{font-size:16px;font-weight:600}
  .modal-footer{display:flex;justify-content:flex-end;gap:10px;margin-top:20px}

  /* Alert */
  .alert{display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:var(--r);font-size:13px;margin-bottom:16px}
  .alert-error{background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.2);color:var(--red)}
  .alert-success{background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.2);color:var(--green)}
  .alert-info{background:rgba(79,142,247,.1);border:1px solid rgba(79,142,247,.2);color:var(--accent)}

  /* Auth */
  .auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);background-image:radial-gradient(ellipse at 20% 50%,rgba(79,142,247,.06) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(123,92,245,.05) 0%,transparent 60%)}
  .auth-box{width:100%;max-width:400px;background:var(--bg2);border:1px solid var(--border2);border-radius:var(--rl);padding:36px 32px;box-shadow:var(--shadow)}
  .auth-logo{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:20px}
  .auth-title{font-size:22px;font-weight:600;letter-spacing:-0.5px;margin-bottom:6px}
  .auth-sub{font-size:13px;color:var(--muted);margin-bottom:28px}
  .auth-switch{text-align:center;margin-top:20px;font-size:13px;color:var(--muted)}
  .auth-switch a{color:var(--accent);cursor:pointer}

  /* Map */
  .map-placeholder{background:var(--bg3);border:1px solid var(--border);border-radius:var(--r);position:relative;overflow:hidden;height:300px;display:flex;align-items:center;justify-content:center}
  .map-grid{position:absolute;inset:0;opacity:.15;background-image:linear-gradient(var(--border2) 1px,transparent 1px),linear-gradient(90deg,var(--border2) 1px,transparent 1px);background-size:40px 40px}
  .map-dot{position:absolute;border-radius:50%;animation:pulse 2s ease-in-out infinite}
  @keyframes pulse{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.4);opacity:.5}}

  /* Notifications */
  .notif-item{display:flex;align-items:flex-start;gap:12px;padding:14px 0;border-bottom:1px solid var(--border);cursor:pointer}
  .notif-item:last-child{border-bottom:none}
  .notif-icon-wrap{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px}
  .notif-title{font-size:13.5px;font-weight:500;margin-bottom:2px}
  .notif-msg{font-size:12.5px;color:var(--muted)}
  .notif-time{font-size:11px;color:var(--muted);margin-top:4px;font-family:var(--mono)}
  .unread-dot{width:7px;height:7px;background:var(--accent);border-radius:50%;margin-top:5px;flex-shrink:0}

  /* Zone density */
  .density-bar{height:4px;border-radius:2px;background:var(--bg3);overflow:hidden;margin-top:6px}
  .density-fill{height:100%;border-radius:2px;transition:width .3s}

  /* Misc */
  .empty-state{text-align:center;padding:48px 24px;color:var(--muted)}
  .empty-icon{font-size:40px;margin-bottom:12px;opacity:.4}
  .empty-text{font-size:14px}
  .spinner{width:20px;height:20px;border-radius:50%;border:2px solid var(--border2);border-top-color:var(--accent);animation:spin .7s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  .chip{display:inline-block;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:500;background:var(--bg3);color:var(--muted);border:1px solid var(--border);margin:2px}
  .mt-24{margin-top:24px}
  @media(max-width:900px){.stats-grid{grid-template-columns:1fr 1fr}.grid-2,.grid-3{grid-template-columns:1fr}}
`;

// ─── HELPERS ──────────────────────────────────────────────────────
const fmt = d => d ? new Date(d).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}) : "—";
const timeAgo = d => {
  if (!d) return "";
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  return `${Math.floor(s/3600)}h ago`;
};
const densityColor  = d => d==="HIGH"?"var(--red)":d==="MEDIUM"?"var(--amber)":"var(--green)";
const densityBadge  = d => d==="HIGH"?"badge-red":d==="MEDIUM"?"badge-amber":"badge-green";
const incBadge      = s => s==="RESOLVED"?"badge-green":s==="IN_PROGRESS"?"badge-amber":"badge-red";
const notifIcon     = t => ({INCIDENT:"🚨",TRAFFIC_ALERT:"🚦",VEHICLE_UPDATE:"🚗",SYSTEM:"⚙️"}[t]||"📢");
const notifBg       = t => ({INCIDENT:"rgba(248,113,113,.15)",TRAFFIC_ALERT:"rgba(245,158,11,.15)",VEHICLE_UPDATE:"rgba(79,142,247,.15)"}[t]||"rgba(255,255,255,.05)");
const typeIcon      = t => ({ACCIDENT:"💥",CONSTRUCTION:"🏗️",ROAD_CLOSED:"🚫",CONGESTION:"🚦"}[t]||"⚠️");

// ─── ATOMS ────────────────────────────────────────────────────────
const Spinner = () => <div className="spinner"/>;
const Alert = ({ type="error", children }) => <div className={`alert alert-${type}`}><span>{children}</span></div>;

function Modal({ title, onClose, wide, children }) {
  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className={`modal${wide?" modal-wide":""}`}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────
function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email:"", password:"", firstName:"", lastName:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault(); setError(""); setLoading(true);
    const op = mode === "login" ? OPS.LOGIN : OPS.REGISTER;
    const vars = mode === "login"
      ? { email: form.email, password: form.password }
      : { email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName };
    const { data, error: err } = await gql(op, vars);
    setLoading(false);
    if (err) { setError(err); return; }
    const result = data?.login || data?.register;
    if (!result) { setError("Unexpected response"); return; }
    onAuth(result);
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-logo">🚦</div>
        <div className="auth-title">{mode === "login" ? "Sign in" : "Create account"}</div>
        <div className="auth-sub">{mode === "login" ? "Traffic Management System" : "Register for TrafficMS"}</div>
        {error && <Alert>{error}</Alert>}
        <form onSubmit={submit}>
          {mode === "register" && (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First name</label>
                <input className="form-input" value={form.firstName} onChange={set("firstName")} required/>
              </div>
              <div className="form-group">
                <label className="form-label">Last name</label>
                <input className="form-input" value={form.lastName} onChange={set("lastName")} required/>
              </div>
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={form.email} onChange={set("email")} required/>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={form.password} onChange={set("password")} required/>
          </div>
          <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",marginTop:4}} disabled={loading}>
            {loading ? <Spinner/> : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
        <div className="auth-switch">
          {mode === "login"
            ? <>No account? <a onClick={()=>setMode("register")}>Register</a></>
            : <>Have an account? <a onClick={()=>setMode("login")}>Sign in</a></>}
        </div>
      </div>
    </div>
  );
}

// ─── OVERVIEW ─────────────────────────────────────────────────────
function Overview({ token }) {
  const [vehicles, setVehicles] = useState([]);
  const [zones, setZones] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function load() {
      const [v, z, i] = await Promise.all([
        gql(OPS.VEHICLES, {}, token),
        gql(OPS.TRAFFIC_ZONES, {}, token),
        gql(OPS.ACTIVE_INCIDENTS, {}, token),
      ]);
      setVehicles(v.data?.vehicles || []);
      setZones(z.data?.trafficZones || []);
      setIncidents(i.data?.activeIncidents || []);
    }
    load();
  }, [token]);

  return (
    <div>
      <div className="stats-grid">
        {[
          { label:"Active vehicles",  value: vehicles.length, icon:"🚗", sub:"tracked fleet",           color:"var(--accent)" },
          { label:"Traffic zones",    value: zones.length,    icon:"🗺️", sub:`${zones.filter(z=>z.density==="HIGH").length} congested`, color:"var(--teal)" },
          { label:"Active incidents", value: incidents.length,icon:"⚠️", sub:"needs attention",         color: incidents.length > 0 ? "var(--red)" : "var(--green)" },
          { label:"System status",    value:"OK",             icon:"✅", sub:"gateway reachable",        color:"var(--green)" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{color:s.color,fontSize:typeof s.value==="string"?18:26}}>{s.icon} {s.value}</div>
            <div className="stat-delta">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title" style={{marginBottom:12}}>Active incidents</div>
          {incidents.length === 0
            ? <div className="empty-state"><div className="empty-icon">✅</div><div className="empty-text">No active incidents</div></div>
            : incidents.slice(0,5).map(inc => (
              <div key={inc.id} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",borderBottom:"1px solid var(--border)"}}>
                <span style={{fontSize:18}}>{typeIcon(inc.type)}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{inc.title}</div>
                  <div style={{fontSize:11,color:"var(--muted)"}}>{inc.type} · {timeAgo(inc.createdAt)}</div>
                </div>
                <span className={`badge ${incBadge(inc.status)}`}>{inc.status}</span>
              </div>
            ))
          }
        </div>

        <div className="card">
          <div className="card-title" style={{marginBottom:12}}>Traffic zones</div>
          {zones.length === 0
            ? <div className="empty-state"><div className="empty-icon">🗺️</div><div className="empty-text">No zones defined</div></div>
            : zones.slice(0,5).map(z => (
              <div key={z.id} style={{marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{fontSize:13,fontWeight:500}}>{z.name}</span>
                  <span className={`badge ${densityBadge(z.density)}`}>{z.density}</span>
                </div>
                <div style={{fontSize:11,color:"var(--muted)",marginBottom:3}}>{z.vehicleCount} vehicles · avg {z.averageSpeed ?? 0} km/h</div>
                <div className="density-bar">
                  <div className="density-fill" style={{width:z.density==="HIGH"?"90%":z.density==="MEDIUM"?"55%":"20%",background:densityColor(z.density)}}/>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="card mt-24">
        <div className="card-title" style={{marginBottom:4}}>Live map</div>
        <div className="card-sub" style={{marginBottom:14}}>Vehicle & incident positions (mock — connect Leaflet for real tracking)</div>
        <div className="map-placeholder">
          <div className="map-grid"/>
          {[
            {top:"30%",left:"25%",size:10,color:"var(--accent)",delay:0},
            {top:"55%",left:"60%",size:14,color:"var(--red)",delay:.5},
            {top:"40%",left:"45%",size:10,color:"var(--accent)",delay:1},
            {top:"70%",left:"30%",size:12,color:"var(--amber)",delay:.3},
            {top:"20%",left:"70%",size:10,color:"var(--accent)",delay:.8},
            {top:"60%",left:"75%",size:10,color:"var(--green)",delay:1.2},
          ].map((d,i) => (
            <div key={i} className="map-dot" style={{top:d.top,left:d.left,width:d.size,height:d.size,background:d.color,animationDelay:`${d.delay}s`,boxShadow:`0 0 8px ${d.color}`}}/>
          ))}
          <div style={{position:"relative",textAlign:"center",color:"var(--muted)",fontSize:13}}>
            <div style={{fontSize:24,marginBottom:8}}>🗺️</div>
            <code style={{fontSize:12,background:"var(--bg2)",padding:"4px 10px",borderRadius:6,border:"1px solid var(--border)"}}>npm install leaflet react-leaflet</code>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── VEHICLES ─────────────────────────────────────────────────────
function Vehicles({ token }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showGPS, setShowGPS] = useState(null);
  const [form, setForm] = useState({ plateNumber:"", brand:"", model:"", type:"CAR" });
  const [gpsForm, setGpsForm] = useState({ latitude:"", longitude:"", speed:"", heading:"" });
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await gql(OPS.VEHICLES, {}, token);
    setLoading(false);
    setVehicles(data?.vehicles || []);
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const setG = k => e => setGpsForm(p => ({ ...p, [k]: e.target.value }));

  async function addVehicle(e) {
    e.preventDefault(); setFormErr(""); setSaving(true);
    const { error: err } = await gql(OPS.CREATE_VEHICLE, form, token);
    setSaving(false);
    if (err) { setFormErr(err); return; }
    setShowAdd(false); setForm({ plateNumber:"", brand:"", model:"", type:"CAR" }); load();
  }

  async function recordGPS(e) {
    e.preventDefault(); setFormErr(""); setSaving(true);
    const vars = {
      vehicleId: showGPS,
      latitude: parseFloat(gpsForm.latitude),
      longitude: parseFloat(gpsForm.longitude),
      speed: gpsForm.speed ? parseFloat(gpsForm.speed) : null,
      heading: gpsForm.heading ? parseFloat(gpsForm.heading) : null,
    };
    const { error: err } = await gql(OPS.RECORD_GPS, vars, token);
    setSaving(false);
    if (err) { setFormErr(err); return; }
    setShowGPS(null); setGpsForm({ latitude:"", longitude:"", speed:"", heading:"" }); load();
  }

  async function updateStatus(vehicleId, status) {
    await gql(OPS.UPDATE_VEHICLE_STATUS, { vehicleId, status }, token); load();
  }

  async function deleteVehicle(id) {
    if (!confirm("Delete this vehicle?")) return;
    await gql(OPS.DELETE_VEHICLE, { id }, token); load();
  }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:20}}>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>＋ Add vehicle</button>
      </div>
      <div className="card">
        <div className="table-wrap">
          {loading
            ? <div style={{display:"flex",justifyContent:"center",padding:40}}><Spinner/></div>
            : vehicles.length === 0
              ? <div className="empty-state"><div className="empty-icon">🚗</div><div className="empty-text">No vehicles registered</div></div>
              : <table>
                  <thead><tr><th>Plate</th><th>Brand / Model</th><th>Type</th><th>Status</th><th>Last GPS</th><th>Added</th><th>Actions</th></tr></thead>
                  <tbody>
                    {vehicles.map(v => (
                      <tr key={v.id}>
                        <td><span style={{fontFamily:"var(--mono)",fontSize:13,fontWeight:700}}>{v.plateNumber}</span></td>
                        <td>{v.brand} {v.model}</td>
                        <td><span className="badge badge-blue">{v.type}</span></td>
                        <td>
                          <select value={v.status} onChange={e => updateStatus(v.id, e.target.value)}
                            style={{background:"transparent",border:"none",cursor:"pointer",fontSize:12,fontFamily:"var(--mono)",fontWeight:600,
                              color:v.status==="ACTIVE"?"var(--green)":v.status==="MAINTENANCE"?"var(--amber)":"var(--muted)"}}>
                            {["ACTIVE","INACTIVE","MAINTENANCE"].map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td style={{fontSize:12,color:"var(--muted)"}}>
                          {v.currentLatitude ? `${Number(v.currentLatitude).toFixed(4)}, ${Number(v.currentLongitude).toFixed(4)}` : "—"}
                        </td>
                        <td style={{fontSize:12,color:"var(--muted)"}}>{fmt(v.createdAt)}</td>
                        <td>
                          <div style={{display:"flex",gap:6}}>
                            <button className="btn btn-sm" onClick={() => setShowGPS(v.id)}>📍 GPS</button>
                            <button className="btn btn-sm btn-danger" onClick={() => deleteVehicle(v.id)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
          }
        </div>
      </div>

      {showAdd && (
        <Modal title="Add vehicle" onClose={() => setShowAdd(false)}>
          {formErr && <Alert>{formErr}</Alert>}
          <form onSubmit={addVehicle}>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Plate number</label><input className="form-input" value={form.plateNumber} onChange={set("plateNumber")} required/></div>
              <div className="form-group"><label className="form-label">Type</label>
                <select className="form-select" value={form.type} onChange={set("type")}>
                  {["CAR","TRUCK","BUS","MOTORCYCLE","VAN"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Brand</label><input className="form-input" value={form.brand} onChange={set("brand")} required/></div>
              <div className="form-group"><label className="form-label">Model</label><input className="form-input" value={form.model} onChange={set("model")} required/></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" onClick={() => setShowAdd(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? <Spinner/> : "Add vehicle"}</button>
            </div>
          </form>
        </Modal>
      )}

      {showGPS && (
        <Modal title="Record GPS position" onClose={() => setShowGPS(null)}>
          {formErr && <Alert>{formErr}</Alert>}
          <form onSubmit={recordGPS}>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Latitude</label><input className="form-input" type="number" step="any" value={gpsForm.latitude} onChange={setG("latitude")} required placeholder="36.8065"/></div>
              <div className="form-group"><label className="form-label">Longitude</label><input className="form-input" type="number" step="any" value={gpsForm.longitude} onChange={setG("longitude")} required placeholder="10.1815"/></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Speed (km/h)</label><input className="form-input" type="number" step="any" value={gpsForm.speed} onChange={setG("speed")} placeholder="45"/></div>
              <div className="form-group"><label className="form-label">Heading (°)</label><input className="form-input" type="number" step="any" value={gpsForm.heading} onChange={setG("heading")} placeholder="270"/></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" onClick={() => setShowGPS(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? <Spinner/> : "Record GPS"}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─── TRAFFIC ZONES ────────────────────────────────────────────────
function TrafficZones({ token }) {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showDensity, setShowDensity] = useState(null);
  const [form, setForm] = useState({ name:"", description:"", centerLatitude:"", centerLongitude:"", radiusKm:"" });
  const [densityForm, setDensityForm] = useState({ vehicleCount:"", averageSpeed:"" });
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await gql(OPS.TRAFFIC_ZONES, {}, token);
    setLoading(false);
    setZones(data?.trafficZones || []);
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const setD = k => e => setDensityForm(p => ({ ...p, [k]: e.target.value }));

  async function addZone(e) {
    e.preventDefault(); setFormErr(""); setSaving(true);
    const vars = { ...form, centerLatitude: parseFloat(form.centerLatitude), centerLongitude: parseFloat(form.centerLongitude), radiusKm: parseFloat(form.radiusKm) };
    const { error: err } = await gql(OPS.CREATE_ZONE, vars, token);
    setSaving(false);
    if (err) { setFormErr(err); return; }
    setShowAdd(false); setForm({ name:"", description:"", centerLatitude:"", centerLongitude:"", radiusKm:"" }); load();
  }

  async function updateDensity(e) {
    e.preventDefault(); setFormErr(""); setSaving(true);
    const vars = { zoneId: showDensity, vehicleCount: parseInt(densityForm.vehicleCount), averageSpeed: parseFloat(densityForm.averageSpeed) };
    const { error: err } = await gql(OPS.UPDATE_ZONE_DENSITY, vars, token);
    setSaving(false);
    if (err) { setFormErr(err); return; }
    setShowDensity(null); load();
  }

  async function deleteZone(id) {
    if (!confirm("Delete this zone?")) return;
    await gql(OPS.DELETE_ZONE, { id }, token); load();
  }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:20}}>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>＋ Add zone</button>
      </div>

      {loading
        ? <div style={{display:"flex",justifyContent:"center",padding:80}}><Spinner/></div>
        : zones.length === 0
          ? <div className="empty-state"><div className="empty-icon">🗺️</div><div className="empty-text">No traffic zones defined</div></div>
          : <div className="grid-3">
              {zones.map(z => (
                <div key={z.id} className="card">
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
                    <div>
                      <div style={{fontWeight:600,fontSize:15}}>{z.name}</div>
                      <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>{z.description}</div>
                    </div>
                    <span className={`badge ${densityBadge(z.density)}`}>{z.density}</span>
                  </div>
                  <div style={{fontSize:12,color:"var(--muted)",marginBottom:10}}>
                    <div>📍 {Number(z.centerLatitude).toFixed(4)}, {Number(z.centerLongitude).toFixed(4)}</div>
                    <div>⭕ {Number(z.radiusKm).toFixed(1)} km</div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                    <div style={{background:"var(--bg3)",borderRadius:8,padding:"8px 10px"}}>
                      <div style={{fontSize:10,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".05em",fontWeight:500}}>Vehicles</div>
                      <div style={{fontSize:20,fontWeight:600,fontFamily:"var(--mono)",color:"var(--accent)"}}>{z.vehicleCount}</div>
                    </div>
                    <div style={{background:"var(--bg3)",borderRadius:8,padding:"8px 10px"}}>
                      <div style={{fontSize:10,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".05em",fontWeight:500}}>Avg speed</div>
                      <div style={{fontSize:20,fontWeight:600,fontFamily:"var(--mono)",color:"var(--teal)"}}>{z.averageSpeed ?? 0}</div>
                    </div>
                  </div>
                  <div className="density-bar" style={{marginBottom:12}}>
                    <div className="density-fill" style={{width:z.density==="HIGH"?"90%":z.density==="MEDIUM"?"55%":"20%",background:densityColor(z.density)}}/>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button className="btn btn-sm" style={{flex:1,justifyContent:"center"}}
                      onClick={() => { setShowDensity(z.id); setDensityForm({ vehicleCount: z.vehicleCount, averageSpeed: z.averageSpeed ?? "" }); }}>
                      Update density
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteZone(z.id)}>🗑</button>
                  </div>
                </div>
              ))}
            </div>
      }

      {showAdd && (
        <Modal title="Add traffic zone" onClose={() => setShowAdd(false)}>
          {formErr && <Alert>{formErr}</Alert>}
          <form onSubmit={addZone}>
            <div className="form-group"><label className="form-label">Zone name</label><input className="form-input" value={form.name} onChange={set("name")} required placeholder="Downtown Core"/></div>
            <div className="form-group"><label className="form-label">Description</label><input className="form-input" value={form.description} onChange={set("description")} required placeholder="Central business district"/></div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Center latitude</label><input className="form-input" type="number" step="any" value={form.centerLatitude} onChange={set("centerLatitude")} required placeholder="36.8065"/></div>
              <div className="form-group"><label className="form-label">Center longitude</label><input className="form-input" type="number" step="any" value={form.centerLongitude} onChange={set("centerLongitude")} required placeholder="10.1815"/></div>
            </div>
            <div className="form-group"><label className="form-label">Radius (km)</label><input className="form-input" type="number" step="any" value={form.radiusKm} onChange={set("radiusKm")} required placeholder="2.5"/></div>
            <div className="modal-footer">
              <button type="button" className="btn" onClick={() => setShowAdd(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? <Spinner/> : "Add zone"}</button>
            </div>
          </form>
        </Modal>
      )}

      {showDensity && (
        <Modal title="Update density" onClose={() => setShowDensity(null)}>
          {formErr && <Alert>{formErr}</Alert>}
          <Alert type="info">HIGH density = vehicles &gt; 50 and avg speed &lt; 10 km/h</Alert>
          <form onSubmit={updateDensity}>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Vehicle count</label><input className="form-input" type="number" value={densityForm.vehicleCount} onChange={setD("vehicleCount")} required/></div>
              <div className="form-group"><label className="form-label">Avg speed (km/h)</label><input className="form-input" type="number" step="any" value={densityForm.averageSpeed} onChange={setD("averageSpeed")} required/></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" onClick={() => setShowDensity(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? <Spinner/> : "Update"}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─── INCIDENTS ────────────────────────────────────────────────────
function Incidents({ token, user }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ type:"ACCIDENT", title:"", description:"", latitude:"", longitude:"", reportedBy:"" });
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const op = filter === "active" ? OPS.ACTIVE_INCIDENTS : OPS.INCIDENTS;
    const { data } = await gql(op, {}, token);
    setLoading(false);
    setIncidents(data?.activeIncidents || data?.incidents || []);
  }, [token, filter]);

  useEffect(() => { load(); }, [load]);

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  async function addIncident(e) {
    e.preventDefault(); setFormErr(""); setSaving(true);
    const vars = { ...form, latitude: parseFloat(form.latitude), longitude: parseFloat(form.longitude) };
    const { error: err } = await gql(OPS.CREATE_INCIDENT, vars, token);
    setSaving(false);
    if (err) { setFormErr(err); return; }
    setShowAdd(false); setForm({ type:"ACCIDENT", title:"", description:"", latitude:"", longitude:"", reportedBy:"" }); load();
  }

  async function updateStatus(incidentId, status) {
    await gql(OPS.UPDATE_INCIDENT_STATUS, { incidentId, status }, token); load();
  }

  async function assignIncident(incidentId) {
    const assignedTo = user?.email || "operator@example.com";
    await gql(OPS.ASSIGN_INCIDENT, { incidentId, assignedTo }, token); load();
  }

  async function deleteIncident(id) {
    if (!confirm("Delete this incident?")) return;
    await gql(OPS.DELETE_INCIDENT, { id }, token); load();
  }

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div style={{display:"flex",gap:6}}>
          {["all","active"].map(f => (
            <button key={f} className={`btn btn-sm${filter===f?" btn-primary":""}`} onClick={() => setFilter(f)}>
              {f === "all" ? "All" : "Active only"}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>＋ Report incident</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          {loading
            ? <div style={{display:"flex",justifyContent:"center",padding:40}}><Spinner/></div>
            : incidents.length === 0
              ? <div className="empty-state"><div className="empty-icon">✅</div><div className="empty-text">No incidents found</div></div>
              : <table>
                  <thead><tr><th>Type</th><th>Title</th><th>Status</th><th>Location</th><th>Reported</th><th>Assigned</th><th></th></tr></thead>
                  <tbody>
                    {incidents.map(inc => (
                      <tr key={inc.id}>
                        <td>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <span style={{fontSize:16}}>{typeIcon(inc.type)}</span>
                            <span className="badge badge-purple">{inc.type}</span>
                          </div>
                        </td>
                        <td>
                          <div style={{fontWeight:500,fontSize:13}}>{inc.title}</div>
                          <div style={{fontSize:11,color:"var(--muted)",maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{inc.description}</div>
                          {inc.affectedRoads?.length > 0 && inc.affectedRoads.slice(0,2).map(r => <span key={r} className="chip">{r}</span>)}
                        </td>
                        <td>
                          <select value={inc.status} onChange={e => updateStatus(inc.id, e.target.value)}
                            style={{background:"transparent",border:"none",cursor:"pointer",fontSize:12,fontFamily:"var(--mono)",fontWeight:600,
                              color:inc.status==="RESOLVED"?"var(--green)":inc.status==="IN_PROGRESS"?"var(--amber)":"var(--red)"}}>
                            {["REPORTED","IN_PROGRESS","RESOLVED"].map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td style={{fontSize:12,color:"var(--muted)"}}>{Number(inc.latitude).toFixed(4)}, {Number(inc.longitude).toFixed(4)}</td>
                        <td style={{fontSize:12,color:"var(--muted)"}}>{timeAgo(inc.createdAt)}</td>
                        <td style={{fontSize:12}}>
                          {inc.assignedTo
                            ? <span style={{color:"var(--teal)",fontSize:12}}>{inc.assignedTo}</span>
                            : <button className="btn btn-sm" onClick={() => assignIncident(inc.id)}>Assign me</button>}
                        </td>
                        <td><button className="btn btn-sm btn-danger" onClick={() => deleteIncident(inc.id)}>🗑</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
          }
        </div>
      </div>

      {showAdd && (
        <Modal title="Report incident" onClose={() => setShowAdd(false)} wide>
          {formErr && <Alert>{formErr}</Alert>}
          <form onSubmit={addIncident}>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Type</label>
                <select className="form-select" value={form.type} onChange={set("type")}>
                  {["ACCIDENT","CONSTRUCTION","ROAD_CLOSED","CONGESTION"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">Reported by</label><input className="form-input" value={form.reportedBy} onChange={set("reportedBy")} placeholder={user?.email}/></div>
            </div>
            <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title} onChange={set("title")} required placeholder="Car collision on Main Street"/></div>
            <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={form.description} onChange={set("description")} required placeholder="Details..."/></div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Latitude</label><input className="form-input" type="number" step="any" value={form.latitude} onChange={set("latitude")} required/></div>
              <div className="form-group"><label className="form-label">Longitude</label><input className="form-input" type="number" step="any" value={form.longitude} onChange={set("longitude")} required/></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" onClick={() => setShowAdd(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? <Spinner/> : "Report"}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────
function Notifications({ token, user }) {
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    const op = filter === "unread" ? OPS.UNREAD_NOTIFICATIONS : OPS.NOTIFICATIONS_BY_USER;
    const { data } = await gql(op, { userId: user.id }, token);
    setLoading(false);
    setNotifs(data?.notificationsByUser || data?.unreadNotifications || []);
  }, [token, user, filter]);

  useEffect(() => { load(); }, [load]);

  async function markRead(id) {
    await gql(OPS.MARK_READ, { id }, token); load();
  }
  async function markAllRead() {
    if (!user?.id) return;
    await gql(OPS.MARK_ALL_READ, { userId: user.id }, token); load();
  }
  async function deleteNotif(id) {
    await gql(OPS.DELETE_NOTIFICATION, { id }, token); load();
  }

  const unreadCount = notifs.filter(n => !n.isRead).length;

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div style={{display:"flex",gap:6}}>
          {["all","unread"].map(f => (
            <button key={f} className={`btn btn-sm${filter===f?" btn-primary":""}`} onClick={() => setFilter(f)}>
              {f === "all" ? "All" : `Unread${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
            </button>
          ))}
        </div>
        {unreadCount > 0 && <button className="btn btn-sm" onClick={markAllRead}>✓ Mark all read</button>}
      </div>

      <div className="card">
        {loading
          ? <div style={{display:"flex",justifyContent:"center",padding:40}}><Spinner/></div>
          : notifs.length === 0
            ? <div className="empty-state"><div className="empty-icon">🔔</div><div className="empty-text">No notifications</div></div>
            : notifs.map(n => (
              <div key={n.id} className="notif-item" onClick={() => !n.isRead && markRead(n.id)}>
                <div className="notif-icon-wrap" style={{background: notifBg(n.type)}}>{notifIcon(n.type)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div className="notif-title">{n.title}</div>
                  <div className="notif-msg">{n.message}</div>
                  <div className="notif-time">{timeAgo(n.createdAt)} · <span className={`badge ${n.isRead?"badge-gray":"badge-blue"}`}>{n.isRead?"read":"unread"}</span></div>
                </div>
                {!n.isRead && <div className="unread-dot"/>}
                <button className="btn-icon" style={{flexShrink:0}} onClick={e => { e.stopPropagation(); deleteNotif(n.id); }}>✕</button>
              </div>
            ))
        }
      </div>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────
const PAGES = [
  { id:"overview",      label:"Overview",     icon:"📊" },
  { id:"vehicles",      label:"Vehicles",     icon:"🚗" },
  { id:"traffic",       label:"Traffic zones",icon:"🗺️" },
  { id:"incidents",     label:"Incidents",    icon:"⚠️" },
  { id:"notifications", label:"Notifications",icon:"🔔" },
];
const PAGE_SUBS = {
  overview:"System at a glance", vehicles:"Manage fleet",
  traffic:"Zone monitoring", incidents:"Reports & resolution",
  notifications:"Alerts & updates",
};

export default function App() {
  const [auth, setAuth] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tms_auth") || "null"); } catch { return null; }
  });
  const [page, setPage] = useState("overview");

  function handleAuth(data) {
    setAuth(data);
    try { localStorage.setItem("tms_auth", JSON.stringify(data)); } catch {}
  }
  function logout() {
    setAuth(null);
    try { localStorage.removeItem("tms_auth"); } catch {}
  }

  if (!auth) return (<><style>{css}</style><AuthPage onAuth={handleAuth}/></>);

  const token = auth.accessToken;
  const user  = auth.user;
  const initials = user ? `${user.firstName?.[0]||""}${user.lastName?.[0]||""}`.toUpperCase() : "?";

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-icon">🚦</div>
            <div>
              <div className="brand-name">TrafficMS</div>
              <div className="brand-sub">GraphQL · LIVE</div>
            </div>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-label">Navigation</div>
            {PAGES.map(p => (
              <div key={p.id} className={`nav-item${page===p.id?" active":""}`} onClick={() => setPage(p.id)}>
                <span className="icon">{p.icon}</span>{p.label}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar">{initials}</div>
              <div style={{minWidth:0}}>
                <div className="user-name">{user?.firstName} {user?.lastName}</div>
                <div className="user-role">{user?.role || "OPERATOR"}</div>
              </div>
              <button className="logout-btn" onClick={logout} title="Sign out">⏏</button>
            </div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div>
              <div className="page-title">{PAGES.find(p=>p.id===page)?.label}</div>
              <div className="page-sub">{PAGE_SUBS[page]}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{fontSize:11,fontFamily:"var(--mono)",color:"var(--muted)",background:"var(--bg3)",padding:"4px 10px",borderRadius:6,border:"1px solid var(--border)"}}>
                {GQL_URL}
              </div>
            </div>
          </div>
          <div className="content">
            {page === "overview"      && <Overview      token={token}/>}
            {page === "vehicles"      && <Vehicles      token={token}/>}
            {page === "traffic"       && <TrafficZones  token={token}/>}
            {page === "incidents"     && <Incidents     token={token} user={user}/>}
            {page === "notifications" && <Notifications token={token} user={user}/>}
          </div>
        </main>
      </div>
    </>
  );
}
