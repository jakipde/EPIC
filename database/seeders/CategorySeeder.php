<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category; // Ensure the correct model is imported

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'Customers'],
            ['name' => 'Technicians'],
            ['name' => 'Repairs'],
            ['name' => 'Devices'],
            ['name' => 'Accessories'],
            ['name' => 'Spare Parts'],
            ['name' => 'Tools'],
        ];

        foreach ($categories as $category) {
            Category::create($category); // Use the correct model
        }
    }
}
