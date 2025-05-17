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
        try {
            $customers = Customer::all(); // Fetch all customers
            return response()->json($customers); // Return customers as JSON
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch customers.'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Validate incoming request data
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'phone' => 'nullable|string|max:15|unique:customers,phone',
                'customer_type' => 'required|string|in:User,Store',
                'loyalty_points' => 'nullable|numeric|min:0',
            ]);

            // Create a new customer
            $customer = Customer::create($validated);

            return response()->json($customer, 201); // Return created customer with status 201
        } catch (ValidationException $e) {
            // Format error messages
            $errorMessages = [];
            foreach ($e->errors() as $field => $messages) {
                $errorMessages[] = implode(", ", $messages);
            }
            return response()->json(['message' => 'Failed to add customer: ' . implode("; ", $errorMessages)], 422);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error adding customer: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to add customer: An unexpected error occurred.'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Validate incoming request data
            $request->validate([
                'name' => 'required|string|max:255',
                'phone' => 'nullable|string|max:15|unique:customers,phone,' . $id,
                'customer_type' => 'required|string|in:User,Store',
                'loyalty_points' => 'nullable|numeric|min:0',
            ]);

            // Find customer by ID and update
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
            // Log the error
            Log::error('Error updating customer: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update customer: An unexpected error occurred.'], 500);
        }
    }

    public function show($id)
    {
        try {
            // Find and return a single customer
            $customer = Customer::findOrFail($id);
            return response()->json($customer);
        } catch (\Exception $e) {
            Log::error('Error fetching customer: ' . $e->getMessage());
            return response()->json(['message' => 'Customer not found.'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            // Find and delete the customer
            $customer = Customer::findOrFail($id);
            $customer->delete();
            return response()->json(['message' => 'Customer deleted successfully.'], 204);
        } catch (\Exception $e) {
            Log::error('Error deleting customer: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to delete customer: An unexpected error occurred.'], 500);
        }
    }
}
