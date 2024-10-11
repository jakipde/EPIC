<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Jobs\CountRolesAndUsers;

class GeneralController extends Controller
{
    public function index()
    {
        // Dispatch the job to count roles and users
        CountRolesAndUsers::dispatch();

        // Optionally, retrieve the counts from cache if available
        $role_count = cache('role_count', 0);
        $user_count = cache('user_count', 0);

        return inertia('Dashboard', [
            'role_count' => $role_count,
            'user_count' => $user_count,
        ]);
    }

    public function maintance()
    {
        return inertia('Maintance');
    }

    public function count()
    {
        [$role_count, $user_count] = Concurrency::run([
            fn() => Role::count(),
            fn() => User::count(),
        ]);

        return response()->json([
            'role_count' => $role_count,
            'user_count' => $user_count,
        ]);
    }
}
