<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Category;
use App\Models\CategoryField;

class CreateCategories extends Command
{
    // The name and signature of the console command
    protected $signature = 'categories:create';

    // The console command description
    protected $description = 'Create categories and fields for the data entries system along with required tables';

    // Execute the console command
    public function handle()
    {
        // Create categories manually using firstOrCreate to avoid duplicates
        $repairCategory = Category::firstOrCreate(['name' => 'Repairs']);
        $deviceCategory = Category::firstOrCreate(['name' => 'Devices']);
        $accessoryCategory = Category::firstOrCreate(['name' => 'Accessories']);
        $sparePartCategory = Category::firstOrCreate(['name' => 'Spare Parts']);
        $toolCategory = Category::firstOrCreate(['name' => 'Tools']);

        // Add fields to Repairs category
        $repairCategory->fields()->createMany([
            ['field_name' => 'Customer ID', 'label' => 'Customer ID', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'Damage Description', 'label' => 'Damage Description', 'field_type' => 'textarea', 'is_manual' => true],
            ['field_name' => 'Technician ID', 'label' => 'Technician ID', 'field_type' => 'text', 'is_manual' => false],
            ['field_name' => 'Repair Status', 'label' => 'Repair Status', 'field_type' => 'select', 'is_manual' => true],
        ]);

        // Add fields to Devices category
        $deviceCategory->fields()->createMany([
            ['field_name' => 'IMEI/SN', 'label' => 'IMEI/SN', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'Phone Brand', 'label' => 'Phone Brand', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'Device Status', 'label' => 'Device Status', 'field_type' => 'select', 'is_manual' => false],
        ]);

        // Add fields to Accessories category
        $accessoryCategory->fields()->createMany([
            ['field_name' => 'Accessory Name', 'label' => 'Accessory Name', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'Brand', 'label' => 'Brand', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'Stock Status', 'label' => 'Stock Status', 'field_type' => 'select', 'is_manual' => false],
        ]);

        // Add fields to Spare Parts category
        $sparePartCategory->fields()->createMany([
            ['field_name' => 'Spare Part Code', 'label' => 'Spare Part Code', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'Stock Quantity', 'label' => 'Stock Quantity', 'field_type' => 'number', 'is_manual' => true],
            ['field_name' => 'Supplier Name', 'label' => 'Supplier Name', 'field_type' => 'text', 'is_manual' => false],
        ]);

        // Add fields to Tools category
        $toolCategory->fields()->createMany([
            ['field_name' => 'Tool Name', 'label' => 'Tool Name', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'Brand', 'label' => 'Brand', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'Tool Status', 'label' => 'Tool Status', 'field_type' => 'select', 'is_manual' => false],
        ]);

        $this->info('Categories and fields created successfully.');
    }
}
