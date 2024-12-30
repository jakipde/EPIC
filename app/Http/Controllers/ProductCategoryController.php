<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Models\ProductSubCategory;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    public function index()
    {
        return response()->json(ProductCategory::all(['id', 'name']));
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'supplier_id' => 'required|exists:suppliers,id',
        ]);

        try {
            // Create a new category
            $category = ProductCategory::create($request->all());
            return response()->json($category, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create category'], 500);
        }
    }

    public function show($id)
    {
        try {
            // Retrieve a specific category
            $category = ProductCategory::findOrFail($id);
            return response()->json($category);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'supplier_id' => 'sometimes|required|exists:suppliers,id',
        ]);

        try {
            // Update the category
            $category = ProductCategory::findOrFail($id);
            $category->update($request->all());
            return response()->json($category);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update category'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Delete a category
            $category = ProductCategory::findOrFail($id);
            $category->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete category'], 500);
        }
    }

    // Fetch subcategories based on category ID
    public function getSubCategories($categoryId)
    {
        try {
            $subCategories = ProductSubCategory::where('product_category_id', $categoryId)
                ->get(['id', 'name']); // Fetch only id and name

            return response()->json($subCategories);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch subcategories'], 500);
        }
    }
}
