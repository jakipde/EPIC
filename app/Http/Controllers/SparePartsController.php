<?php

namespace App\Http\Controllers;

use App\Models\SparePart;
use App\Models\Supplier;
use App\Models\ProductCategory;
use App\Models\ProductSubCategory;
use App\Models\Invoice;
use App\Models\Customer;
use App\Models\Payment;
use App\Models\Cashier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SparePartsController extends Controller
{
    public function dashboard()
    {
        // Fetch all spare parts
        $spareparts = SparePart::with('supplier', 'category', 'subCategory', 'invoice', 'customer', 'payment', 'admin')->get();

        return Inertia::render('SparePart/Dashboard', [
            'spareparts' => $spareparts,
        ]);
    }

    public function show($id)
    {
        $spareparts = SparePart::with('supplier', 'category', 'subCategory', 'invoice', 'customer', 'payment', 'admin')->findOrFail($id); // Fetch the spare part by ID

        return Inertia::render('SparePart/Dashboard', [
            'spareparts' => $spareparts,
        ]);
    }

    public function store(Request $request)
    {
        // Validation for creating a new spare part
        $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'code' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'barcode_name' => 'required|string|max:255',
            'grade' => 'required|string|max:255',
            'stock' => 'required|integer',
            'minimum_stock' => 'required|integer',
            'modal_price' => 'required|numeric',
            'store_price' => 'required|numeric',
            'special_price' => 'required|numeric',
            'selling_price' => 'required|numeric',
            'ecommerce_link' => 'nullable|string',
            'category_id' => 'required|exists:product_categories,id',
            'sub_category_id' => 'required|exists:product_sub_categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'invoice_id' => 'required|exists:invoices,id',
            'date' => 'required|date',
            'customer_id' => 'required|exists:customers,id',
            'payment_id' => 'required|exists:payments,id',
            'admin_id' => 'required|exists:cashiers,id',
            'profit' => 'required|numeric',
        ]);

        // Create the spare part
        $sparePart = SparePart::create($request->all());

        return redirect()->route('SparePart/Dashboard')->with('success', 'Spare part created successfully.');
    }
}
