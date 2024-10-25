<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\Product;
use App\Models\Category; // Import the Category model
use Illuminate\Http\Request;

class DevicesController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'brand' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'sn' => 'required|string|max:255',
            'imei_1' => 'nullable|string|max:255',
            'imei_2' => 'nullable|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        // Create the device
        $device = Device::create($request->all());

        // Find the category for 'Devices'
        $category = Category::where('name', 'Devices')->first();

        // Create a product entry for the device
        Product::create([
            'category_id' => $category->id, // Set the category_id
            'type' => $category->name, // Set the type to the category name
            'price' => $request->price,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Device created successfully.');
    }
}
