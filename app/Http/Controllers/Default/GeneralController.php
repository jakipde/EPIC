<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Jobs\CountRolesAndUsers;
use Illuminate\Support\Facades\Cache;

class GeneralController extends Controller
{
    public function index()
    {
        // Dispatch the job to count roles and users
        CountRolesAndUsers::dispatch();

        // Optionally, you can return a loading state or previous counts if cached
        $role_count = Cache::get('role_count', 0);
        $user_count = Cache::get('user_count', 0);

        return inertia('Dashboard', [
            'role_count' => $role_count,
            'user_count' => $user_count,
        ]);
    }

    public function maintance()
    {
        return inertia('Maintance');
    }
}
