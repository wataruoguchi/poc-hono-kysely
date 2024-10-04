import { faker } from "@faker-js/faker";
import { Hono } from "hono";
import { getApp } from "./app";
import { getTestDb, TestDb } from "./dev-utils/test-db";
import { personRepository } from "./repository/person";

describe("app", () => {
  let testDb: TestDb;
  let app: Hono;
  beforeAll(async () => {
    testDb = await getTestDb("app-spec");
    app = getApp(testDb);
  });

  afterAll(async () => {
    await testDb.destroy();
  });

  describe("POST /api/person", () => {
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
      expect(await res.json()).toEqual({
        ...testPerson,
        id: expect.any(String),
        created_at: expect.any(String),
      });
    });
  });

  describe("GET /api/person", () => {
    const people = Array.from({ length: 2 }, () => ({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      age: faker.number.int({ min: 1, max: 100 }),
    }));

    beforeEach(async () => {
      await Promise.all(
        people.map((person) => personRepository(testDb).create(person))
      );
    });

    test("Green path", async () => {
      const res = await app.request("/api/person");
      expect(res.status).toBe(200);
      const response = await res.json();
      expect(response).toEqual(
        expect.arrayContaining(
          people.map((person) =>
            expect.objectContaining({
              ...person,
              id: expect.any(String),
              created_at: expect.any(String),
            })
          )
        )
      );
    });
  });
});
