import { Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";
import { env } from "./env";
import type { Database } from "./types";

const db = new Kysely<Database>({
  dialect: new PostgresJSDialect({
    postgres: postgres({
      database: env.PGDATABASE,
      host: env.PGHOST,
      max: 10,
      port: env.PGPORT,
      user: env.PGUSER,
    }),
  }),
});

export const getDb = () => db;
