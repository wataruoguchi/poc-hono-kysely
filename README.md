```
npm install
npm run dev
```

```
open http://localhost:3001
```

## Migration

```sh
pnpm run migrate -- create person_created_at # It generates `db/migrations/20240930T042615-person_created_at.ts`
```

```sh
pnpm run migrate -- up # Run a pending migration if any
```

```sh
pnpm migrate -- latest # Run all pending migrations
```

## Codegen

```sh
$ pnpm run codegen

> codegen
> kysely-codegen

• Loaded environment variables from .env file.
• No dialect specified. Assuming 'postgres'.
• Introspecting database...
✓ Introspected 1 table and generated ./node_modules/kysely-codegen/dist/db.d.ts in 34ms.
```

Then import the generated file. An example is below.

```ts
// src/dev-utils/test-db.ts
import { DB } from "kysely-codegen";

export type TestDb = Kysely<DB>;
```

## Seed

```sh
pnpm run seed
```
