# AGENTS.md

## Architecture

Hexagonal architecture with strict layer separation under `src/modules/`:

- `domain/` - entities, value objects, exceptions, repository ports
- `application/` - use cases, inputs
- `infrastructure/` - controllers, persistence adapters, HTTP DTOs, mappers

Path aliases in `tsconfig.json`: `@/*`, `@common/*`, `@config/*`, `@core/*`,
`@infrastructure/*`, `@modules/*`

## Commands

```bash
npm run start:dev      # dev server with watch
npm run build          # nest build (deletes dist/ first per nest-cli.json)
npm run lint           # eslint on src,apps,libs,test
npm run format         # prettier on src/**/*.ts test/**/*.ts
npm run test           # jest unit tests (src/**/*.spec.ts)
npm run test:e2e       # jest e2e tests (test/**/*.e2e-spec.ts)
npx jest --testPathPattern="pattern"  # single test file
```

## Prisma

- Schema: `prisma/schema.prisma`
- Generated client: `src/infrastructure/database/prisma/generated/prisma/`
- Adapter: `@prisma/adapter-pg` (PostgreSQL)
- `npx prisma generate` outputs to the generated folder above
- Migrations in `prisma/migrations/`

## TypeScript

- Module: `nodenext` with `nodenext` resolution
- `isolatedModules: true` - no type checking during build, use `tsc --noEmit` separately

## Testing

- Unit tests: `src/**/*.spec.ts` (jest config in `package.json`)
- E2E tests: `test/**/*.e2e-spec.ts` (config in `test/jest-e2e.json`)
- Both use `ts-jest` transform

## Conventions

- Global domain exception filter registered in `src/app.module.ts`
- Config via `@nestjs/config` with `AppConfigModule` wrapping env vars
- ESLint: `sourceType: commonjs` in config, but TypeScript targets ESM (`nodenext`)

## Available Skills

| Skill                | Description |
| -------------------- | ----------- |
| `clean-nest-starter` | Clean up the default NestJS starter scaffold — leaving a bare minimum project. |
| `common-setup` | Set up global ValidationPipe and ClassSerializerInterceptor with whitelist and implicit conversion. |
| `env-config-setup` | Set up initial environment variable configuration — creates config files and .env.example with Joi validation. |
| `path-aliases` | Sync tsconfig.json path aliases with actual directories under src/ — adds/removes aliases automatically. |
| `skill-creator` | Create, validate, evaluate, and package Agent Skills following the agentskills.io open standard. |
