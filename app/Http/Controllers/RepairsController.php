<?php

namespace App\Http\Controllers;

use App\Models\Repairs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RepairsController extends Controller
{
    public function index()
    {
        return inertia('Repairs/Index', [
            'repairs' => Repairs::first(),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        Repairs::updateOrCreate(
            ['name' => $request->name],
            ['name' => $request->name],
        );

        return redirect()->route('repairs.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }
}
