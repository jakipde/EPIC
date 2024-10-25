<?php

namespace App\Http\Controllers;

use App\Models\Technician;
use Illuminate\Http\Request;

class TechniciansController extends Controller
{
    public function index()
    {
        // Fetch all technicians
        $technicians = Technician::all();
        return response()->json($technicians);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'speciality' => 'required|string|max:255',
        ]);

        $technician = Technician::create($request->all());

        return response()->json([
            'message' => 'Technician created successfully.',
            'technician' => $technician,
        ], 201); // 201 Created
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'speciality' => 'required|string|max:255',
        ]);

        $technician = Technician::findOrFail($id);
        $technician->update($request->all());

        return response()->json([
            'message' => 'Technician updated successfully.',
            'technician' => $technician,
        ]);
    }
}
