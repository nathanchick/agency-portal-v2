# Testing Safety Guidelines

## CRITICAL: Database Protection

This document outlines mandatory safety procedures to prevent accidental production database corruption during testing.

### What Happened (Incident Report)

On November 17, 2025, the production database was accidentally wiped when feature tests using `RefreshDatabase` were run against the production database instead of the testing database. This resulted in complete data loss and hours of recovery work.

## Safety Measures Implemented

### 1. TestCase Safety Checks

The `tests/TestCase.php` base class now includes **three layers of protection**:

- **Environment Check**: Tests will ONLY run in `testing` environment
- **Database Name Validation**: Database name must contain 'test', 'testing', 'temp', or 'ci'
- **Production Database Block**: Explicitly blocks databases named 'portal', 'production', 'prod', or 'live'

**These checks run before EVERY test** and will throw exceptions if violated.

### 2. PHPUnit Configuration

The `phpunit.xml` file is configured with:
- `APP_ENV=testing` (mandatory)
- `DB_DATABASE=portal_testing` (dedicated test database)

**NEVER change these values to production settings.**

### 3. Dedicated Test Database

A separate `portal_testing` database must be created and used exclusively for tests.

## Mandatory Procedures

### Before Running Tests

1. **Verify you're using the test database**:
   ```bash
   # Check phpunit.xml has DB_DATABASE=portal_testing
   grep "DB_DATABASE" phpunit.xml
   ```

2. **Create test database if it doesn't exist**:
   ```bash
   ./vendor/bin/sail psql -U sail -c "CREATE DATABASE portal_testing;"
   ```

3. **Run migrations on test database**:
   ```bash
   ./vendor/bin/sail artisan migrate --env=testing --database=pgsql
   ```

### Running Tests Safely

**ALWAYS use one of these commands**:

```bash
# Recommended: Use Laravel's test command
./vendor/bin/sail artisan test

# Alternative: Use PHPUnit directly (will still enforce safety checks)
./vendor/bin/sail php vendor/bin/phpunit

# Run specific test file
./vendor/bin/sail artisan test tests/Feature/DashboardWidgetTest.php

# Run specific test method
./vendor/bin/sail artisan test --filter test_can_fetch_available_widgets
```

**NEVER**:
- Override `APP_ENV` to 'production' or 'local' when running tests
- Override `DB_DATABASE` to 'portal' when running tests
- Manually run migrations with `--force` in production
- Disable safety checks in `TestCase.php`

### Writing New Tests

When creating tests that use `RefreshDatabase`:

1. **Add a comment warning about database reset**:
   ```php
   /**
    * Test description here
    *
    * WARNING: This test uses RefreshDatabase which drops all tables.
    * Only runs on test database (portal_testing) - verified by TestCase.
    */
   ```

2. **Verify your test extends the base `TestCase`**:
   ```php
   use Tests\TestCase;

   class MyTest extends TestCase
   {
       use RefreshDatabase;
   ```

3. **The TestCase safety checks will automatically run** before your test executes

## Emergency Database Recovery

If production database is accidentally wiped:

1. **Stop all test execution immediately**

2. **Check migration status**:
   ```bash
   ./vendor/bin/sail artisan migrate:status
   ```

3. **If migrations were rolled back, re-run them**:
   ```bash
   ./vendor/bin/sail artisan migrate
   ```

4. **Restore from backup**:
   ```bash
   # If you have a backup file
   ./vendor/bin/sail psql -U sail -d portal < backup.sql
   ```

5. **If no backup exists**:
   - Run migrations: `./vendor/bin/sail artisan migrate`
   - Re-seed data: `./vendor/bin/sail artisan db:seed`
   - Manually recreate critical users/organisations

## Database Backup Procedures

### Automated Backups (Recommended)

Set up automated daily backups:

```bash
# Add to cron (outside container)
0 2 * * * docker exec portal-pgsql-1 pg_dump -U sail portal > /backups/portal_$(date +\%Y\%m\%d).sql
```

### Manual Backup

Before making risky changes:

```bash
# Create backup
./vendor/bin/sail psql -U sail -c "SELECT pg_dump('portal')" > backup_$(date +%Y%m%d_%H%M%S).sql

# Or use pg_dump directly
docker exec portal-pgsql-1 pg_dump -U sail portal > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Verify Backup

```bash
# Check file size (should be > 1MB for production data)
ls -lh backup_*.sql

# Check content (should show CREATE TABLE statements)
head -n 50 backup_*.sql
```

## Testing Checklist

Before running any test suite:

- [ ] Verified `APP_ENV=testing` in phpunit.xml
- [ ] Verified `DB_DATABASE=portal_testing` in phpunit.xml
- [ ] Test database `portal_testing` exists
- [ ] Recent backup of production database exists
- [ ] Using `./vendor/bin/sail artisan test` command (not raw phpunit)
- [ ] NOT overriding any environment variables to production values

## Contact & Questions

If you're unsure about any testing procedure:
1. DON'T run the tests
2. Ask for guidance
3. Review this document
4. Verify safety checks are in place

---

**Remember: RefreshDatabase will destroy ALL data in the target database. The safety checks in TestCase.php are your last line of defense.**
