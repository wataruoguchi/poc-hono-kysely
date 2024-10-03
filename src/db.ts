import { Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";
import { env } from "./env";
import type { Database } from "./types";

export function connectDb(databaseName = env.PGDATABASE) {
  return new Kysely<Database>({
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
