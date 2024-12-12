<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    public function getFields($id)
    {
        Log::info('getFields method called with ID: ' . $id);

        // Find the category by ID with eager loading of fields
        $category = Category::with('fields')->find($id);

        // Check if the category exists
        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        // Fetch fields related to the category
        $fields = $category->fields;

        // Log the fetched fields for debugging
        Log::info('Fetched fields for category ' . $id, ['fields' => $fields]);

        // Check if fields are empty
        if ($fields->isEmpty()) {
            Log::info('No fields found for category ' . $id);
        }

        // Return the fields as JSON, ensuring it's an array
        return response()->json($fields->toArray() ?: []);
    }
}
