<?php

namespace App\Http\Controllers;

use App\Models\Brand;

class BrandsController extends Controller
{
    public function index()
    {
        return response()->json(Brand::all()); // Fetch all brands
    }
}