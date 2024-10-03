import { faker } from "@faker-js/faker";
import { Hono } from "hono";
import { getApp } from "./app";
import { getTestDb, TestDb } from "./dev-utils/test-db";

describe("POST /api/person", () => {
  let testDb: TestDb;
  let app: Hono;
  beforeAll(async () => {
    testDb = await getTestDb("app-spec");
    app = getApp(testDb);
  });

  afterAll(async () => {
    await testDb.destroy();
  });

  const testPerson = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    age: faker.number.int({ min: 1, max: 100 }),
  };

  test("Green path", async () => {
    const res = await app.request("/api/person", {
      method: "POST",
      body: JSON.stringify(testPerson),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ ...testPerson, id: expect.any(String) });
  });
});
