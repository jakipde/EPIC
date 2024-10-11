<?php

namespace App\Http\Controllers;

use App\Models\Repair; // Ensure this is correct
use Illuminate\Http\Request;

class RepairsController extends Controller
{
    public function dashboard($repairId = null) // Make repairId optional
    {
        if ($repairId) {
            \Log::info('Repair ID: ' . $repairId); // Log the repair ID
            $repair = Repair::findOrFail($repairId);
            return inertia('Repairs/Dashboard/Dashboard', ['repair' => $repair]); // Use the specific repair dashboard
        } else {
            // Redirect to the default dashboard when no repair ID is provided
            return inertia('Repairs/Dashboard/Dashboard'); // Use your default dashboard
        }
    }

    public function dataOverview($repairId = null) // Make repairId optional
    {
        if ($repairId) {
            $repair = Repair::findOrFail($repairId); // Fetch the repair object
            return inertia('Repairs/DataOverview/DataOverview', ['repair' => $repair]); // Use the specific data overview
        } else {
            // Redirect to the default data overview when no repair ID is provided
            return inertia('Repairs/DataOverview/DataOverview'); // Use your default data overview
        }
    }
}
