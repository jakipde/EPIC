<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminsController extends Controller
{
    // Fetch all admins
    public function index()
    {
        $admins = Admin::all();
        return response()->json($admins);
    }

    // Create a new admin
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15',
            'email' => 'nullable|email|max:255',
            'user_id' => 'required|ulid|exists:users,id', // Ensure user_id exists in users table
            'role' => 'required|in:admin,cashier',
            'username' => 'required|string|unique:admins,username|max:255',
            'password' => 'required|string|min:8', // Ensure password is at least 8 characters
        ]);

        // Hash the password before saving
        $validated['password'] = Hash::make($validated['password']);

        $admin = Admin::create($validated);

        return response()->json($admin, 201); // Return created admin
    }

    // Update an existing admin
    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15',
            'email' => 'nullable|email|max:255',
            'role' => 'required|in:admin,cashier',
            'username' => 'required|string|max:255|unique:admins,username,' . $admin->id,
            'password' => 'nullable|string|min:8', // Password is optional for update
        ]);

        if (isset($validated['password'])) {
            // Hash the password if it's being updated
            $validated['password'] = Hash::make($validated['password']);
        } else {
            // Remove password from validated data if not updating
            unset($validated['password']);
        }

        $admin->update($validated);

        return response()->json(['message' => 'Admin updated successfully.', 'admin' => $admin]);
    }

    // Delete an admin
    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);
        $admin->delete();

        return response()->json(['message' => 'Admin deleted successfully.']);
    }
}
