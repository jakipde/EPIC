<?php

namespace App\Http\Controllers;

use App\Models\DataEntry;
use App\Models\Category;
use App\Models\CategoryField;
use App\Models\Repair;
use App\Models\Device;
use App\Models\Accessory;
use App\Models\SparePart;
use App\Models\Tool;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Response;

class DataEntryController extends Controller
{
    public function dataInput(Request $request)
    {
        // Eager load 'fields' and 'categoryData' (polymorphic data) for each category
        $categories = Category::with(['fields', 'categoryData'])->get();

        // Get data entries with category details
        $dataEntries = DataEntry::with('category')->paginate(10);

        return Inertia::render('DataEntry/DataInput', [
            'data' => $dataEntries,
            'categories' => $categories,
        ]);
    }

    public function bulkInput(Request $request)
    {
        return Inertia::render('DataEntry/BulkInput');
    }

    public function store(Request $request)
    {
        Log::info('Incoming request data:', $request->all());

        $validatedData = $request->validate([
            'entry_type' => 'required|string',
            'data' => 'required|array',
        ]);

        try {
            $entryType = $validatedData['entry_type'];
            $data = $validatedData['data'];

            switch ($entryType) {
                case 'repairs':
                    $repair = Repair::create($data);
                    Log::info('Repair created:', $repair->toArray());
                    break;
                case 'devices':
                    $device = Device::create($data);
                    Log::info('Device created:', $device->toArray());
                    break;
                case 'accessories':
                    $accessory = Accessory::create($data);
                    Log::info('Accessory created:', $accessory->toArray());
                    break;
                case 'spare_parts':
                    $sparePart = SparePart::create($data);
                    Log::info('Spare part created:', $sparePart->toArray());
                    break;
                case 'tools':
                    $tool = Tool::create($data);
                    Log::info('Tool created:', $tool->toArray());
                    break;
                default:
                    throw new \Exception('Invalid entry type.');
            }

            return redirect()->route('data-entries.data-input')->with('success', 'Data entry created successfully.');
        } catch (\Exception $e) {
            Log::error('Error saving data entry: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Failed to save data entry.']);
        }
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'entry_type' => 'required|string',
            'data' => 'required|array',
        ]);

        $entryType = $validatedData['entry_type'];
        $data = $validatedData['data'];

        switch ($entryType) {
            case 'repairs':
                $entry = Repair::findOrFail($id);
                break;
            case 'devices':
                $entry = Device::findOrFail($id);
                break;
            case 'accessories':
                $entry = Accessory::findOrFail($id);
                break;
            case 'spare_parts':
                $entry = SparePart::findOrFail($id);
                break;
            case 'tools':
                $entry = Tool::findOrFail($id);
                break;
            default:
                throw new \Exception('Invalid entry type.');
        }

        $entry->update($data);

        return redirect()->route('data-entries.data-input')->with('success', 'Data entry updated successfully.');
    }

    public function destroy($id)
    {
        $dataEntry = DataEntry::findOrFail($id);
        $dataEntry->delete();

        return redirect()->route('data-entries.data-input')->with('success', 'Data entry deleted successfully.');
    }

    public function getFields($categoryId)
    {
        $fields = CategoryField::where('data_entries_category_id', $categoryId)->get();

        // Convert fields to XML
        $xml = new \SimpleXMLElement('<fields/>');
        foreach ($fields as $field) {
            $fld = $xml->addChild('field');
            $fld->addChild('id', $field->id);
            $fld->addChild('field_name', $field->field_name);
            $fld->addChild('label', $field->label);
            $fld->addChild('field_type', $field->field_type);
        }

        return response($xml->asXML(), Response::HTTP_OK)
            ->header('Content-Type', 'application/xml');
    }
}
