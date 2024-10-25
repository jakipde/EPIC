<?php

namespace App\Http\Controllers;

use App\Models\SparePart;
use App\Models\Product;
use App\Models\Category; // Import the Category model
use Illuminate\Http\Request;

class SparePartsController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        // Create the spare part
        $sparePart = SparePart::create($request->all());

        // Find the category for 'Spare Parts'
        $category = Category::where('name', 'Spare Parts')->first();

        // Create a product entry for the spare part
        Product::create([
            'category_id' => $category->id, // Set the category_id
            'type' => $category->name, // Set the type to the category name
            'price' => $request->price,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Spare part created successfully.');
    }
}
