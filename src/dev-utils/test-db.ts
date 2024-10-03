import { Kysely, Migrator, sql } from "kysely";
import { connectDb, getDb } from "../db";
import { Database } from "../types";
import { ESMFileMigrationProvider } from "./ESMFileMigrationProvider";

export type TestDb = Kysely<Database>;
export async function getTestDb(name = "test"): Promise<TestDb> {
  const db = getDb();
  console.info(`Creating the test database ${name}`);
  await sql`DROP DATABASE IF EXISTS ${sql.id(name)}`.execute(db);
  await sql`CREATE DATABASE ${sql.id(name)}`.execute(db);
  // console.info(`Disconnecting from the main database`);
  await db.destroy();

  // console.info(`Connecting to the test database ${name}`);
  const testDb = connectDb(name);

  const migrationFolder = new URL("../../db/migrations", import.meta.url)
    .pathname;
  // console.info(`Running migrations for ${name} using ${migrationFolder}`);

  // https://github.com/kysely-org/kysely/blob/master/example/test/test-context.ts#L50
  const migrator = new Migrator({
    db: testDb,
    provider: new ESMFileMigrationProvider("../../db/migrations"),
  });

  const { error, results } = await migrator.migrateToLatest();
  results?.forEach((it) => {
    if (it.status === "Success") {
      // console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });
  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }
  return testDb; // TODO: We want to destroy the test db when it's no longer needed.
}
