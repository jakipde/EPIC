<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomersController extends Controller
{
    public function index()
    {
        // Fetch all customers
        $customers = Customer::all();
        return response()->json($customers);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15|unique:customers,phone', // Phone is now nullable
            'customer_type' => 'required|string|in:User ,Store', // Validate customer type
            'loyalty_points' => 'nullable|numeric|min:0', // Allow loyalty points to be optional
        ]);

        $customer = Customer::create($validated);

        return response()->json($customer, 201); // Return created customer
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15|unique:customers,phone,' . $id, // Phone is now nullable and unique except for the current customer
            'customer_type' => 'required|string|in:User ,Store', // Validate customer type
            'loyalty_points' => 'nullable|numeric|min:0', // Allow loyalty points to be optional
        ]);

        $customer = Customer::findOrFail($id);
        $customer->update($request->all());

        return response()->json([
            'message' => 'Customer updated successfully.',
            'customer' => $customer,
        ]);
    }
}
