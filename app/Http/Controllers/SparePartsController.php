<?php

namespace App\Http\Controllers;

use App\Models\SparePart;
use App\Models\Supplier;
use App\Models\ProductCategory;
use App\Models\ProductSubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SparePartsController extends Controller
{
    public function datainsights()
    {
        // Fetch all spare parts
        $spareparts = SparePart::with('supplier', 'category', 'subCategory')->get();

        return Inertia::render('SparePart/DataInsights', [
            'spareparts' => $spareparts,
        ]);
    }

    public function store(Request $request)
    {
        // Validation for creating a new spare part
        $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'sku' => 'required|string|max:255',
            'product_name' => 'required|string|max:255',
            'name_in_barcode' => 'required|string|max:255',
            'grade' => 'required|string|max:255',
            'stock' => 'required|integer',
            'minimum_stock' => 'required|integer',
            'capital_price' => 'required|numeric',
            'stock_price' => 'required|numeric',
            'selling_price' => 'required|numeric',
            'ecommerce_link' => 'nullable|string',
            'category_id' => 'required|exists:product_categories,id',
            'sub_category_id' => 'required|exists:product_sub_categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image',
        ]);

        // Handle file upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $request->merge(['image' => $imagePath]);
        }

        // Create the spare part
        SparePart::create($request->all());

        return redirect()->route('spareparts.datainsights')->with('success', 'Spare part created successfully.');
    }
}
