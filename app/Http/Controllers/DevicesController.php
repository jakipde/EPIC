<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;

class DevicesController extends Controller
{
    public function index(Request $request)
    {
        $brandId = $request->query('brand_id'); // Get brand_id from query parameters

        // Fetch devices that belong to the specified brand
        $devices = Device::where('brand_id', $brandId)->get(['id as device_id', 'name as device_name', 'img', 'description']);

        return response()->json($devices); // Return devices as JSON
    }
}