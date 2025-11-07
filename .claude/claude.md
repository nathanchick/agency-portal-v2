# Project Guardrails

## Module Structure
- This is a modular Laravel application
- Modules are located in `Modules/` directory
- Each module has its own: Models, Controllers, Services, Migrations, Routes
- When creating migrations for modules, place them in `Modules/{ModuleName}/database/migrations/`
- Never place module-specific migrations in root `database/migrations/`

## Database
- Use Laravel Sail for all database operations: `./vendor/bin/sail artisan migrate`
- Always use UUIDs for primary keys (HasUuids trait)
- Follow existing naming conventions for tables and columns

## Development Environment
- Use Laravel Sail for all operations (composer, artisan, npm)
- Docker containers run the application
- Files may have sync delays between host and container
- If files aren't recognized, restart Sail: `./vendor/bin/sail down && ./vendor/bin/sail up -d`

## Frontend
- React + TypeScript + Inertia.js
- Vite for build tooling
- All actions/API helpers go in `resources/js/actions/`
- Route helpers generated via Ziggy
- Use existing patterns for API integration

## Code Style
- Follow PSR standards for PHP
- Use type hints for all PHP methods
- Use TypeScript for all frontend code
- Leverage existing traits (HasCurrentOrganisation, DispatchesWebhooks, etc.)

## Git
- Current branch: master
- Only commit when explicitly requested
- Never skip hooks or force push
- Follow existing commit message style

## Relationships
- Use proper Eloquent relationship return types (HasOne, HasMany, BelongsTo)
- Don't return query results from relationship methods - return relationship instances
- Always eager load relationships when needed to avoid N+1 queries

## External Services
- Oh Dear: Website monitoring service (ohdearapp/ohdear-php-sdk)
- Use service classes for external API integration (e.g., OhdearService)
- Store credentials in `.env` file
