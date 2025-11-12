<?php

namespace Modules\Xero\Exceptions;

use Exception;
use Modules\Organisation\Models\Organisation;

/**
 * XeroTokenException
 *
 * Exception thrown when there are issues with Xero OAuth tokens.
 */
class XeroTokenException extends Exception
{
    /**
     * Create exception for when no tokens are found.
     */
    public static function noTokensFound(Organisation $organisation): self
    {
        return new self(
            "No Xero tokens found for organisation {$organisation->id}. Please connect to Xero first."
        );
    }

    /**
     * Create exception for when refresh token is expired.
     */
    public static function refreshTokenExpired(Organisation $organisation): self
    {
        return new self(
            "Xero refresh token for organisation {$organisation->id} has expired. Please reconnect to Xero."
        );
    }

    /**
     * Create exception for when token refresh fails.
     */
    public static function refreshFailed(Organisation $organisation, \Throwable $previous): self
    {
        return new self(
            "Failed to refresh Xero access token for organisation {$organisation->id}: {$previous->getMessage()}",
            0,
            $previous
        );
    }
}
