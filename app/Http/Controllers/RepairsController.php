<?php

namespace App\Http\Controllers;

use App\Models\Repair;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RepairsController extends Controller
{
    public function index()
    {
        // Fetch all repairs from the database
        $repairs = Repair::all(); // You can also use pagination if needed

        // Return an Inertia response with the repairs data
        return Inertia::render('Repairs/Dashboard', [
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
            'under_warranty' => 'required|in:Yes,No', // Accepts "Yes" or "No"
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
                'invoice_number' => $invoiceNumber, // Set the invoice number here
            ]);

            // Create the invoice
            $invoice = Invoice::create([
                'date' => now(),
                'customer_id' => $request->input('customer_id'),
                'description' => 'Repair for ' . $request->input('phone_brand'),
                'amount' => 0,
                'invoice_number' => $invoiceNumber, // Ensure this is set
            ]);

            // Prepare repair data
            $repairData = $request->all();
            $repairData['invoice_number'] = $invoiceNumber; // Ensure this is set for the repair
            $repairData['invoice_id'] = $invoice->id; // If you have a foreign key in the repairs table
            $repairData['under_warranty'] = $repairData['under_warranty'] === 'Yes'; // Convert to boolean

            // Create the repair
            $repair = Repair::create($repairData);

            // Return a valid Inertia response
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

}
