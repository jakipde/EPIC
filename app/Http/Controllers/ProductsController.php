<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller
{
    public function index()
    {
        return inertia('Products/Index', [
            'products' => Products::first(),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        Products::updateOrCreate(
            ['name' => $request->name],
            ['name' => $request->name],
        );

        return redirect()->route('products.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }
}
