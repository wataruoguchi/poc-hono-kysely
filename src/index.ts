import { serve } from "@hono/node-server";
import { getApp } from "./app";
import { getDb } from "./db";

const port = 3001;
console.log(`Server is running on port ${port}`);

const db = getDb();
serve({
  fetch: getApp(db).fetch,
  port,
});
