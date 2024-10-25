<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category; // Ensure this is the correct model for data_entries_category
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:data_entries_category,id', // Validate category_id
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        // Fetch the category based on the provided category_id
        $category = Category::find($request->category_id);

        if ($category) {
            // Create a product entry
            Product::create([
                'category_id' => $category->id, // Set the category_id
                'type' => $category->name, // Set the type to the category name
                'price' => $request->price,
                'description' => $request->description,
            ]);

            return redirect()->back()->with('success', 'Product created successfully.');
        } else {
            return redirect()->back()->with('error', 'Category not found.');
        }
    }
}
