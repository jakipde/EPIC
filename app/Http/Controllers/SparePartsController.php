<?php

namespace App\Http\Controllers;

use App\Models\SparePart;
use App\Models\Product;
use App\Models\Category; // Import the Category model
use Illuminate\Http\Request;
use Inertia\Inertia;

class SparePartsController extends Controller
{
    public function dashboard()
    {
        // Fetch all spare parts
        $spareparts = SparePart::all();

        // Fetch all categories
        $categories = Category::all();

        return Inertia::render('SparePart/Dashboard', [
            'spareparts' => $spareparts,
            'categories' => $categories, // Pass categories to the view
        ]);
    }

    public function show($id)
    {
        $spareparts = SparePart::findOrFail($id); // Fetch the spare part by ID

        return Inertia::render('SparePart/Dashboard', [
            'spareparts' => $spareparts,
        ]);
    }

    public function store(Request $request)
    {
        // Validation for creating a new spare part
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
            'category_id' => $category->id,
            'type' => $category->name,
            'price' => $request->price,
            'description' => $request->description,
        ]);

        return redirect()->route('sparepart.dashboard')->with('success', 'Spare part created successfully.');
    }
}
