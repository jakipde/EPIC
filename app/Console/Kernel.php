<?php

namespace App\Console;

use Illuminate\Console\Command;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Console\Commands\CreateCategories;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        // Register your custom command here
        CreateCategories::class,
    ];

    protected function schedule(Schedule $schedule)
    {
        // Define your scheduled commands here
    }
}
