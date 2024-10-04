import { faker } from "@faker-js/faker";
import { getDb } from "../src/db";

seed().then(() => {
  console.log("Seeded the database");
  process.exit(0);
});

async function seed() {
  const db = getDb();
  await db.transaction().execute(async (trx) => {
    await trx
      .insertInto("person")
      .values(
        Array.from({ length: 2 }, () => ({
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          age: faker.number.int({ min: 1, max: 100 }),
        }))
      )
      .execute();
  });
}
