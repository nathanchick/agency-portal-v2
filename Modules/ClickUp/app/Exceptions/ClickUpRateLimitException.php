<?php

namespace Modules\ClickUp\Exceptions;

use Exception;

class ClickUpRateLimitException extends Exception
{
    protected int $retryAfter = 60; // Default retry after 60 seconds

    public function __construct(string $message = 'ClickUp API rate limit exceeded', int $code = 429, ?Exception $previous = null, int $retryAfter = 60)
    {
        parent::__construct($message, $code, $previous);
        $this->retryAfter = $retryAfter;
    }

    public function getRetryAfter(): int
    {
        return $this->retryAfter;
    }
}
