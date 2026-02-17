<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\DeliveryOrder;
use App\Models\Customer;
use App\Models\Sku;
use App\Services\InvoiceService;
use App\Services\PdfService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function __construct(
        protected InvoiceService $invoiceService,
        protected PdfService $pdfService
    ) {
    }

    /**
     * Display Invoice list
     */
    public function index(Request $request)
    {
        $query = Invoice::with(['customer', 'deliveryOrder', 'items'])
            ->when($request->search, function ($q) use ($request) {
                $q->where('invoice_number', 'like', "%{$request->search}%");
            })
            ->when($request->payment_status, function ($q) use ($request) {
                $q->where('payment_status', $request->payment_status);
            });

        $invoices = $query->latest()->paginate(20);

        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices,
            'filters' => $request->only(['search', 'payment_status']),
        ]);
    }

    /**
     * Show create form
     */
    public function create(Request $request)
    {
        $deliveryOrder = null;
        if ($request->do_id) {
            $deliveryOrder = DeliveryOrder::with(['items.sku', 'customer'])
                ->findOrFail($request->do_id);
        }

        return Inertia::render('Invoices/Create', [
            'deliveryOrder' => $deliveryOrder,
            'customers' => Customer::all(),
            'skus' => Sku::active()->with('category')->get(),
        ]);
    }

    /**
     * Store new Invoice
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'delivery_order_id' => 'nullable|exists:delivery_orders,id',
            'customer_id' => 'required|exists:customers,id',
            'due_date' => 'required|date',
            'tax_rate' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.sku_id' => 'required|exists:skus,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.description' => 'nullable|string',
        ]);

        $invoice = $this->invoiceService->createInvoice($validated);

        return redirect()->route('invoices.show', $invoice->id)
            ->with('success', 'Invoice created successfully');
    }

    /**
     * Show Invoice details
     */
    public function show(Invoice $invoice)
    {
        return Inertia::render('Invoices/Show', [
            'invoice' => $invoice->load(['customer', 'deliveryOrder', 'items.sku', 'receipts']),
        ]);
    }

    /**
     * Record payment
     */
    public function recordPayment(Request $request, Invoice $invoice)
    {
        if ($invoice->payment_status === 'paid') {
            return back()->withErrors(['error' => 'Invoice is already fully paid']);
        }

        $validated = $request->validate([
            'payment_method' => 'required|string|in:cash,card,qr,transfer',
            'amount_paid' => 'required|numeric|min:0.01',
            'payment_date' => 'required|date|before_or_equal:today',
            'notes' => 'nullable|string|max:500',
        ]);

        $totalAlreadyPaid = $invoice->receipts()->sum('amount_paid');
        $remainingBalance = $invoice->total_amount - $totalAlreadyPaid;

        if ($validated['amount_paid'] > $remainingBalance) {
            return back()->withErrors([
                'amount_paid' => 'Payment exceeds remaining balance of RM ' . number_format($remainingBalance, 2),
            ]);
        }

        try {
            $this->invoiceService->recordPayment($invoice, $validated);

            return back()->with('success', 'Payment recorded successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Generate PDF
     */
    public function pdf(Invoice $invoice)
    {
        $pdf = $this->pdfService->generateInvoicePdf($invoice);
        return $this->pdfService->streamPdf($pdf, "Invoice-{$invoice->invoice_number}.pdf");
    }
}
