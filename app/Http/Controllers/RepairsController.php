<?php

namespace App\Http\Controllers;

use App\Models\Repair;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RepairsController extends Controller
{
    public function dashboard()
    {
        // Fetch repairs data
        $repairs = Repair::all(); // You might want to paginate or filter this

        // Render the dashboard view using Inertia
        return Inertia::render('Repairs/Dashboard', [
            'repairs' => $repairs,
        ]);
    }

    public function datamanagement()
    {
        // Fetch repairs data
        $repairs = Repair::all(); // You might want to paginate or filter this

        // Render the data management view using Inertia
        return Inertia::render('Repairs/DataManagement', [
            'repairs' => $repairs,
        ]);
    }

    public function reports()
    {
        // Fetch repairs data
        $repairs = Repair::all(); // You might want to paginate or filter this

        // Render the reports view using Inertia
        return Inertia::render('Repairs/UsageReports', [
            'repairs' => $repairs,
        ]);
    }

    public function create()
    {
        // Return the view for creating a new repair
        return Inertia::render('Repairs/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'entry_date' => 'required|date',
            'customer_id' => 'required|exists:customers,id',
            'cashier_id' => 'required|exists:admins,id',
            'phone_brand' => 'required|string|max:255',
            'phone_model' => 'required|string|max:255',
            'imei_sn_1' => 'nullable|string|max:255',
            'imei_sn_2' => 'nullable|string|max:255',
            'damage_description' => 'required|string',
            'technician_id' => 'required|exists:technicians,id',
            'under_warranty' => 'required|boolean',
            'warranty_duration' => 'nullable|integer',
            'notes' => 'nullable|string',
            'repair_type' => 'required|string|max:255',
        ]);

        try {
            // Create the repair
            $repair = Repair::create($request->all());

            // Redirect to the dashboard after successful creation
            return redirect()->route('repairs.dashboard')->with('success', 'Repair created successfully.');
        } catch (\Exception $e) {
            Log::error('Error saving repair: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Failed to save repair.']);
        }
    }

    public function show($id)
    {
        // Fetch the repair record by ID
        $repair = Repair::findOrFail($id);

        // Return the Inertia response with the repair data
        return Inertia::render('Repairs/Show', [
            'repair' => $repair,
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validate incoming request data
        $request->validate([
            'entry_date' => 'required|date',
            'customer_id' => 'required|exists:customers,id',
            'cashier_id' => 'required|exists:admins,id',
            'phone_brand' => 'required|string|max:255',
            'phone_model' => 'required|string|max:255',
            'damage_description' => 'required|string',
            'technician_id' => 'required|exists:technicians,id',
            'under_warranty' => 'required|boolean',
            'warranty_duration' => 'nullable|integer',
            'notes' => 'nullable|string',
            'repair_type' => 'required|string|max:255',
        ]);

        try {
            // Find the repair by ID
            $repair = Repair::findOrFail($id);
            // Update the repair record
            $repair->update($request->all());

            // Redirect to the dashboard after successful update
            return redirect()->route('repairs.dashboard')->with('success', 'Repair updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating repair: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Failed to update repair.']);
        }
    }

    public function destroy($id)
    {
        try {
            // Find the repair by ID
 $repair = Repair::findOrFail($id);
            // Delete the repair record
            $repair->delete();

            return response()->json(['success' => true, 'message' => 'Repair deleted successfully.']);
        } catch (\Exception $e) {
            Log::error('Error deleting repair: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to delete repair.'], 500);
        }
    }
}
