<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SupplierController extends Controller
{
    public function index()
    {
        try {
            $suppliers = Supplier::all(['id', 'name']);
            return response()->json($suppliers);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch suppliers'], 500);
        }
    }

    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'contact_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:15',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            // Create a new supplier
            $supplier = Supplier::create($request->all());
            return response()->json($supplier, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create supplier'], 500);
        }
    }

    public function show($id)
    {
        try {
            $supplier = Supplier::findOrFail($id);
            return response()->json($supplier);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Supplier not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'contact_name' => 'sometimes|nullable|string|max:255',
            'phone' => 'sometimes|nullable|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $supplier = Supplier::findOrFail($id);
            $supplier->update($request->all());
            return response()->json($supplier);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update supplier'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $supplier = Supplier::findOrFail($id);
            $supplier->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete supplier'], 500);
        }
    }

    // Fetch categories based on supplier ID
    public function getCategories($supplierId)
    {
        try {
            $categories = ProductCategory::where('supplier_id', $supplierId)
                ->get(['id', 'name']);
            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch categories'], 500);
        }
    }
}
