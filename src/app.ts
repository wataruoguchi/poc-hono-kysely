import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getDb } from "./db";

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
    await getDb().insertInto("person").values(person).execute();
    return c.json(person, 201);
  }
);

app.get("/api/person", async (c) => {
  const people = await getDb().selectFrom("person").selectAll().execute();
  return c.json(people);
});

export { app };
