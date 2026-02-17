<?php

namespace App\Services;

use App\Models\DeliveryOrder;
use App\Models\DeliveryOrderItem;
use App\Services\InventoryService;
use Illuminate\Support\Facades\DB;
use Exception;

class DeliveryOrderService
{
    public function __construct(
        protected InventoryService $inventoryService
    ) {
    }

    /**
     * Generate unique DO number
     */
    public function generateDoNumber(): string
    {
        $year = now()->year;
        $prefix = "DO-{$year}-";

        $lastDo = DeliveryOrder::where('do_number', 'like', "{$prefix}%")
            ->orderBy('do_number', 'desc')
            ->first();

        if ($lastDo) {
            $lastNumber = (int) substr($lastDo->do_number, -4);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $prefix . str_pad($newNumber, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Create Delivery Order
     */
    public function createDeliveryOrder(array $data): DeliveryOrder
    {
        return DB::transaction(function () use ($data) {
            $doNumber = $this->generateDoNumber();

            $do = DeliveryOrder::create([
                'do_number' => $doNumber,
                'purchase_order_id' => $data['purchase_order_id'] ?? null,
                'customer_id' => $data['customer_id'] ?? null,
                'delivery_date' => $data['delivery_date'],
                'status' => $data['status'] ?? 'pending',
                'notes' => $data['notes'] ?? null,
            ]);

            foreach ($data['items'] as $item) {
                DeliveryOrderItem::create([
                    'delivery_order_id' => $do->id,
                    'sku_id' => $item['sku_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['quantity'] * $item['unit_price'],
                ]);
            }

            return $do->fresh(['items.sku', 'customer', 'purchaseOrder']);
        });
    }

    /**
     * Complete delivery and update stock
     */
    public function completeDelivery(DeliveryOrder $do): DeliveryOrder
    {
        if ($do->status !== 'pending') {
            throw new Exception("Only pending DOs can be completed");
        }

        DB::transaction(function () use ($do) {
            // Update stock for each item
            foreach ($do->items as $item) {
                $this->inventoryService->addStock(
                    $item->sku,
                    $item->quantity,
                    'delivery_order',
                    $do->id,
                    "Delivery Order {$do->do_number}"
                );
            }

            // Update DO status
            $do->update(['status' => 'completed']);

            // Mark linked PO as received if exists
            if ($do->purchase_order_id) {
                $po = $do->purchaseOrder;
                if ($po && $po->status === 'approved') {
                    app(PurchaseOrderService::class)->markAsReceived($po);
                }
            }
        });

        return $do->fresh();
    }

    /**
     * Cancel Delivery Order
     */
    public function cancelDeliveryOrder(DeliveryOrder $do): DeliveryOrder
    {
        if ($do->status === 'completed') {
            throw new Exception("Cannot cancel completed DO");
        }

        $do->update(['status' => 'cancelled']);

        return $do->fresh();
    }
}
