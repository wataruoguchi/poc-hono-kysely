import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .createTable("person")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("first_name", "text", (col) => col.notNull())
    .addColumn("last_name", "text", (col) => col.notNull())
    .addColumn("age", "integer", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  db.schema.dropTable("person").execute();
}
