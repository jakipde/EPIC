<?php

namespace App\Http\Controllers;

use App\Models\DataEntry;
use App\Models\Category;
use App\Models\Repair;
use App\Models\Device;
use App\Models\Accessory;
use App\Models\SparePart;
use App\Models\Tool;
use App\Models\Product;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class DataEntryController extends Controller
{
    public function dataInput(Request $request)
    {
        $dataEntries = DataEntry::with('category')->paginate(10);
        $categories = Category::all();

        return Inertia::render('DataEntry/DataInput', [
            'data' => $dataEntries,
            'categories' => $categories,
        ]);
    }

    public function getFields($categoryId)
    {
        $category = Category::find($categoryId);

        if (!$category) {
            return response()->json(['message' => 'Category not found.'], 404);
        }

        $fields = $category->fields;

        if ($fields->isEmpty()) {
            return response()->json(['message' => 'No fields found for this category.'], 404);
        }

        return response()->json($fields);
    }

    public function bulkInput(Request $request)
    {
        return Inertia::render('DataEntry/BulkInput');
    }

    public function store(Request $request)
    {
        Log::info('Incoming request data:', $request->all());

        $validatedData = $request->validate([
            'data_entries_category_id' => 'required|exists:data_entries_category,id',
            'name' => 'required|string|max:255',
            'device' => 'nullable|array',
            'accessories' => 'nullable|array',
            'spare_parts' => 'nullable|array',
            'tools' => 'nullable|array',
        ]);

        try {
            $invoiceNumber = strtoupper(uniqid('INV-'));

            $invoice = Invoice::create([
                'date' => now(),
                'customer_id' => $request->input('customer_id'),
                'description' => 'Invoice for products and repairs',
                'amount' => 0,
            ]);

            $dataEntry = DataEntry::create([
                'data_entries_category_id' => $validatedData['data_entries_category_id'],
                'name' => $validatedData['name'],
                'invoice_number' => $invoiceNumber,
            ]);

            Log::info('DataEntry created:', $dataEntry->toArray());

            $totalAmount = 0;

            // Store related devices, accessories, spare parts, and tools
            $totalAmount += $this->storeRelatedItems($request, $dataEntry, $invoiceNumber);

            $invoice->amount = $totalAmount;
            $invoice->save();

            return redirect()->route('data-entries.data-input')->with('success', 'Data entry created successfully.');
        } catch (\Exception $e) {
            Log::error('Error saving data entry: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Failed to save data entry.']);
        }
    }

    private function storeRelatedItems(Request $request, DataEntry $dataEntry, $invoiceNumber)
    {
        $totalAmount = 0;

        if ($request->has('repair')) {
            $repairData = $request->input('repair');
            $repairData['data_entry_id'] = $dataEntry->id;
            $repairData['invoice_number'] = $invoiceNumber;
            Repair::create($repairData);
        }

        if ($request->has('device')) {
            $deviceData = $request->input('device');
            $deviceData['data_entry_id'] = $dataEntry->id;
            $device = Device::create($deviceData);

            $product = Product::create([
                'device_id' => $device->id,
                'type' => 'device',
                'price' => $deviceData['price'] ?? 0,
                'invoice_number' => $invoiceNumber,
            ]);
            $totalAmount += $product->price;
        }

        // Store related accessories
        if ($request->has('accessories')) {
            foreach ($request->input('accessories') as $accessoryData) {
                $accessoryData['data_entry_id'] = $dataEntry->id;
                $accessory = Accessory::create($accessoryData);

                $product = Product::create([
                    'accessory_id' => $accessory->id,
                    'type ' => 'accessory',
                    'price' => $accessoryData['price'] ?? 0,
                    'invoice_number' => $invoiceNumber,
                ]);
                $totalAmount += $product->price;
            }
        }

        // Store related spare parts
        if ($request->has('spare_parts')) {
            foreach ($request->input('spare_parts') as $sparePartData) {
                $sparePartData['data_entry_id'] = $dataEntry->id;
                $sparePart = SparePart::create($sparePartData);

                $product = Product::create([
                    'sparepart_id' => $sparePart->id,
                    'type' => 'spare_part',
                    'price' => $sparePartData['price'] ?? 0,
                    'invoice_number' => $invoiceNumber,
                ]);
                $totalAmount += $product->price;
            }
        }

        // Store related tools
        if ($request->has('tools')) {
            foreach ($request->input('tools') as $toolData) {
                $toolData['data_entry_id'] = $dataEntry->id;
                $tool = Tool::create($toolData);

                $product = Product::create([
                    'tool_id' => $tool->id,
                    'type' => 'tool',
                    'price' => $toolData['price'] ?? 0,
                    'invoice_number' => $invoiceNumber,
                ]);
                $totalAmount += $product->price;
            }
        }

        return $totalAmount;
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            // Add more fields if needed
        ]);

        $dataEntry = DataEntry::findOrFail($id);
        $dataEntry->update($validatedData);

        return redirect()->route('data-entries.data-input')->with('success', 'Data entry updated successfully.');
    }

    public function destroy($id)
    {
        $dataEntry = DataEntry::findOrFail($id);
        $dataEntry->delete();

        return redirect()->route('data-entries.data-input')->with('success', 'Data entry deleted successfully.');
    }
}
