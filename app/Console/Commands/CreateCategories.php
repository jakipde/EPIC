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
            ['field_name' => 'customer_id', 'label' => 'Customer ID', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'damage_description', 'label' => 'Damage Description', 'field_type' => 'textarea', 'is_manual' => true],
            ['field_name' => 'technician_id', 'label' => 'Technician ID', 'field_type' => 'text', 'is_manual' => false],
            ['field_name' => 'repair_status', 'label' => 'Repair Status', 'field_type' => 'select', 'is_manual' => true],
        ]);

        // Add fields to Devices category
        $deviceCategory->fields()->createMany([
            ['field_name' => 'imei_sn', 'label' => 'IMEI/SN', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'phone_brand', 'label' => 'Phone Brand', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'device_status', 'label' => 'Device Status', 'field_type' => 'select', 'is_manual' => false],
        ]);

        // Add fields to Accessories category
        $accessoryCategory->fields()->createMany([
            ['field_name' => 'accessory_name', 'label' => 'Accessory Name', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'brand', 'label' => 'Brand', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'stock_status', 'label' => 'Stock Status', 'field_type' => 'select', 'is_manual' => false],
        ]);

        // Add fields to Spare Parts category
        $sparePartCategory->fields()->createMany([
            ['field_name' => 'spare_part_code', 'label' => 'Spare Part Code', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'stock_quantity', 'label' => 'Stock Quantity', 'field_type' => 'number', 'is_manual' => true],
            ['field_name' => 'supplier_name', 'label' => 'Supplier Name', 'field_type' => 'text', 'is_manual' => false],
        ]);

        // Add fields to Tools category
        $toolCategory->fields()->createMany([
            ['field_name' => 'tool_name', 'label' => 'Tool Name', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'brand', 'label' => 'Brand', 'field_type' => 'text', 'is_manual' => true],
            ['field_name' => 'tool_status', 'label' => 'Tool Status', 'field_type' => 'select', 'is_manual' => false],
        ]);

        $this->info('Categories and fields created successfully.');
    }
}
