import { faker } from "@faker-js/faker";
import { app } from "./app";

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
    expect(await res.json()).toEqual(testPerson);
  });
});
