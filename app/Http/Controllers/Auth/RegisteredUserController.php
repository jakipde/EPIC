<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Default\Role;
use App\Models\Default\User;
use App\Services\UserJwtService;
use App\Models\Admin; // Import Admin model
use App\Models\Technician; // Import Technician model
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:admin,technician', // Validate role
            'specialization' => 'nullable|string|max:255', // Assuming specialization is optional for technicians
        ]);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => Role::where('name', $request->role)->first()->id, // Assign role
        ]);

        // Create Admin or Technician based on role
        if ($request->role === 'admin') {
            Admin::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'email' => $request->email,
                'status' => 'active', // Default status
            ]);
        } elseif ($request->role === 'technician') {
            Technician::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'email' => $request->email,
                'specialization' => $request->specialization, // Assuming specialization is part of the request
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        UserJwtService::generateJwtToken();

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
