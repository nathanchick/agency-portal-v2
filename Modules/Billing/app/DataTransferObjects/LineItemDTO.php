<?php

namespace Modules\Billing\DataTransferObjects;

use Illuminate\Contracts\Support\Arrayable;

/**
 * LineItemDTO
 *
 * Normalized line item data structure.
 * Provides consistent interface regardless of billing provider.
 */
class LineItemDTO implements Arrayable
{
    public function __construct(
        public readonly string $id,
        public readonly string $description,
        public readonly float $quantity,
        public readonly float $unitAmount,
        public readonly float $lineAmount,
        public readonly float $taxAmount,
        public readonly ?string $accountCode = null,
        public readonly ?string $taxType = null,
        public readonly ?string $itemCode = null,
        public readonly int $lineOrder = 1,
    ) {
    }

    /**
     * Create from Xero invoice line item.
     */
    public static function fromXeroLineItem(\Modules\Xero\Models\XeroInvoiceLineItem $lineItem): self
    {
        return new self(
            id: $lineItem->id,
            description: $lineItem->description,
            quantity: (float) $lineItem->quantity,
            unitAmount: (float) $lineItem->unit_amount,
            lineAmount: (float) $lineItem->line_amount,
            taxAmount: (float) $lineItem->tax_amount,
            accountCode: $lineItem->account_code,
            taxType: $lineItem->tax_type,
            itemCode: $lineItem->item_code,
            lineOrder: $lineItem->line_order,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'unit_amount' => $this->unitAmount,
            'line_amount' => $this->lineAmount,
            'tax_amount' => $this->taxAmount,
            'account_code' => $this->accountCode,
            'tax_type' => $this->taxType,
            'item_code' => $this->itemCode,
            'line_order' => $this->lineOrder,
        ];
    }
}
