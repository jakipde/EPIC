<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class DeviceController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Device::query();

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%");
        }

        $query->orderBy('created_at', 'desc');

        return inertia('Device/Index', [
            'data' => $query->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return inertia('Device/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Device::create([
            'name' => $request->name
        ]);

        return redirect()->route('devices.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed created']);
    }

    public function edit(Device $device): Response
    {
        return inertia('Device/Form', [
            'device' => $device,
        ]);
    }

    public function update(Request $request, Device $device): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $device->fill([
            'name' => $request->name,
        ]);

        $device->save();

        return redirect()->route('devices.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(Device $device): RedirectResponse
    {
        $device->delete();

        return redirect()->route('devices.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }
}
