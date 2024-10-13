<?php

namespace App\Http\Controllers;

use App\Models\DataEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class DataEntryController extends Controller
{
    public function index(Request $request): Response
    {
        $query = DataEntry::query();

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('DataEntry/Index', [
            'data' => $query->paginate(10),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        DataEntry::create([
            'name' => $request->name
        ]);

        return redirect()->route('data-entries.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed created']);
    }

    public function update(Request $request, DataEntry $dataEntry): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $dataEntry->fill([
            'name' => $request->name,
        ]);

        $dataEntry->save();

        return redirect()->route('data-entries.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(DataEntry $dataEntry): RedirectResponse
    {
        $dataEntry->delete();

        return redirect()->route('data-entries.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }
}
