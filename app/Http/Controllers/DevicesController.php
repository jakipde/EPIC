<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;

class DevicesController extends Controller
{
    public function index(Request $request)
    {
        $brandId = $request->query('brand_id');
        $devices = Device::where('brand_id', $brandId)->get(); // Fetch devices by brand ID
        return response()->json($devices); // Return devices as JSON
    }
}
