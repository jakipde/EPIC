<?php

namespace App\Http\Controllers;

use App\Models\SparePart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SparePartController extends Controller
{
    public function index()
    {
        return inertia('SparePart/Index', [
            'sparePart' => SparePart::first(),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        SparePart::updateOrCreate(
            ['name' => $request->name],
            ['name' => $request->name],
        );

        return redirect()->route('spare-parts.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }
}
