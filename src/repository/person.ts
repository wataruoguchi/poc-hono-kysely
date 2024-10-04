import { Kysely } from "kysely";
import { DB } from "kysely-codegen";

export function personRepository(db: Kysely<DB>) {
  return {
    async create(
      person: Pick<DB["person"], "first_name" | "last_name" | "age">
    ) {
      return db
        .insertInto("person")
        .values(person)
        .returningAll()
        .executeTakeFirst();
    },
  };
}
