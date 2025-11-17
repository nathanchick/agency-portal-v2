<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\DB;

abstract class TestCase extends BaseTestCase
{
    /**
     * Set up the test case
     *
     * This method runs before each test to ensure we're using the correct database
     * and prevent accidental production database corruption.
     */
    protected function setUp(): void
    {
        parent::setUp();

        // CRITICAL SAFETY CHECK: Prevent tests from running against production database
        $this->ensureTestingDatabase();
    }

    /**
     * Ensure tests are running against the testing database
     *
     * This method performs multiple safety checks to prevent accidental
     * production database destruction from test suites using RefreshDatabase.
     *
     * @throws \RuntimeException if not using test database
     */
    protected function ensureTestingDatabase(): void
    {
        // Check 1: Environment must be 'testing'
        if (app()->environment() !== 'testing') {
            throw new \RuntimeException(
                "Tests can only run in 'testing' environment. Current environment: " . app()->environment() .
                "\nSet APP_ENV=testing in your .env.testing file or PHPUnit configuration."
            );
        }

        // Check 2: Database name must contain 'test' or 'testing'
        $databaseName = DB::connection()->getDatabaseName();
        $allowedPatterns = ['test', 'testing', 'temp', 'ci'];

        $isValidTestDatabase = false;
        foreach ($allowedPatterns as $pattern) {
            if (stripos($databaseName, $pattern) !== false) {
                $isValidTestDatabase = true;
                break;
            }
        }

        if (!$isValidTestDatabase) {
            throw new \RuntimeException(
                "DANGER: Tests must use a dedicated test database!\n" .
                "Current database: '{$databaseName}'\n" .
                "Expected database name containing: " . implode(', ', $allowedPatterns) . "\n\n" .
                "To fix:\n" .
                "1. Create a test database: CREATE DATABASE portal_testing;\n" .
                "2. Set DB_DATABASE=portal_testing in phpunit.xml\n" .
                "3. Never run tests against production database!"
            );
        }

        // Check 3: Production database names are explicitly forbidden
        $forbiddenDatabases = ['portal', 'production', 'prod', 'live'];

        if (in_array(strtolower($databaseName), $forbiddenDatabases)) {
            throw new \RuntimeException(
                "CRITICAL: Cannot run tests against production database '{$databaseName}'!\n" .
                "This would destroy all production data.\n" .
                "Use a dedicated test database instead."
            );
        }
    }
}
