<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    public function getFields($categoryId)
    {
        $category = Category::findOrFail($categoryId);
        $fields = $category->fields;

        return response()->json($fields);
    }

}
