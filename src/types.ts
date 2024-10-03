import type { GeneratedAlways } from "kysely";

export interface Database {
  person: PersonTable;
}

export interface PersonTable {
  id: GeneratedAlways<string>;
  first_name: string | null;
  last_name: string | null;
  age: number;
}
