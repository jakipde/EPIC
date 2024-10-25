<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CategoryField; // Ensure the correct model is imported
use App\Models\Category; // Import the category model for lookups

class CategoryFieldSeeder extends Seeder
{
    public function run()
    {
        // Get the categories to ensure we're using the correct IDs
        $customersCategory = Category::where('name', 'Customers')->first();
        $techniciansCategory = Category::where('name', 'Technicians')->first();
        $repairsCategory = Category::where('name', 'Repairs')->first();
        $devicesCategory = Category::where('name', 'Devices')->first();
        $accessoriesCategory = Category::where('name', 'Accessories')->first();
        $sparePartsCategory = Category::where('name', 'Spare Parts')->first();
        $toolsCategory = Category::where('name', 'Tools')->first();

        $fields = [
            // Fields for Customers
            ['data_entries_category_id' => $customersCategory->id, 'field_name' => 'name', 'label' => 'Customer Name', 'field_type' => 'text'],
            ['data_entries_category_id' => $customersCategory->id, 'field_name' => 'phone', 'label' => 'Phone Number', 'field_type' => 'text'],

            ['data_entries_category_id' => $repairsCategory->id, 'field_name' => 'entry_date', 'label' => 'Entry Date', 'field_type' => 'date', 'default' => now()],
            ['data_entries_category_id' => $repairsCategory->id, 'field_name' => 'customer_id', 'label' => 'Customer', 'field_type' => 'foreign_id'],
            ['data_entries_category_id' => $repairsCategory->id, 'field_name' => 'cashier', 'label' => 'Cashier', 'field_type' => 'foreign_id'],
            ['data_entries_category_id' => $repairsCategory->id, 'field_name' => 'phone_brand', 'label' => 'Phone Brand', 'field_type' => 'text'],
            ['data_entries_category_id' => $repairsCategory->id, 'field_name' => 'imei_sn_1', 'label' => 'IMEI/SN 1', 'field_type' => 'text'],
            ['data_entries_category_id' => $repairsCategory->id, 'field_name' => 'imei_sn_2', 'label' => 'IMEI/SN 2', 'field_type' => 'text'],
            ['data_entries_category_id' => $repairsCategory->id, 'field_name' => 'damage_description', 'label' => 'Damage Description', 'field_type' => 'textarea'],
            ['data_entries_category_id' => $repairsCategory->id, 'field_name' => 'phone_accessories', 'label' => 'Phone Accessories', 'field_type' => 'textarea'],
            ['data_entries_category_id' => $repairsCategory->id, 'field_name' => 'technician_id', 'label' => 'Technician', 'field_type' => 'foreign_id'],
            [
                'data_entries_category_id' => $repairsCategory->id,
                'field_name' => 'under_warranty',
                'label' => 'Under Warranty',
                'field_type' => 'select',
                'options' => json_encode(['Yes', 'No']), // Store options as JSON
            ],
            ['data_entries_category_id' => $repairsCategory->id, 'field_name' => 'warranty_duration', 'label' => 'Warranty Duration (months)', 'field_type' => 'number'],
            ['data_entries_category_id' => $repairsCategory->id, 'field_name' => 'exit_date', 'label' => 'Exit Date', 'field_type' => 'date'],
            [
                'data_entries_category_id' => $repairsCategory->id,
                'field_name' => 'print_type',
                'label' => 'Print Type',
                'field_type' => 'select',
                'options' => json_encode(['JET', 'Blank', 'Laser', 'Inkjet']), // Updated options for print type
            ],

            // Fields for Devices
            ['data_entries_category_id' => $devicesCategory->id, 'field_name' => 'brand', 'label' => 'Device Brand', 'field_type' => 'text'],
            ['data_entries_category_id' => $devicesCategory->id, 'field_name' => 'type', 'label' => 'Device Type', 'field_type' => 'text'],
            ['data_entries_category_id' => $devicesCategory->id, 'field_name' => 'model', 'label' => 'Device Model ', 'field_type' => 'text'],
            ['data_entries_category_id' => $devicesCategory->id, 'field_name' => 'sn', 'label' => 'Serial Number', 'field_type' => 'text'],
            ['data_entries_category_id' => $devicesCategory->id, 'field_name' => 'imei_1', 'label' => 'IMEI 1', 'field_type' => 'text'],
            ['data_entries_category_id' => $devicesCategory->id, 'field_name' => 'imei_2', 'label' => 'IMEI 2', 'field_type' => 'text'],
            ['data_entries_category_id' => $devicesCategory->id, 'field_name' => 'price', 'label' => 'Price', 'field_type' => 'number'],
            ['data_entries_category_id' => $devicesCategory->id, 'field_name' => 'description', 'label' => 'Description', 'field_type' => 'textarea'],

            // Fields for Accessories
            ['data_entries_category_id' => $accessoriesCategory->id, 'field_name' => 'name', 'label' => 'Accessory Name', 'field_type' => 'text'],
            ['data_entries_category_id' => $accessoriesCategory->id, 'field_name' => 'brand', 'label' => 'Accessory Brand', 'field_type' => 'text'],
            ['data_entries_category_id' => $accessoriesCategory->id, 'field_name' => 'type', 'label' => 'Accessory Type', 'field_type' => 'text'],
            ['data_entries_category_id' => $accessoriesCategory->id, 'field_name' => 'model', 'label' => 'Accessory Model', 'field_type' => 'text'],
            ['data_entries_category_id' => $accessoriesCategory->id, 'field_name' => 'price', 'label' => 'Price', 'field_type' => 'number'],
            ['data_entries_category_id' => $accessoriesCategory->id, 'field_name' => 'description', 'label' => 'Description', 'field_type' => 'textarea'],

            // Fields for Spare Parts
            ['data_entries_category_id' => $sparePartsCategory->id, 'field_name' => 'name', 'label' => 'Spare Part Name', 'field_type' => 'text'],
            ['data_entries_category_id' => $sparePartsCategory->id, 'field_name' => 'brand', 'label' => 'Spare Part Brand', 'field_type' => 'text'],
            ['data_entries_category_id' => $sparePartsCategory->id, 'field_name' => 'type', 'label' => 'Spare Part Type', 'field_type' => 'text'],
            ['data_entries_category_id' => $sparePartsCategory->id, 'field_name' => 'model', 'label' => 'Spare Part Model', 'field_type' => 'text'],
            ['data_entries_category_id' => $sparePartsCategory->id, 'field_name' => 'price', 'label' => 'Price', 'field_type' => 'number'],
            ['data_entries_category_id' => $sparePartsCategory->id, 'field_name' => 'description', 'label' => 'Description', 'field_type' => 'textarea'],

            // Fields for Tools
            ['data_entries_category_id' => $toolsCategory->id, 'field_name' => 'name', 'label' => 'Tool Name', 'field_type' => 'text'],
            ['data_entries_category_id' => $toolsCategory->id, 'field_name' => 'brand', 'label' => 'Tool Brand', 'field_type' => 'text'],
            ['data_entries_category_id' => $toolsCategory->id, 'field_name' => 'type', 'label' => 'Tool Type', 'field_type' => 'text'],
            ['data_entries_category_id' => $toolsCategory->id, 'field_name' => 'model', 'label' => 'Tool Model', 'field_type' => 'text'],
            ['data_entries_category_id' => $toolsCategory->id, 'field_name' => 'price', 'label' => 'Price', 'field_type' => 'number'],
            ['data_entries_category_id' => $toolsCategory->id, 'field_name' => 'description', 'label' => 'Description', 'field_type' => 'textarea'],

            // Fields for Technicians
            ['data_entries_category_id' => $techniciansCategory->id, 'field_name' => 'name', 'label' => 'Technician Name', 'field_type' => 'text'],
            ['data_entries_category_id' => $techniciansCategory->id, 'field_name' => 'speciality', 'label' => 'Speciality', 'field_type' => 'text'],
        ];

        foreach ($fields as $field) {
            CategoryField::create($field); // Use the correct model
        }
    }
}
