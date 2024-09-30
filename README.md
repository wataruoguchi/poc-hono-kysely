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
