<?php

namespace Modules\Xero\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Customer\Models\Customer;
use Modules\Organisation\Models\Organisation;

/**
 * XeroInvoice Model
 *
 * Stores invoices synced from Xero or created in Xero from the portal.
 * Provides local copy for display and tracking purposes.
 *
 * @property string $id
 * @property string $organisation_id
 * @property string $customer_id
 * @property string $xero_invoice_id
 * @property string|null $xero_invoice_number
 * @property string $invoice_type
 * @property string $status
 * @property \Carbon\Carbon $date
 * @property \Carbon\Carbon|null $due_date
 * @property \Carbon\Carbon|null $fully_paid_at
 * @property float $subtotal
 * @property float $total_tax
 * @property float $total
 * @property float $amount_due
 * @property float $amount_paid
 * @property string $currency_code
 * @property string|null $reference
 * @property array|null $line_items
 * @property string|null $online_invoice_url
 * @property array|null $raw_data
 * @property \Carbon\Carbon|null $last_synced_at
 */
class XeroInvoice extends Model
{
    use BelongsToTenant, HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'organisation_id',
        'customer_id',
        'xero_invoice_id',
        'xero_invoice_number',
        'invoice_type',
        'status',
        'date',
        'due_date',
        'fully_paid_at',
        'subtotal',
        'total_tax',
        'total',
        'amount_due',
        'amount_paid',
        'currency_code',
        'reference',
        'line_items',
        'online_invoice_url',
        'raw_data',
        'last_synced_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'due_date' => 'date',
        'fully_paid_at' => 'datetime',
        'subtotal' => 'decimal:2',
        'total_tax' => 'decimal:2',
        'total' => 'decimal:2',
        'amount_due' => 'decimal:2',
        'amount_paid' => 'decimal:2',
        'line_items' => 'array',
        'raw_data' => 'array',
        'last_synced_at' => 'datetime',
    ];

    /**
     * Get the organisation that owns the invoice.
     */
    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    /**
     * Get the customer associated with the invoice.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the line items for the invoice.
     */
    public function lineItems(): HasMany
    {
        return $this->hasMany(XeroInvoiceLineItem::class);
    }

    /**
     * Scope to filter by invoice status.
     */
    public function scopeStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to get unpaid invoices.
     */
    public function scopeUnpaid($query)
    {
        return $query->where('status', '!=', 'PAID')
            ->where('status', '!=', 'VOIDED')
            ->where('amount_due', '>', 0);
    }

    /**
     * Scope to get paid invoices.
     */
    public function scopePaid($query)
    {
        return $query->where('status', 'PAID');
    }

    /**
     * Scope to get overdue invoices.
     */
    public function scopeOverdue($query)
    {
        return $query->unpaid()
            ->whereNotNull('due_date')
            ->where('due_date', '<', now());
    }

    /**
     * Scope to filter by customer.
     */
    public function scopeForCustomer($query, string $customerId)
    {
        return $query->where('customer_id', $customerId);
    }

    /**
     * Scope to filter by date range.
     */
    public function scopeDateBetween($query, $startDate, $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }

    /**
     * Check if the invoice is paid in full.
     */
    public function isPaid(): bool
    {
        return $this->status === 'PAID' || $this->amount_due <= 0;
    }

    /**
     * Check if the invoice is overdue.
     */
    public function isOverdue(): bool
    {
        if ($this->isPaid() || ! $this->due_date) {
            return false;
        }

        return $this->due_date->isPast();
    }

    /**
     * Get days until due (negative if overdue).
     */
    public function daysUntilDue(): ?int
    {
        if (! $this->due_date) {
            return null;
        }

        return now()->startOfDay()->diffInDays($this->due_date->startOfDay(), false);
    }
}
