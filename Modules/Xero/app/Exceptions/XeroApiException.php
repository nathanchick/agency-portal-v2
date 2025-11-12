<?php

namespace Modules\Xero\Exceptions;

use Exception;
use Modules\Organisation\Models\Organisation;

/**
 * XeroApiException
 *
 * Exception thrown when there are issues communicating with the Xero API.
 */
class XeroApiException extends Exception
{
    /**
     * Create exception for rate limit exceeded.
     */
    public static function rateLimitExceeded(Organisation $organisation): self
    {
        return new self(
            "Xero API rate limit exceeded for organisation {$organisation->id}. Please try again later."
        );
    }

    /**
     * Create exception for API request failure.
     */
    public static function requestFailed(Organisation $organisation, string $endpoint, \Throwable $previous): self
    {
        return new self(
            "Xero API request to {$endpoint} failed for organisation {$organisation->id}: {$previous->getMessage()}",
            0,
            $previous
        );
    }

    /**
     * Create exception for invalid response.
     */
    public static function invalidResponse(Organisation $organisation, string $endpoint, string $reason): self
    {
        return new self(
            "Invalid response from Xero API endpoint {$endpoint} for organisation {$organisation->id}: {$reason}"
        );
    }
}
