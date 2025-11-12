<?php

namespace Modules\Billing\Exceptions;

class BillingProviderNotAvailableException extends \Exception
{
    public function __construct(string $customerId)
    {
        parent::__construct("No billing provider available for customer {$customerId}");
    }
}
