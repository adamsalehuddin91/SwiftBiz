<?php

namespace App\Http\Controllers;

use App\Services\FinanceService;
use App\Models\Sku;
use App\Models\PurchaseOrder;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        protected FinanceService $financeService
    ) {
    }

    public function index()
    {
        // Finance Metrics (Current Month)
        $financeSummary = $this->financeService->getMonthlySummary(now()->format('Y-m'));

        // Inventory Metrics
        $totalSkus = Sku::count();
        $lowStockCount = Sku::whereColumn('current_stock', '<=', 'min_stock_level')->count();
        $outOfStockCount = Sku::where('current_stock', '<=', 0)->count();

        // Pending Actions
        $pendingPOs = PurchaseOrder::where('status', 'pending')->count();
        $unpaidInvoices = Invoice::where('payment_status', 'unpaid')->count();
        $overdueInvoices = Invoice::where('payment_status', '!=', 'paid')
            ->where('due_date', '<', now())
            ->count();

        return Inertia::render('Dashboard', [
            'finance' => $financeSummary,
            'inventory' => [
                'total' => $totalSkus,
                'low_stock' => $lowStockCount,
                'out_of_stock' => $outOfStockCount,
            ],
            'actions' => [
                'pending_pos' => $pendingPOs,
                'unpaid_invoices' => $unpaidInvoices,
                'overdue_invoices' => $overdueInvoices,
            ],
        ]);
    }
}
