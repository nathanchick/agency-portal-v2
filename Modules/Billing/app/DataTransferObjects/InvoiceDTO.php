<?php

namespace Modules\Billing\DataTransferObjects;

use Carbon\Carbon;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Collection;

/**
 * InvoiceDTO
 *
 * Normalized invoice data structure.
 * Provides consistent interface regardless of billing provider (Xero, QuickBooks, etc.).
 */
class InvoiceDTO implements Arrayable
{
    /**
     * @param  Collection<LineItemDTO>  $lineItems
     */
    public function __construct(
        public readonly string $id,
        public readonly string $invoiceNumber,
        public readonly string $status,
        public readonly Carbon $date,
        public readonly ?Carbon $dueDate,
        public readonly float $subtotal,
        public readonly float $totalTax,
        public readonly float $total,
        public readonly float $amountDue,
        public readonly float $amountPaid,
        public readonly string $currencyCode,
        public readonly ?string $reference,
        public readonly ?string $onlineInvoiceUrl,
        public readonly ?Carbon $fullyPaidAt,
        public readonly Collection $lineItems,
        public readonly string $provider,
        public readonly ?Carbon $lastSyncedAt = null,
    ) {
    }

    /**
     * Create from Xero invoice.
     */
    public static function fromXeroInvoice(\Modules\Xero\Models\XeroInvoice $invoice): self
    {
        $lineItems = $invoice->lineItems->map(fn ($item) => LineItemDTO::fromXeroLineItem($item));

        return new self(
            id: $invoice->id,
            invoiceNumber: $invoice->xero_invoice_number,
            status: self::normalizeStatus($invoice->status),
            date: Carbon::parse($invoice->date),
            dueDate: $invoice->due_date ? Carbon::parse($invoice->due_date) : null,
            subtotal: (float) $invoice->subtotal,
            totalTax: (float) $invoice->total_tax,
            total: (float) $invoice->total,
            amountDue: (float) $invoice->amount_due,
            amountPaid: (float) $invoice->amount_paid,
            currencyCode: $invoice->currency_code,
            reference: $invoice->reference,
            onlineInvoiceUrl: $invoice->online_invoice_url,
            fullyPaidAt: $invoice->fully_paid_at ? Carbon::parse($invoice->fully_paid_at) : null,
            lineItems: $lineItems,
            provider: 'xero',
            lastSyncedAt: $invoice->last_synced_at ? Carbon::parse($invoice->last_synced_at) : null,
        );
    }

    /**
     * Normalize status across different providers.
     * Maps provider-specific statuses to common statuses.
     */
    private static function normalizeStatus(string $providerStatus): string
    {
        // Map Xero statuses to normalized statuses
        return match (strtoupper($providerStatus)) {
            'DRAFT' => 'draft',
            'SUBMITTED' => 'submitted',
            'AUTHORISED', 'APPROVED' => 'approved',
            'PAID' => 'paid',
            'VOIDED', 'DELETED' => 'cancelled',
            default => strtolower($providerStatus),
        };
    }

    /**
     * Check if invoice is paid.
     */
    public function isPaid(): bool
    {
        return $this->status === 'paid' || $this->amountDue <= 0;
    }

    /**
     * Check if invoice is overdue.
     */
    public function isOverdue(): bool
    {
        if ($this->isPaid() || ! $this->dueDate) {
            return false;
        }

        return $this->dueDate->isPast();
    }

    /**
     * Get days until due (negative if overdue).
     */
    public function daysUntilDue(): ?int
    {
        if (! $this->dueDate) {
            return null;
        }

        return now()->startOfDay()->diffInDays($this->dueDate->startOfDay(), false);
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'invoice_number' => $this->invoiceNumber,
            'status' => $this->status,
            'date' => $this->date->toDateString(),
            'due_date' => $this->dueDate?->toDateString(),
            'subtotal' => $this->subtotal,
            'total_tax' => $this->totalTax,
            'total' => $this->total,
            'amount_due' => $this->amountDue,
            'amount_paid' => $this->amountPaid,
            'currency_code' => $this->currencyCode,
            'reference' => $this->reference,
            'online_invoice_url' => $this->onlineInvoiceUrl,
            'fully_paid_at' => $this->fullyPaidAt?->toDateString(),
            'line_items' => $this->lineItems->map->toArray()->toArray(),
            'provider' => $this->provider,
            'last_synced_at' => $this->lastSyncedAt?->toIso8601String(),
            'is_paid' => $this->isPaid(),
            'is_overdue' => $this->isOverdue(),
            'days_until_due' => $this->daysUntilDue(),
        ];
    }
}
