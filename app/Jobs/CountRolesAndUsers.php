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

    public $role_count;
    public $user_count;

    public function handle()
    {
        $this->role_count = Role::count();
        $this->user_count = User::count();
    }
}
