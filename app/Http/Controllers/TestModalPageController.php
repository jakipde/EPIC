<?php

namespace App\Http\Controllers;

use App\Models\TestModalPage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class TestModalPageController extends Controller
{
    public function index(Request $request): Response
    {
        $query = TestModalPage::query();

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('TestModalPage/Index', [
            'data' => $query->paginate(10),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        TestModalPage::create([
            'name' => $request->name
        ]);

        return redirect()->route('test-modal-pages.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed created']);
    }

    public function update(Request $request, TestModalPage $testModalPage): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $testModalPage->fill([
            'name' => $request->name,
        ]);

        $testModalPage->save();

        return redirect()->route('test-modal-pages.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(TestModalPage $testModalPage): RedirectResponse
    {
        $testModalPage->delete();

        return redirect()->route('test-modal-pages.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }
}
