<?php

namespace App\Http\Controllers;

use App\Models\Repair;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RepairsController extends Controller
{
    public function index()
    {
        // Fetch repairs data with pagination
        $repairs = Repair::paginate(10); // Adjust the number as needed

        // Return the repairs as JSON
        return response()->json($repairs);
    }

    public function datamanagement()
    {
        $repairs = Repair::all();

        return Inertia::render('Repairs/DataManagement', [
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
    $validator = Validator::make($request->all(), [
        'entry_date' => 'required|date',
        'customer_id' => 'required|exists:customers,id',
        'cashier_id' => 'required|exists:users,id',  // Adjusted to use cashier_id
        'technician_id' => 'required|exists:users,id', // Adjusted to use technician_id
        'phone_brand' => 'required|string|max:255',
        'phone_model' => 'required|string|max:255',
        'imei_sn_1' => 'nullable|string|max:255',
        'imei_sn_2' => 'nullable|string|max:255',
        'damage_description' => 'required|string',
        'under_warranty' => 'required|boolean',
        'warranty_duration' => 'nullable|integer',
        'notes' => 'nullable|string',
        'repair_type' => 'required|string|max:255',
        'service_type' => 'nullable|string|max:255',
        'total_price' => 'required|numeric',
        'down_payment' => 'nullable|numeric',
        'sub_total' => 'nullable|numeric',
        'completeness' => 'nullable|array', // Accept completeness as an array
        'invoice_number' => 'required|string|max:255',
    ]);

    if ($validator->fails()) {
        return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
    }

    try {
        // Process the completeness field
        $requestData = $request->all();
        if (isset($requestData['completeness'])) {
            $requestData['completeness'] = json_encode($requestData['completeness']);
        }

        // Create the repair
        $repair = Repair::create($requestData);
        return response()->json(['success' => true, 'message' => 'Repair created successfully.', 'repair' => $repair], 201);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'message' => 'Failed to save repair. ' . $e->getMessage()], 500);
    }
}

    public function show($id)
    {
        // Fetch the repair record by ID
        $repair = Repair::find($id); // Use find() for debugging

        if (!$repair) {
            return response()->json(['error' => 'Repair not found'], 404);
        }

        // Return the repair data as JSON
        return response()->json($repair);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'entry_date' => 'required|date',
            'customer_id' => 'required|exists:customers,id',
            'cashier_name' => 'required|exists:users,id',
            'phone_brand' => 'required|string|max:255',
            'phone_model' => 'required|string|max:255',
            'damage_description' => 'required|string',
            'technician_name' => 'required|exists:users,id',
            'under_warranty' => 'required|boolean',
            'warranty_duration' => 'nullable|integer',
            'notes' => 'nullable|string',
            'repair_type' => 'required|string|max:255',
            'service_type' => 'nullable|string|max:255', // Add this line if service_type is needed
            'total_price' => 'required|numeric',
            'down_payment' => 'nullable|numeric',
            'completeness' => 'nullable|string', // Add completeness if required
        ]);

        try {
            // Find the repair by ID
            $repair = Repair::findOrFail($id);
            // Update the repair record
            $repair->update($request->all());

            return response()->json(['success' => true, 'message' => 'Repair updated successfully.']);
        } catch (\Exception $e) {
            Log::error('Error updating repair: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to update repair.'], 500);
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
