import { promises as fs } from "fs";
import { FileMigrationProvider, Migrator } from "kysely";
import { run } from "kysely-migration-cli";
import * as path from "path";
import { getDb } from "../src/db";

// For ESM environment
const migrationFolder = new URL("../db/migrations", import.meta.url).pathname;
const db = getDb();

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder,
  }),
});

run(db, migrator, migrationFolder);
