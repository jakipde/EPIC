<?php

namespace App\Http\Controllers;

use App\Models\Accessories;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class AccessoriesController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Accessories::query();

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('Accessories/Index', [
            'data' => $query->paginate(10),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Accessories::create([
            'name' => $request->name
        ]);

        return redirect()->route('accessories.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed created']);
    }

    public function update(Request $request, Accessories $accessories): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $accessories->fill([
            'name' => $request->name,
        ]);

        $accessories->save();

        return redirect()->route('accessories.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(Accessories $accessories): RedirectResponse
    {
        $accessories->delete();

        return redirect()->route('accessories.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }
}
