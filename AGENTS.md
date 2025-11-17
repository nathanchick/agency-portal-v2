# Repository Guidelines

## Project Structure & Module Organization
Laravel services live under `app/` and are split by domains (Jobs, Billing, Support). Feature-specific controllers, migrations, and assets stay inside `Modules/*`, with shared contracts in `app/Support`. React and Inertia views live in `resources/js`, Blade fallbacks in `resources/views`, and Tailwind assets in `resources/css`. API routes sit in `routes/api.php`, browser flows in `routes/web.php`, and tests mirror this layout in `tests/Feature` and `tests/Unit`.

## Build, Test & Development Commands
- `composer run dev` – launches PHP (serve, queue, logs) alongside Vite for a full-stack dev loop.
- `npm run dev` / `npm run build` – start the Vite dev server or produce production assets.
- `php artisan test` or `composer run test` – run the Laravel/PHPUnit suite after clearing config cache.
- `npm run test`, `npm run test:coverage`, `npm run test:ui` – execute Vitest headless, with coverage, or via the UI for React modules.

## Coding Style & Naming Conventions
PHP follows PSR-12 with Pint and PHP_CodeSniffer; run `./vendor/bin/pint` before committing. TypeScript/React code uses 2-space indentation, named exports for shared helpers, and PascalCase for components in `resources/js/components`. Run `npm run lint` and `npm run format` (Prettier with Tailwind/plugins) to fix style drift; `npm run format:check` gates CI.

## Testing Guidelines
Use PHPUnit for backend logic; feature tests belong in `tests/Feature/<Module>` and must cover happy paths plus policy or permission branches. React work should include Vitest specs next to the component using the `.test.tsx` suffix, with shared mocks in `tests/setup`. Target ≥80% coverage on changed files, verified via `npm run test:coverage`. When exercising queues or websockets, rely on Laravel fakes rather than hitting Pusher directly.

## Commit & Pull Request Guidelines
Git history favors imperative summaries (“Add widget refresh functionality”) optionally noting task IDs. Keep subject lines under ~70 chars and avoid batching unrelated modules in one commit. Pull requests should include a short summary, linked Linear/Jira ticket, screenshots for UI deltas, and a checklist of commands run (tests, lint, build). Flag schema or queue changes in the description and attach SQL/migration notes when relevant.

## Security & Configuration Tips
Environment secrets stay in `.env` and should never leak into committed config files; add new keys to `.env.example`. Multi-tenancy and webhook credentials are stored via `config/multitenancy.php` and `config/webhook-server.php`, so document any new config toggles there. When adding modules, register policies, routes, and service providers through the module’s `Providers/` directory so autodiscovery stays intact.
