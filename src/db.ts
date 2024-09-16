import { Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";
import type { Database } from "./types";

const db = new Kysely<Database>({
  dialect: new PostgresJSDialect({
    postgres: postgres({
      database: "postgres",
      host: "db",
      max: 10,
      port: 5432,
      user: "postgres",
    }),
  }),
});
