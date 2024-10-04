import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // We could backfill data in the migration.
  await db.schema
    .alterTable("person")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("person").dropColumn("created_at").execute();
}
