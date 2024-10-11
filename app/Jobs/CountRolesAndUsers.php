<?php

namespace App\Jobs;

use App\Models\Default\Role;
use App\Models\Default\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CountRolesAndUsers implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $role_count = Role::count();
        $user_count = User::count();

        // Store the counts in a cache or database for later retrieval
        cache(['role_count' => $role_count, 'user_count' => $user_count]);
    }
}
