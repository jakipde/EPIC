<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Repair;

class RepairsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Repair::create([
            'description' => 'Repair for broken window',
            // Add other fields as necessary
        ]);

        Repair::create([
            'description' => 'Repair for faulty wiring',
            // Add other fields as necessary
        ]);

        // Add more records as needed
    }
}
