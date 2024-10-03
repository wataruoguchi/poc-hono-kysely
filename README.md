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
$ nr codegen

> codegen
> kysely-codegen

• Loaded environment variables from .env file.
• No dialect specified. Assuming 'postgres'.
• Introspecting database...
✓ Introspected 1 table and generated ./node_modules/kysely-codegen/dist/db.d.ts in 34ms.
```