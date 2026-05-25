
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model GPSLocation
 * 
 */
export type GPSLocation = $Result.DefaultSelection<Prisma.$GPSLocationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const VehicleStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  MAINTENANCE: 'MAINTENANCE'
};

export type VehicleStatus = (typeof VehicleStatus)[keyof typeof VehicleStatus]

}

export type VehicleStatus = $Enums.VehicleStatus

export const VehicleStatus: typeof $Enums.VehicleStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Vehicles
 * const vehicles = await prisma.vehicle.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Vehicles
   * const vehicles = await prisma.vehicle.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gPSLocation`: Exposes CRUD operations for the **GPSLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GPSLocations
    * const gPSLocations = await prisma.gPSLocation.findMany()
    * ```
    */
  get gPSLocation(): Prisma.GPSLocationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Vehicle: 'Vehicle',
    GPSLocation: 'GPSLocation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "vehicle" | "gPSLocation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      GPSLocation: {
        payload: Prisma.$GPSLocationPayload<ExtArgs>
        fields: Prisma.GPSLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GPSLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GPSLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GPSLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GPSLocationPayload>
          }
          findFirst: {
            args: Prisma.GPSLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GPSLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GPSLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GPSLocationPayload>
          }
          findMany: {
            args: Prisma.GPSLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GPSLocationPayload>[]
          }
          create: {
            args: Prisma.GPSLocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GPSLocationPayload>
          }
          createMany: {
            args: Prisma.GPSLocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GPSLocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GPSLocationPayload>[]
          }
          delete: {
            args: Prisma.GPSLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GPSLocationPayload>
          }
          update: {
            args: Prisma.GPSLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GPSLocationPayload>
          }
          deleteMany: {
            args: Prisma.GPSLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GPSLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GPSLocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GPSLocationPayload>[]
          }
          upsert: {
            args: Prisma.GPSLocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GPSLocationPayload>
          }
          aggregate: {
            args: Prisma.GPSLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGPSLocation>
          }
          groupBy: {
            args: Prisma.GPSLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<GPSLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.GPSLocationCountArgs<ExtArgs>
            result: $Utils.Optional<GPSLocationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    vehicle?: VehicleOmit
    gPSLocation?: GPSLocationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type VehicleCountOutputType
   */

  export type VehicleCountOutputType = {
    gpsLocations: number
  }

  export type VehicleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gpsLocations?: boolean | VehicleCountOutputTypeCountGpsLocationsArgs
  }

  // Custom InputTypes
  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleCountOutputType
     */
    select?: VehicleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountGpsLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GPSLocationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    currentLatitude: Decimal | null
    currentLongitude: Decimal | null
  }

  export type VehicleSumAggregateOutputType = {
    currentLatitude: Decimal | null
    currentLongitude: Decimal | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    plateNumber: string | null
    brand: string | null
    model: string | null
    type: string | null
    status: $Enums.VehicleStatus | null
    currentLatitude: Decimal | null
    currentLongitude: Decimal | null
    driverId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    plateNumber: string | null
    brand: string | null
    model: string | null
    type: string | null
    status: $Enums.VehicleStatus | null
    currentLatitude: Decimal | null
    currentLongitude: Decimal | null
    driverId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    plateNumber: number
    brand: number
    model: number
    type: number
    status: number
    currentLatitude: number
    currentLongitude: number
    driverId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    currentLatitude?: true
    currentLongitude?: true
  }

  export type VehicleSumAggregateInputType = {
    currentLatitude?: true
    currentLongitude?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    plateNumber?: true
    brand?: true
    model?: true
    type?: true
    status?: true
    currentLatitude?: true
    currentLongitude?: true
    driverId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    plateNumber?: true
    brand?: true
    model?: true
    type?: true
    status?: true
    currentLatitude?: true
    currentLongitude?: true
    driverId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    plateNumber?: true
    brand?: true
    model?: true
    type?: true
    status?: true
    currentLatitude?: true
    currentLongitude?: true
    driverId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    plateNumber: string
    brand: string
    model: string
    type: string
    status: $Enums.VehicleStatus
    currentLatitude: Decimal | null
    currentLongitude: Decimal | null
    driverId: string | null
    createdAt: Date
    updatedAt: Date
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plateNumber?: boolean
    brand?: boolean
    model?: boolean
    type?: boolean
    status?: boolean
    currentLatitude?: boolean
    currentLongitude?: boolean
    driverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gpsLocations?: boolean | Vehicle$gpsLocationsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plateNumber?: boolean
    brand?: boolean
    model?: boolean
    type?: boolean
    status?: boolean
    currentLatitude?: boolean
    currentLongitude?: boolean
    driverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plateNumber?: boolean
    brand?: boolean
    model?: boolean
    type?: boolean
    status?: boolean
    currentLatitude?: boolean
    currentLongitude?: boolean
    driverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    plateNumber?: boolean
    brand?: boolean
    model?: boolean
    type?: boolean
    status?: boolean
    currentLatitude?: boolean
    currentLongitude?: boolean
    driverId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "plateNumber" | "brand" | "model" | "type" | "status" | "currentLatitude" | "currentLongitude" | "driverId" | "createdAt" | "updatedAt", ExtArgs["result"]["vehicle"]>
  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gpsLocations?: boolean | Vehicle$gpsLocationsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      gpsLocations: Prisma.$GPSLocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      plateNumber: string
      brand: string
      model: string
      type: string
      status: $Enums.VehicleStatus
      currentLatitude: Prisma.Decimal | null
      currentLongitude: Prisma.Decimal | null
      driverId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gpsLocations<T extends Vehicle$gpsLocationsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$gpsLocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GPSLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vehicle model
   */
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly plateNumber: FieldRef<"Vehicle", 'String'>
    readonly brand: FieldRef<"Vehicle", 'String'>
    readonly model: FieldRef<"Vehicle", 'String'>
    readonly type: FieldRef<"Vehicle", 'String'>
    readonly status: FieldRef<"Vehicle", 'VehicleStatus'>
    readonly currentLatitude: FieldRef<"Vehicle", 'Decimal'>
    readonly currentLongitude: FieldRef<"Vehicle", 'Decimal'>
    readonly driverId: FieldRef<"Vehicle", 'String'>
    readonly createdAt: FieldRef<"Vehicle", 'DateTime'>
    readonly updatedAt: FieldRef<"Vehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle.gpsLocations
   */
  export type Vehicle$gpsLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationInclude<ExtArgs> | null
    where?: GPSLocationWhereInput
    orderBy?: GPSLocationOrderByWithRelationInput | GPSLocationOrderByWithRelationInput[]
    cursor?: GPSLocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GPSLocationScalarFieldEnum | GPSLocationScalarFieldEnum[]
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model GPSLocation
   */

  export type AggregateGPSLocation = {
    _count: GPSLocationCountAggregateOutputType | null
    _avg: GPSLocationAvgAggregateOutputType | null
    _sum: GPSLocationSumAggregateOutputType | null
    _min: GPSLocationMinAggregateOutputType | null
    _max: GPSLocationMaxAggregateOutputType | null
  }

  export type GPSLocationAvgAggregateOutputType = {
    latitude: Decimal | null
    longitude: Decimal | null
    speed: Decimal | null
    heading: Decimal | null
  }

  export type GPSLocationSumAggregateOutputType = {
    latitude: Decimal | null
    longitude: Decimal | null
    speed: Decimal | null
    heading: Decimal | null
  }

  export type GPSLocationMinAggregateOutputType = {
    id: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    speed: Decimal | null
    heading: Decimal | null
    timestamp: Date | null
    vehicleId: string | null
  }

  export type GPSLocationMaxAggregateOutputType = {
    id: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    speed: Decimal | null
    heading: Decimal | null
    timestamp: Date | null
    vehicleId: string | null
  }

  export type GPSLocationCountAggregateOutputType = {
    id: number
    latitude: number
    longitude: number
    speed: number
    heading: number
    timestamp: number
    vehicleId: number
    _all: number
  }


  export type GPSLocationAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
  }

  export type GPSLocationSumAggregateInputType = {
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
  }

  export type GPSLocationMinAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
    timestamp?: true
    vehicleId?: true
  }

  export type GPSLocationMaxAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
    timestamp?: true
    vehicleId?: true
  }

  export type GPSLocationCountAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
    speed?: true
    heading?: true
    timestamp?: true
    vehicleId?: true
    _all?: true
  }

  export type GPSLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GPSLocation to aggregate.
     */
    where?: GPSLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GPSLocations to fetch.
     */
    orderBy?: GPSLocationOrderByWithRelationInput | GPSLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GPSLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GPSLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GPSLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GPSLocations
    **/
    _count?: true | GPSLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GPSLocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GPSLocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GPSLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GPSLocationMaxAggregateInputType
  }

  export type GetGPSLocationAggregateType<T extends GPSLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateGPSLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGPSLocation[P]>
      : GetScalarType<T[P], AggregateGPSLocation[P]>
  }




  export type GPSLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GPSLocationWhereInput
    orderBy?: GPSLocationOrderByWithAggregationInput | GPSLocationOrderByWithAggregationInput[]
    by: GPSLocationScalarFieldEnum[] | GPSLocationScalarFieldEnum
    having?: GPSLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GPSLocationCountAggregateInputType | true
    _avg?: GPSLocationAvgAggregateInputType
    _sum?: GPSLocationSumAggregateInputType
    _min?: GPSLocationMinAggregateInputType
    _max?: GPSLocationMaxAggregateInputType
  }

  export type GPSLocationGroupByOutputType = {
    id: string
    latitude: Decimal
    longitude: Decimal
    speed: Decimal | null
    heading: Decimal | null
    timestamp: Date
    vehicleId: string
    _count: GPSLocationCountAggregateOutputType | null
    _avg: GPSLocationAvgAggregateOutputType | null
    _sum: GPSLocationSumAggregateOutputType | null
    _min: GPSLocationMinAggregateOutputType | null
    _max: GPSLocationMaxAggregateOutputType | null
  }

  type GetGPSLocationGroupByPayload<T extends GPSLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GPSLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GPSLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GPSLocationGroupByOutputType[P]>
            : GetScalarType<T[P], GPSLocationGroupByOutputType[P]>
        }
      >
    >


  export type GPSLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    heading?: boolean
    timestamp?: boolean
    vehicleId?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gPSLocation"]>

  export type GPSLocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    heading?: boolean
    timestamp?: boolean
    vehicleId?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gPSLocation"]>

  export type GPSLocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    heading?: boolean
    timestamp?: boolean
    vehicleId?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gPSLocation"]>

  export type GPSLocationSelectScalar = {
    id?: boolean
    latitude?: boolean
    longitude?: boolean
    speed?: boolean
    heading?: boolean
    timestamp?: boolean
    vehicleId?: boolean
  }

  export type GPSLocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "latitude" | "longitude" | "speed" | "heading" | "timestamp" | "vehicleId", ExtArgs["result"]["gPSLocation"]>
  export type GPSLocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type GPSLocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type GPSLocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $GPSLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GPSLocation"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      latitude: Prisma.Decimal
      longitude: Prisma.Decimal
      speed: Prisma.Decimal | null
      heading: Prisma.Decimal | null
      timestamp: Date
      vehicleId: string
    }, ExtArgs["result"]["gPSLocation"]>
    composites: {}
  }

  type GPSLocationGetPayload<S extends boolean | null | undefined | GPSLocationDefaultArgs> = $Result.GetResult<Prisma.$GPSLocationPayload, S>

  type GPSLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GPSLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GPSLocationCountAggregateInputType | true
    }

  export interface GPSLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GPSLocation'], meta: { name: 'GPSLocation' } }
    /**
     * Find zero or one GPSLocation that matches the filter.
     * @param {GPSLocationFindUniqueArgs} args - Arguments to find a GPSLocation
     * @example
     * // Get one GPSLocation
     * const gPSLocation = await prisma.gPSLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GPSLocationFindUniqueArgs>(args: SelectSubset<T, GPSLocationFindUniqueArgs<ExtArgs>>): Prisma__GPSLocationClient<$Result.GetResult<Prisma.$GPSLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GPSLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GPSLocationFindUniqueOrThrowArgs} args - Arguments to find a GPSLocation
     * @example
     * // Get one GPSLocation
     * const gPSLocation = await prisma.gPSLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GPSLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, GPSLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GPSLocationClient<$Result.GetResult<Prisma.$GPSLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GPSLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GPSLocationFindFirstArgs} args - Arguments to find a GPSLocation
     * @example
     * // Get one GPSLocation
     * const gPSLocation = await prisma.gPSLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GPSLocationFindFirstArgs>(args?: SelectSubset<T, GPSLocationFindFirstArgs<ExtArgs>>): Prisma__GPSLocationClient<$Result.GetResult<Prisma.$GPSLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GPSLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GPSLocationFindFirstOrThrowArgs} args - Arguments to find a GPSLocation
     * @example
     * // Get one GPSLocation
     * const gPSLocation = await prisma.gPSLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GPSLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, GPSLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__GPSLocationClient<$Result.GetResult<Prisma.$GPSLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GPSLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GPSLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GPSLocations
     * const gPSLocations = await prisma.gPSLocation.findMany()
     * 
     * // Get first 10 GPSLocations
     * const gPSLocations = await prisma.gPSLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gPSLocationWithIdOnly = await prisma.gPSLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GPSLocationFindManyArgs>(args?: SelectSubset<T, GPSLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GPSLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GPSLocation.
     * @param {GPSLocationCreateArgs} args - Arguments to create a GPSLocation.
     * @example
     * // Create one GPSLocation
     * const GPSLocation = await prisma.gPSLocation.create({
     *   data: {
     *     // ... data to create a GPSLocation
     *   }
     * })
     * 
     */
    create<T extends GPSLocationCreateArgs>(args: SelectSubset<T, GPSLocationCreateArgs<ExtArgs>>): Prisma__GPSLocationClient<$Result.GetResult<Prisma.$GPSLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GPSLocations.
     * @param {GPSLocationCreateManyArgs} args - Arguments to create many GPSLocations.
     * @example
     * // Create many GPSLocations
     * const gPSLocation = await prisma.gPSLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GPSLocationCreateManyArgs>(args?: SelectSubset<T, GPSLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GPSLocations and returns the data saved in the database.
     * @param {GPSLocationCreateManyAndReturnArgs} args - Arguments to create many GPSLocations.
     * @example
     * // Create many GPSLocations
     * const gPSLocation = await prisma.gPSLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GPSLocations and only return the `id`
     * const gPSLocationWithIdOnly = await prisma.gPSLocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GPSLocationCreateManyAndReturnArgs>(args?: SelectSubset<T, GPSLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GPSLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GPSLocation.
     * @param {GPSLocationDeleteArgs} args - Arguments to delete one GPSLocation.
     * @example
     * // Delete one GPSLocation
     * const GPSLocation = await prisma.gPSLocation.delete({
     *   where: {
     *     // ... filter to delete one GPSLocation
     *   }
     * })
     * 
     */
    delete<T extends GPSLocationDeleteArgs>(args: SelectSubset<T, GPSLocationDeleteArgs<ExtArgs>>): Prisma__GPSLocationClient<$Result.GetResult<Prisma.$GPSLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GPSLocation.
     * @param {GPSLocationUpdateArgs} args - Arguments to update one GPSLocation.
     * @example
     * // Update one GPSLocation
     * const gPSLocation = await prisma.gPSLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GPSLocationUpdateArgs>(args: SelectSubset<T, GPSLocationUpdateArgs<ExtArgs>>): Prisma__GPSLocationClient<$Result.GetResult<Prisma.$GPSLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GPSLocations.
     * @param {GPSLocationDeleteManyArgs} args - Arguments to filter GPSLocations to delete.
     * @example
     * // Delete a few GPSLocations
     * const { count } = await prisma.gPSLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GPSLocationDeleteManyArgs>(args?: SelectSubset<T, GPSLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GPSLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GPSLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GPSLocations
     * const gPSLocation = await prisma.gPSLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GPSLocationUpdateManyArgs>(args: SelectSubset<T, GPSLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GPSLocations and returns the data updated in the database.
     * @param {GPSLocationUpdateManyAndReturnArgs} args - Arguments to update many GPSLocations.
     * @example
     * // Update many GPSLocations
     * const gPSLocation = await prisma.gPSLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GPSLocations and only return the `id`
     * const gPSLocationWithIdOnly = await prisma.gPSLocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GPSLocationUpdateManyAndReturnArgs>(args: SelectSubset<T, GPSLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GPSLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GPSLocation.
     * @param {GPSLocationUpsertArgs} args - Arguments to update or create a GPSLocation.
     * @example
     * // Update or create a GPSLocation
     * const gPSLocation = await prisma.gPSLocation.upsert({
     *   create: {
     *     // ... data to create a GPSLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GPSLocation we want to update
     *   }
     * })
     */
    upsert<T extends GPSLocationUpsertArgs>(args: SelectSubset<T, GPSLocationUpsertArgs<ExtArgs>>): Prisma__GPSLocationClient<$Result.GetResult<Prisma.$GPSLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GPSLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GPSLocationCountArgs} args - Arguments to filter GPSLocations to count.
     * @example
     * // Count the number of GPSLocations
     * const count = await prisma.gPSLocation.count({
     *   where: {
     *     // ... the filter for the GPSLocations we want to count
     *   }
     * })
    **/
    count<T extends GPSLocationCountArgs>(
      args?: Subset<T, GPSLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GPSLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GPSLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GPSLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GPSLocationAggregateArgs>(args: Subset<T, GPSLocationAggregateArgs>): Prisma.PrismaPromise<GetGPSLocationAggregateType<T>>

    /**
     * Group by GPSLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GPSLocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GPSLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GPSLocationGroupByArgs['orderBy'] }
        : { orderBy?: GPSLocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GPSLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGPSLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GPSLocation model
   */
  readonly fields: GPSLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GPSLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GPSLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GPSLocation model
   */
  interface GPSLocationFieldRefs {
    readonly id: FieldRef<"GPSLocation", 'String'>
    readonly latitude: FieldRef<"GPSLocation", 'Decimal'>
    readonly longitude: FieldRef<"GPSLocation", 'Decimal'>
    readonly speed: FieldRef<"GPSLocation", 'Decimal'>
    readonly heading: FieldRef<"GPSLocation", 'Decimal'>
    readonly timestamp: FieldRef<"GPSLocation", 'DateTime'>
    readonly vehicleId: FieldRef<"GPSLocation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GPSLocation findUnique
   */
  export type GPSLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationInclude<ExtArgs> | null
    /**
     * Filter, which GPSLocation to fetch.
     */
    where: GPSLocationWhereUniqueInput
  }

  /**
   * GPSLocation findUniqueOrThrow
   */
  export type GPSLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationInclude<ExtArgs> | null
    /**
     * Filter, which GPSLocation to fetch.
     */
    where: GPSLocationWhereUniqueInput
  }

  /**
   * GPSLocation findFirst
   */
  export type GPSLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationInclude<ExtArgs> | null
    /**
     * Filter, which GPSLocation to fetch.
     */
    where?: GPSLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GPSLocations to fetch.
     */
    orderBy?: GPSLocationOrderByWithRelationInput | GPSLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GPSLocations.
     */
    cursor?: GPSLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GPSLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GPSLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GPSLocations.
     */
    distinct?: GPSLocationScalarFieldEnum | GPSLocationScalarFieldEnum[]
  }

  /**
   * GPSLocation findFirstOrThrow
   */
  export type GPSLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationInclude<ExtArgs> | null
    /**
     * Filter, which GPSLocation to fetch.
     */
    where?: GPSLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GPSLocations to fetch.
     */
    orderBy?: GPSLocationOrderByWithRelationInput | GPSLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GPSLocations.
     */
    cursor?: GPSLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GPSLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GPSLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GPSLocations.
     */
    distinct?: GPSLocationScalarFieldEnum | GPSLocationScalarFieldEnum[]
  }

  /**
   * GPSLocation findMany
   */
  export type GPSLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationInclude<ExtArgs> | null
    /**
     * Filter, which GPSLocations to fetch.
     */
    where?: GPSLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GPSLocations to fetch.
     */
    orderBy?: GPSLocationOrderByWithRelationInput | GPSLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GPSLocations.
     */
    cursor?: GPSLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GPSLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GPSLocations.
     */
    skip?: number
    distinct?: GPSLocationScalarFieldEnum | GPSLocationScalarFieldEnum[]
  }

  /**
   * GPSLocation create
   */
  export type GPSLocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationInclude<ExtArgs> | null
    /**
     * The data needed to create a GPSLocation.
     */
    data: XOR<GPSLocationCreateInput, GPSLocationUncheckedCreateInput>
  }

  /**
   * GPSLocation createMany
   */
  export type GPSLocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GPSLocations.
     */
    data: GPSLocationCreateManyInput | GPSLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GPSLocation createManyAndReturn
   */
  export type GPSLocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * The data used to create many GPSLocations.
     */
    data: GPSLocationCreateManyInput | GPSLocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GPSLocation update
   */
  export type GPSLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationInclude<ExtArgs> | null
    /**
     * The data needed to update a GPSLocation.
     */
    data: XOR<GPSLocationUpdateInput, GPSLocationUncheckedUpdateInput>
    /**
     * Choose, which GPSLocation to update.
     */
    where: GPSLocationWhereUniqueInput
  }

  /**
   * GPSLocation updateMany
   */
  export type GPSLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GPSLocations.
     */
    data: XOR<GPSLocationUpdateManyMutationInput, GPSLocationUncheckedUpdateManyInput>
    /**
     * Filter which GPSLocations to update
     */
    where?: GPSLocationWhereInput
    /**
     * Limit how many GPSLocations to update.
     */
    limit?: number
  }

  /**
   * GPSLocation updateManyAndReturn
   */
  export type GPSLocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * The data used to update GPSLocations.
     */
    data: XOR<GPSLocationUpdateManyMutationInput, GPSLocationUncheckedUpdateManyInput>
    /**
     * Filter which GPSLocations to update
     */
    where?: GPSLocationWhereInput
    /**
     * Limit how many GPSLocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GPSLocation upsert
   */
  export type GPSLocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationInclude<ExtArgs> | null
    /**
     * The filter to search for the GPSLocation to update in case it exists.
     */
    where: GPSLocationWhereUniqueInput
    /**
     * In case the GPSLocation found by the `where` argument doesn't exist, create a new GPSLocation with this data.
     */
    create: XOR<GPSLocationCreateInput, GPSLocationUncheckedCreateInput>
    /**
     * In case the GPSLocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GPSLocationUpdateInput, GPSLocationUncheckedUpdateInput>
  }

  /**
   * GPSLocation delete
   */
  export type GPSLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationInclude<ExtArgs> | null
    /**
     * Filter which GPSLocation to delete.
     */
    where: GPSLocationWhereUniqueInput
  }

  /**
   * GPSLocation deleteMany
   */
  export type GPSLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GPSLocations to delete
     */
    where?: GPSLocationWhereInput
    /**
     * Limit how many GPSLocations to delete.
     */
    limit?: number
  }

  /**
   * GPSLocation without action
   */
  export type GPSLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GPSLocation
     */
    select?: GPSLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GPSLocation
     */
    omit?: GPSLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GPSLocationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    plateNumber: 'plateNumber',
    brand: 'brand',
    model: 'model',
    type: 'type',
    status: 'status',
    currentLatitude: 'currentLatitude',
    currentLongitude: 'currentLongitude',
    driverId: 'driverId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const GPSLocationScalarFieldEnum: {
    id: 'id',
    latitude: 'latitude',
    longitude: 'longitude',
    speed: 'speed',
    heading: 'heading',
    timestamp: 'timestamp',
    vehicleId: 'vehicleId'
  };

  export type GPSLocationScalarFieldEnum = (typeof GPSLocationScalarFieldEnum)[keyof typeof GPSLocationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'VehicleStatus'
   */
  export type EnumVehicleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleStatus'>
    


  /**
   * Reference to a field of type 'VehicleStatus[]'
   */
  export type ListEnumVehicleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VehicleStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    plateNumber?: StringFilter<"Vehicle"> | string
    brand?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    type?: StringFilter<"Vehicle"> | string
    status?: EnumVehicleStatusFilter<"Vehicle"> | $Enums.VehicleStatus
    currentLatitude?: DecimalNullableFilter<"Vehicle"> | Decimal | DecimalJsLike | number | string | null
    currentLongitude?: DecimalNullableFilter<"Vehicle"> | Decimal | DecimalJsLike | number | string | null
    driverId?: StringNullableFilter<"Vehicle"> | string | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    gpsLocations?: GPSLocationListRelationFilter
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    plateNumber?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    type?: SortOrder
    status?: SortOrder
    currentLatitude?: SortOrderInput | SortOrder
    currentLongitude?: SortOrderInput | SortOrder
    driverId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    gpsLocations?: GPSLocationOrderByRelationAggregateInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    plateNumber?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    brand?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    type?: StringFilter<"Vehicle"> | string
    status?: EnumVehicleStatusFilter<"Vehicle"> | $Enums.VehicleStatus
    currentLatitude?: DecimalNullableFilter<"Vehicle"> | Decimal | DecimalJsLike | number | string | null
    currentLongitude?: DecimalNullableFilter<"Vehicle"> | Decimal | DecimalJsLike | number | string | null
    driverId?: StringNullableFilter<"Vehicle"> | string | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeFilter<"Vehicle"> | Date | string
    gpsLocations?: GPSLocationListRelationFilter
  }, "id" | "plateNumber">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    plateNumber?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    type?: SortOrder
    status?: SortOrder
    currentLatitude?: SortOrderInput | SortOrder
    currentLongitude?: SortOrderInput | SortOrder
    driverId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    plateNumber?: StringWithAggregatesFilter<"Vehicle"> | string
    brand?: StringWithAggregatesFilter<"Vehicle"> | string
    model?: StringWithAggregatesFilter<"Vehicle"> | string
    type?: StringWithAggregatesFilter<"Vehicle"> | string
    status?: EnumVehicleStatusWithAggregatesFilter<"Vehicle"> | $Enums.VehicleStatus
    currentLatitude?: DecimalNullableWithAggregatesFilter<"Vehicle"> | Decimal | DecimalJsLike | number | string | null
    currentLongitude?: DecimalNullableWithAggregatesFilter<"Vehicle"> | Decimal | DecimalJsLike | number | string | null
    driverId?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
  }

  export type GPSLocationWhereInput = {
    AND?: GPSLocationWhereInput | GPSLocationWhereInput[]
    OR?: GPSLocationWhereInput[]
    NOT?: GPSLocationWhereInput | GPSLocationWhereInput[]
    id?: StringFilter<"GPSLocation"> | string
    latitude?: DecimalFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string
    speed?: DecimalNullableFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string | null
    heading?: DecimalNullableFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string | null
    timestamp?: DateTimeFilter<"GPSLocation"> | Date | string
    vehicleId?: StringFilter<"GPSLocation"> | string
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }

  export type GPSLocationOrderByWithRelationInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrderInput | SortOrder
    heading?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    vehicleId?: SortOrder
    vehicle?: VehicleOrderByWithRelationInput
  }

  export type GPSLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GPSLocationWhereInput | GPSLocationWhereInput[]
    OR?: GPSLocationWhereInput[]
    NOT?: GPSLocationWhereInput | GPSLocationWhereInput[]
    latitude?: DecimalFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string
    speed?: DecimalNullableFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string | null
    heading?: DecimalNullableFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string | null
    timestamp?: DateTimeFilter<"GPSLocation"> | Date | string
    vehicleId?: StringFilter<"GPSLocation"> | string
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }, "id">

  export type GPSLocationOrderByWithAggregationInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrderInput | SortOrder
    heading?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    vehicleId?: SortOrder
    _count?: GPSLocationCountOrderByAggregateInput
    _avg?: GPSLocationAvgOrderByAggregateInput
    _max?: GPSLocationMaxOrderByAggregateInput
    _min?: GPSLocationMinOrderByAggregateInput
    _sum?: GPSLocationSumOrderByAggregateInput
  }

  export type GPSLocationScalarWhereWithAggregatesInput = {
    AND?: GPSLocationScalarWhereWithAggregatesInput | GPSLocationScalarWhereWithAggregatesInput[]
    OR?: GPSLocationScalarWhereWithAggregatesInput[]
    NOT?: GPSLocationScalarWhereWithAggregatesInput | GPSLocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GPSLocation"> | string
    latitude?: DecimalWithAggregatesFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalWithAggregatesFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string
    speed?: DecimalNullableWithAggregatesFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string | null
    heading?: DecimalNullableWithAggregatesFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string | null
    timestamp?: DateTimeWithAggregatesFilter<"GPSLocation"> | Date | string
    vehicleId?: StringWithAggregatesFilter<"GPSLocation"> | string
  }

  export type VehicleCreateInput = {
    id?: string
    plateNumber: string
    brand: string
    model: string
    type: string
    status?: $Enums.VehicleStatus
    currentLatitude?: Decimal | DecimalJsLike | number | string | null
    currentLongitude?: Decimal | DecimalJsLike | number | string | null
    driverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gpsLocations?: GPSLocationCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    plateNumber: string
    brand: string
    model: string
    type: string
    status?: $Enums.VehicleStatus
    currentLatitude?: Decimal | DecimalJsLike | number | string | null
    currentLongitude?: Decimal | DecimalJsLike | number | string | null
    driverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gpsLocations?: GPSLocationUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLatitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currentLongitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gpsLocations?: GPSLocationUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLatitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currentLongitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gpsLocations?: GPSLocationUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateManyInput = {
    id?: string
    plateNumber: string
    brand: string
    model: string
    type: string
    status?: $Enums.VehicleStatus
    currentLatitude?: Decimal | DecimalJsLike | number | string | null
    currentLongitude?: Decimal | DecimalJsLike | number | string | null
    driverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLatitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currentLongitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLatitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currentLongitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GPSLocationCreateInput = {
    id?: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    speed?: Decimal | DecimalJsLike | number | string | null
    heading?: Decimal | DecimalJsLike | number | string | null
    timestamp?: Date | string
    vehicle: VehicleCreateNestedOneWithoutGpsLocationsInput
  }

  export type GPSLocationUncheckedCreateInput = {
    id?: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    speed?: Decimal | DecimalJsLike | number | string | null
    heading?: Decimal | DecimalJsLike | number | string | null
    timestamp?: Date | string
    vehicleId: string
  }

  export type GPSLocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    speed?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    heading?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutGpsLocationsNestedInput
  }

  export type GPSLocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    speed?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    heading?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleId?: StringFieldUpdateOperationsInput | string
  }

  export type GPSLocationCreateManyInput = {
    id?: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    speed?: Decimal | DecimalJsLike | number | string | null
    heading?: Decimal | DecimalJsLike | number | string | null
    timestamp?: Date | string
    vehicleId: string
  }

  export type GPSLocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    speed?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    heading?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GPSLocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    speed?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    heading?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumVehicleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | EnumVehicleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleStatusFilter<$PrismaModel> | $Enums.VehicleStatus
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GPSLocationListRelationFilter = {
    every?: GPSLocationWhereInput
    some?: GPSLocationWhereInput
    none?: GPSLocationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GPSLocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    plateNumber?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    type?: SortOrder
    status?: SortOrder
    currentLatitude?: SortOrder
    currentLongitude?: SortOrder
    driverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    currentLatitude?: SortOrder
    currentLongitude?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    plateNumber?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    type?: SortOrder
    status?: SortOrder
    currentLatitude?: SortOrder
    currentLongitude?: SortOrder
    driverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    plateNumber?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    type?: SortOrder
    status?: SortOrder
    currentLatitude?: SortOrder
    currentLongitude?: SortOrder
    driverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    currentLatitude?: SortOrder
    currentLongitude?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumVehicleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | EnumVehicleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel> | $Enums.VehicleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleStatusFilter<$PrismaModel>
    _max?: NestedEnumVehicleStatusFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type VehicleScalarRelationFilter = {
    is?: VehicleWhereInput
    isNot?: VehicleWhereInput
  }

  export type GPSLocationCountOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    timestamp?: SortOrder
    vehicleId?: SortOrder
  }

  export type GPSLocationAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
  }

  export type GPSLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    timestamp?: SortOrder
    vehicleId?: SortOrder
  }

  export type GPSLocationMinOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    timestamp?: SortOrder
    vehicleId?: SortOrder
  }

  export type GPSLocationSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type GPSLocationCreateNestedManyWithoutVehicleInput = {
    create?: XOR<GPSLocationCreateWithoutVehicleInput, GPSLocationUncheckedCreateWithoutVehicleInput> | GPSLocationCreateWithoutVehicleInput[] | GPSLocationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: GPSLocationCreateOrConnectWithoutVehicleInput | GPSLocationCreateOrConnectWithoutVehicleInput[]
    createMany?: GPSLocationCreateManyVehicleInputEnvelope
    connect?: GPSLocationWhereUniqueInput | GPSLocationWhereUniqueInput[]
  }

  export type GPSLocationUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<GPSLocationCreateWithoutVehicleInput, GPSLocationUncheckedCreateWithoutVehicleInput> | GPSLocationCreateWithoutVehicleInput[] | GPSLocationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: GPSLocationCreateOrConnectWithoutVehicleInput | GPSLocationCreateOrConnectWithoutVehicleInput[]
    createMany?: GPSLocationCreateManyVehicleInputEnvelope
    connect?: GPSLocationWhereUniqueInput | GPSLocationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumVehicleStatusFieldUpdateOperationsInput = {
    set?: $Enums.VehicleStatus
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GPSLocationUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<GPSLocationCreateWithoutVehicleInput, GPSLocationUncheckedCreateWithoutVehicleInput> | GPSLocationCreateWithoutVehicleInput[] | GPSLocationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: GPSLocationCreateOrConnectWithoutVehicleInput | GPSLocationCreateOrConnectWithoutVehicleInput[]
    upsert?: GPSLocationUpsertWithWhereUniqueWithoutVehicleInput | GPSLocationUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: GPSLocationCreateManyVehicleInputEnvelope
    set?: GPSLocationWhereUniqueInput | GPSLocationWhereUniqueInput[]
    disconnect?: GPSLocationWhereUniqueInput | GPSLocationWhereUniqueInput[]
    delete?: GPSLocationWhereUniqueInput | GPSLocationWhereUniqueInput[]
    connect?: GPSLocationWhereUniqueInput | GPSLocationWhereUniqueInput[]
    update?: GPSLocationUpdateWithWhereUniqueWithoutVehicleInput | GPSLocationUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: GPSLocationUpdateManyWithWhereWithoutVehicleInput | GPSLocationUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: GPSLocationScalarWhereInput | GPSLocationScalarWhereInput[]
  }

  export type GPSLocationUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<GPSLocationCreateWithoutVehicleInput, GPSLocationUncheckedCreateWithoutVehicleInput> | GPSLocationCreateWithoutVehicleInput[] | GPSLocationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: GPSLocationCreateOrConnectWithoutVehicleInput | GPSLocationCreateOrConnectWithoutVehicleInput[]
    upsert?: GPSLocationUpsertWithWhereUniqueWithoutVehicleInput | GPSLocationUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: GPSLocationCreateManyVehicleInputEnvelope
    set?: GPSLocationWhereUniqueInput | GPSLocationWhereUniqueInput[]
    disconnect?: GPSLocationWhereUniqueInput | GPSLocationWhereUniqueInput[]
    delete?: GPSLocationWhereUniqueInput | GPSLocationWhereUniqueInput[]
    connect?: GPSLocationWhereUniqueInput | GPSLocationWhereUniqueInput[]
    update?: GPSLocationUpdateWithWhereUniqueWithoutVehicleInput | GPSLocationUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: GPSLocationUpdateManyWithWhereWithoutVehicleInput | GPSLocationUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: GPSLocationScalarWhereInput | GPSLocationScalarWhereInput[]
  }

  export type VehicleCreateNestedOneWithoutGpsLocationsInput = {
    create?: XOR<VehicleCreateWithoutGpsLocationsInput, VehicleUncheckedCreateWithoutGpsLocationsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutGpsLocationsInput
    connect?: VehicleWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type VehicleUpdateOneRequiredWithoutGpsLocationsNestedInput = {
    create?: XOR<VehicleCreateWithoutGpsLocationsInput, VehicleUncheckedCreateWithoutGpsLocationsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutGpsLocationsInput
    upsert?: VehicleUpsertWithoutGpsLocationsInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutGpsLocationsInput, VehicleUpdateWithoutGpsLocationsInput>, VehicleUncheckedUpdateWithoutGpsLocationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumVehicleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | EnumVehicleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleStatusFilter<$PrismaModel> | $Enums.VehicleStatus
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | EnumVehicleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VehicleStatus[] | ListEnumVehicleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel> | $Enums.VehicleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVehicleStatusFilter<$PrismaModel>
    _max?: NestedEnumVehicleStatusFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type GPSLocationCreateWithoutVehicleInput = {
    id?: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    speed?: Decimal | DecimalJsLike | number | string | null
    heading?: Decimal | DecimalJsLike | number | string | null
    timestamp?: Date | string
  }

  export type GPSLocationUncheckedCreateWithoutVehicleInput = {
    id?: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    speed?: Decimal | DecimalJsLike | number | string | null
    heading?: Decimal | DecimalJsLike | number | string | null
    timestamp?: Date | string
  }

  export type GPSLocationCreateOrConnectWithoutVehicleInput = {
    where: GPSLocationWhereUniqueInput
    create: XOR<GPSLocationCreateWithoutVehicleInput, GPSLocationUncheckedCreateWithoutVehicleInput>
  }

  export type GPSLocationCreateManyVehicleInputEnvelope = {
    data: GPSLocationCreateManyVehicleInput | GPSLocationCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type GPSLocationUpsertWithWhereUniqueWithoutVehicleInput = {
    where: GPSLocationWhereUniqueInput
    update: XOR<GPSLocationUpdateWithoutVehicleInput, GPSLocationUncheckedUpdateWithoutVehicleInput>
    create: XOR<GPSLocationCreateWithoutVehicleInput, GPSLocationUncheckedCreateWithoutVehicleInput>
  }

  export type GPSLocationUpdateWithWhereUniqueWithoutVehicleInput = {
    where: GPSLocationWhereUniqueInput
    data: XOR<GPSLocationUpdateWithoutVehicleInput, GPSLocationUncheckedUpdateWithoutVehicleInput>
  }

  export type GPSLocationUpdateManyWithWhereWithoutVehicleInput = {
    where: GPSLocationScalarWhereInput
    data: XOR<GPSLocationUpdateManyMutationInput, GPSLocationUncheckedUpdateManyWithoutVehicleInput>
  }

  export type GPSLocationScalarWhereInput = {
    AND?: GPSLocationScalarWhereInput | GPSLocationScalarWhereInput[]
    OR?: GPSLocationScalarWhereInput[]
    NOT?: GPSLocationScalarWhereInput | GPSLocationScalarWhereInput[]
    id?: StringFilter<"GPSLocation"> | string
    latitude?: DecimalFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string
    speed?: DecimalNullableFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string | null
    heading?: DecimalNullableFilter<"GPSLocation"> | Decimal | DecimalJsLike | number | string | null
    timestamp?: DateTimeFilter<"GPSLocation"> | Date | string
    vehicleId?: StringFilter<"GPSLocation"> | string
  }

  export type VehicleCreateWithoutGpsLocationsInput = {
    id?: string
    plateNumber: string
    brand: string
    model: string
    type: string
    status?: $Enums.VehicleStatus
    currentLatitude?: Decimal | DecimalJsLike | number | string | null
    currentLongitude?: Decimal | DecimalJsLike | number | string | null
    driverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleUncheckedCreateWithoutGpsLocationsInput = {
    id?: string
    plateNumber: string
    brand: string
    model: string
    type: string
    status?: $Enums.VehicleStatus
    currentLatitude?: Decimal | DecimalJsLike | number | string | null
    currentLongitude?: Decimal | DecimalJsLike | number | string | null
    driverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleCreateOrConnectWithoutGpsLocationsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutGpsLocationsInput, VehicleUncheckedCreateWithoutGpsLocationsInput>
  }

  export type VehicleUpsertWithoutGpsLocationsInput = {
    update: XOR<VehicleUpdateWithoutGpsLocationsInput, VehicleUncheckedUpdateWithoutGpsLocationsInput>
    create: XOR<VehicleCreateWithoutGpsLocationsInput, VehicleUncheckedCreateWithoutGpsLocationsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutGpsLocationsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutGpsLocationsInput, VehicleUncheckedUpdateWithoutGpsLocationsInput>
  }

  export type VehicleUpdateWithoutGpsLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLatitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currentLongitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateWithoutGpsLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    plateNumber?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumVehicleStatusFieldUpdateOperationsInput | $Enums.VehicleStatus
    currentLatitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    currentLongitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GPSLocationCreateManyVehicleInput = {
    id?: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    speed?: Decimal | DecimalJsLike | number | string | null
    heading?: Decimal | DecimalJsLike | number | string | null
    timestamp?: Date | string
  }

  export type GPSLocationUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    speed?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    heading?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GPSLocationUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    speed?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    heading?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GPSLocationUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    speed?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    heading?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}