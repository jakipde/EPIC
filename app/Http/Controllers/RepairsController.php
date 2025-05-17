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
<<<<<<< Updated upstream
        // Fetch repairs data with pagination
        $repairs = Repair::paginate(10); // Adjust the number as needed

        // Return the repairs as JSON
        return response()->json($repairs);
=======


        try {
            $repairs = Repair::paginate(10);
            return Inertia::render('Repairs/Dashboard', [
                'repairs' => $repairs,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching repairs: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch repairs.'], 500);
        }
>>>>>>> Stashed changes
    }
    

    public function datamanagement()
    {
        $repairs = Repair::all();

        return Inertia::render('Repairs/DataManagement', [
            'repairs' => $repairs->map(function ($repair) {
                return [
                    'id' => $repair->id,
                    'customer_id' => $repair->customer_id,
                    'cashier_id' => $repair->cashier_id,
                    'technician_id' => $repair->technician_id,
                    'phone_brand' => $repair->phone_brand,
                    'phone_model' => $repair->phone_model,
                    'imei_sn_1' => $repair->imei_sn_1,
                    'imei_sn_2' => $repair->imei_sn_2,
                    'damage_description' => $repair->damage_description,
                    'under_warranty' => $repair->under_warranty,
                    'warranty_duration' => $repair->warranty_duration,
                    'warranty_unit' => $repair->warranty_unit,
                    'notes' => $repair->notes,
                    'repair_type' => $repair->repair_type,
                    'service_type' => $repair->service_type,
                    'total_price' => $repair->total_price,
                    'down_payment' => $repair->down_payment,
                    'sub_total' => $repair->sub_total,
                    'payment_status' => $repair->payment_status,
                    'remaining_payment' => $repair->remaining_payment,
                    'exit_date' => $repair->exit_date,
                    'print_type' => $repair->print_type,
                    'invoice_number' => $repair->invoice_number,
                    'payment_method' => $repair->payment_method,
                    'completeness' => $repair->completeness,
                    'repair_status' => $repair->repair_status,
                    'created_at' => $repair->created_at, // Include created_at
                ];
            }),
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
            'customer_id' => 'required|exists:customers,id',
            'cashier_id' => 'required|exists:users,id',
            'technician_id' => 'required|exists:users,id',
            'phone_brand' => 'required|string|max:255',
            'phone_model' => 'required|string|max:255',
            'imei_sn_1' => 'nullable|string|max:255',
            'imei_sn_2' => 'nullable|string|max:255',
            'damage_description' => 'required|string',
            'under_warranty' => 'required|boolean',
            'warranty_duration' => 'nullable|integer',
            'warranty_unit' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'repair_type' => 'required|string|max:255',
            'service_type' => 'nullable|string|max:255',
            'total_price' => 'required|numeric',
            'down_payment' => 'nullable|numeric',
            'sub_total' => 'nullable|numeric',
            'payment_method' => 'required|string|max:255',
            'completeness' => 'nullable|array',
            'invoice_number' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        try {
            $requestData = $request->all();
            if (isset($requestData['completeness'])) {
                $requestData['completeness'] = json_encode($requestData['completeness']);
            }

            // Calculate remaining payment
            $requestData['remaining_payment'] = $requestData['total_price'] - ($requestData['down_payment'] ?? 0);
            // Set payment status based on remaining payment
            $requestData['payment_status'] = $requestData['remaining_payment'] > 0 ? 'In Debt' : 'Paid off';

            // Create the repair
            $repair = Repair::create($requestData);
            return response()->json(['success' => true, 'message' => 'Repair created successfully.', 'repair' => $repair], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to save repair. ' . $e->getMessage()], 500);
        }
    }

    public function updateStatus(Request $request, Repair $repair)
    {
        $request->validate([
            'repair_status' => 'required|string',
        ]);

        $repair->repair_status = $request->repair_status;
        $repair->save();

        return response()->json(['success' => true, 'message' => 'Status updated successfully.']);
    }

    public function show($id)
    {
        $repair = Repair::find($id);
        if (!$repair) {
            return response()->json(['error' => 'Repair not found'], 404);
        }
        return response()->json($repair);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'cashier_id' => 'required|exists:users,id',
            'technician_id' => 'required|exists:users,id',
            'phone_brand' => 'required|string|max:255',
            'phone_model' => 'required|string|max:255',
            'damage_description' => 'required|string',
            'under_warranty' => 'required|boolean',
            'warranty_duration' => 'nullable|integer',
            'warranty_unit' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'repair_type' => 'required|string|max:255',
            'service_type' => 'nullable|string|max:255',
            'total_price' => 'required|numeric',
            'down_payment' => 'nullable|numeric',
            'sub_total' => 'nullable|numeric',
            'payment_method' => 'required|string|max:255',
        ]);

        try {
            $repair = Repair::findOrFail($id);
            $requestData = $request->all();

            // Calculate remaining payment
            $requestData['remaining_payment'] = $requestData['total_price'] - ($requestData['down_payment'] ?? 0);
            // Set payment status based on remaining payment
            $requestData['payment_status'] = $requestData['remaining_payment'] > 0 ? 'In Debt' : 'Paid off';

            $repair->update($requestData);

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
