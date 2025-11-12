<?php

namespace Modules\Billing\Exceptions;

class InvoiceNotFoundException extends \Exception
{
    public function __construct(string $invoiceId, string $provider)
    {
        parent::__construct("Invoice {$invoiceId} not found for provider {$provider}");
    }
}
