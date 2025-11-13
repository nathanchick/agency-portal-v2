<?php

namespace Modules\Xero\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * XeroInvoiceLineItem Model
 *
 * Represents individual line items on a Xero invoice.
 * Stored in normalized format for better queryability.
 *
 * @property string $id
 * @property string $xero_invoice_id
 * @property string|null $xero_line_item_id
 * @property string $description
 * @property float $quantity
 * @property float $unit_amount
 * @property string|null $account_code
 * @property string|null $item_code
 * @property string|null $tax_type
 * @property float $tax_amount
 * @property float $line_amount
 */
class XeroInvoiceLineItem extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'xero_invoice_id',
        'xero_line_item_id',
        'description',
        'quantity',
        'unit_amount',
        'account_code',
        'item_code',
        'tax_type',
        'tax_amount',
        'line_amount',
        'line_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'decimal:2',
        'unit_amount' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'line_amount' => 'decimal:2',
    ];

    /**
     * Get the invoice that owns the line item.
     */
    public function invoice(): BelongsTo
    {
        return $this->belongsTo(XeroInvoice::class, 'xero_invoice_id');
    }

    /**
     * Get the total amount including tax.
     */
    public function getTotalAmountAttribute(): float
    {
        return $this->line_amount + $this->tax_amount;
    }

    /**
     * Check if this line item has tax applied.
     */
    public function hasTax(): bool
    {
        return $this->tax_amount > 0;
    }
}
