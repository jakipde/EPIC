<?php

namespace App\Http\Controllers;

use App\Models\ProductSubCategory;
use Illuminate\Http\Request;

class ProductSubCategoryController extends Controller
{
    public function index()
    {
        return response()->json(ProductSubCategory::all(['id', 'name']));
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'product_category_id' => 'required|exists:product_categories,id',
        ]);

        try {
            // Create a new subcategory
            $subCategory = ProductSubCategory::create($request->all());
            return response()->json($subCategory, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create subcategory'], 500);
        }
    }

    public function show($id)
    {
        try {
            // Retrieve a specific subcategory
            $subCategory = ProductSubCategory::findOrFail($id);
            return response()->json($subCategory);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Subcategory not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'product_category_id' => 'sometimes|required|exists:product_categories,id',
        ]);

        try {
            // Update the subcategory
            $subCategory = ProductSubCategory::findOrFail($id);
            $subCategory->update($request->all());
            return response()->json($subCategory);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update subcategory'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Delete a subcategory
            $subCategory = ProductSubCategory::findOrFail($id);
            $subCategory->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete subcategory'], 500);
        }
    }
}
