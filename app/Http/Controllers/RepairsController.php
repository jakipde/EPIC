<?php

namespace App\Http\Controllers;

use App\Models\Repair;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RepairsController extends Controller
{
    public function dashboard()
    {
        // Fetch repairs data, you might want to paginate or filter this
        $repairs = Repair::all(); // Adjust this as needed

        // Render the dashboard view using Inertia
        return Inertia::render('Repairs/Dashboard', [
            'repairs' => $repairs,
        ]);
    }

    public function datamanagement()
    {
        // Fetch repairs data, you might want to paginate or filter this
        $repairs = Repair::all(); // Adjust this as needed

        // Render the dashboard view using Inertia
        return Inertia::render('Repairs/DataManagement', [
            'repairs' => $repairs,
        ]);
    }

    public function reports()
    {
        // Fetch repairs data, you might want to paginate or filter this
        $repairs = Repair::all(); // Adjust this as needed

        // Render the dashboard view using Inertia
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
            'cashier' => 'required|string|max:255',
            'phone_brand' => 'required|string|max:255',
            'imei_sn_1' => 'nullable|string|max:255',
            'imei_sn_2' => 'nullable|string|max:255',
            'damage_description' => 'required|string',
            'phone_accessories' => 'nullable|string',
            'technician_id' => 'required|exists:technicians,id',
            'under_warranty' => 'required|in:Yes,No',
            'warranty_duration' => 'nullable|integer',
            'exit_date' => 'nullable|date',
            'print_type' => 'required|string|max:255',
        ]);

        try {
            // Generate a unique invoice number
            $invoiceNumber = strtoupper(uniqid('INV-'));

            // Log the invoice data before creating it
            Log::info('Creating invoice with data:', [
                'date' => now(),
                'customer_id' => $request->input('customer_id'),
                'description' => 'Repair for ' . $request->input('phone_brand'),
                'amount' => 0,
                'invoice_number' => $invoiceNumber,
            ]);

            // Create the invoice
            $invoice = Invoice::create([
                'date' => now(),
                'customer_id' => $request->input('customer_id'),
                'description' => 'Repair for ' . $request->input('phone_brand'),
                'amount' => 0,
                'invoice_number' => $invoiceNumber,
            ]);

            // Prepare repair data
            $repairData = $request->all();
            $repairData['invoice_number'] = $invoiceNumber;
            $repairData['invoice_id'] = $invoice->id;
            $repairData['under_warranty'] = $repairData['under_warranty'] === 'Yes';

            // Create the repair
            $repair = Repair::create($repairData);

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
            'cashier' => 'required|string|max:255',
            'phone_brand' => 'required|string|max:255',
            'damage_description' => 'required|string',
            'technician_id' => 'required|exists:technicians,id',
            // Add other validation rules as necessary
        ]);

        try {
            // Find the repair by ID
            $repair = Repair::findOrFail($id);
            // Update the repair record
            $repair->update($request-> all());

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
