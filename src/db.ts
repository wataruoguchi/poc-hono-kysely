import { Kysely } from "kysely";
import { DB } from "kysely-codegen";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";
import { env } from "./env";

export function connectDb(databaseName = env.PGDATABASE) {
  return new Kysely<DB>({
    dialect: new PostgresJSDialect({
      postgres: postgres({
        database: databaseName,
        host: env.PGHOST,
        max: 10,
        port: env.PGPORT,
        user: env.PGUSER,
      }),
    }),
  });
}
const db = connectDb();

export function getDb() {
  return db;
}
