<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
public function register(): void
{
    if ($this->app->environment('local')) {
    }
}

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (env('LOG_SQL_ENABLE', false)) {
            DB::listen(function ($query) {
                Log::info(
                    $query->sql,
                    [
                        'bindings' => $query->bindings,
                        'time' => $query->time,
                        'connectionName' => $query->connectionName,
                    ]
                );
            });
        }
    }
}
