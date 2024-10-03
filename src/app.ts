import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { Kysely } from "kysely";
import { z } from "zod";
import { Database } from "./types";

export function getApp(db: Kysely<Database>) {
  const app = new Hono();
  app.get("/", (c) => {
    return c.text("Hello Hono!");
  });

  const personPostRequestSchema = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    age: z.number(),
  });

  app.post(
    "/api/person",
    zValidator("json", personPostRequestSchema),
    async (c) => {
      const person = c.req.valid("json");
      const result = await db.transaction().execute(async (trx) => {
        return trx
          .insertInto("person")
          .values(person)
          .returningAll()
          .executeTakeFirst()
      });
      return c.json(result, 201);
    }
  );

  app.get("/api/person", async (c) => {
    const people = await db.selectFrom("person").selectAll().execute();
    return c.json(people);
  });

  return app;
}
