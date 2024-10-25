<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use App\Models\Product;
use App\Models\Category; // Import the Category model
use Illuminate\Http\Request;

class AccessoriesController extends Controller
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

        // Create the accessory
        $accessory = Accessory::create($request->all());

        // Find the category for 'Accessories'
        $category = Category::where('name', 'Accessories')->first();

        // Create a product entry for the accessory
        Product::create([
            'category_id' => $category->id, // Set the category_id
            'type' => $category->name, // Set the type to the category name
            'price' => $request->price,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Accessory created successfully.');
    }
}
