<?php

namespace App\Http\Controllers;

use App\Models\Tools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ToolsController extends Controller
{
    public function index()
    {
        return inertia('Tools/Index', [
            'tools' => Tools::first(),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        Tools::updateOrCreate(
            ['name' => $request->name],
            ['name' => $request->name],
        );

        return redirect()->route('tools.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }
}
