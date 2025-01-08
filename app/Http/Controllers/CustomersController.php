<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
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
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'phone' => 'nullable|string|max:15|unique:customers,phone',
                'customer_type' => 'required|string|in:User,Store',
                'loyalty_points' => 'nullable|numeric|min:0',
            ]);

            $customer = Customer::create($validated);

            return response()->json($customer, 201); // Return created customer
        } catch (ValidationException $e) {
            // Format error messages
            $errorMessages = [];
            foreach ($e->errors() as $field => $messages) {
                $errorMessages[] = implode(", ", $messages);
            }
            return response()->json(['message' => 'Failed to add customer: ' . implode("; ", $errorMessages)], 422);
        } catch (\Exception $e) {
            Log::error('Error adding customer: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to add customer: An unexpected error occurred.'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'phone' => 'nullable|string|max:15|unique:customers,phone,' . $id,
                'customer_type' => 'required|string|in:User,Store',
                'loyalty_points' => 'nullable|numeric|min:0',
            ]);

            $customer = Customer::findOrFail($id);
            $customer->update($request->all());

            return response()->json([
                'message' => 'Customer updated successfully.',
                'customer' => $customer,
            ]);
        } catch (ValidationException $e) {
            // Format error messages
            $errorMessages = [];
            foreach ($e->errors() as $field => $messages) {
                $errorMessages[] = implode(", ", $messages);
            }
            return response()->json(['message' => 'Failed to update customer: ' . implode("; ", $errorMessages)], 422);
        } catch (\Exception $e) {
            Log::error('Error updating customer: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update customer: An unexpected error occurred.'], 500);
        }
    }
}
