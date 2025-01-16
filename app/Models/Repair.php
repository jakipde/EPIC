<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repair extends Model
{
    use HasFactory;

    protected $fillable = [
        'entry_date',
        'customer_id',
        'cashier_id', // Corrected to match the migration
        'technician_id',
        'phone_brand',
        'phone_model', // Added to align with the migration
        'imei_sn_1',
        'imei_sn_2',
        'damage_description',
        'under_warranty',
        'warranty_duration',
        'warranty_unit', // Added if needed for warranty duration
        'notes', // Added if needed for additional notes
        'repair_type',
        'service_type', // Added to align with the migration
        'total_price', // Added to align with the migration
        'completeness', // Added to align with the migration
        'exit_date', // Included if needed for tracking completion
        'print_type', // Included if needed for print types
        'invoice_number' // Included for invoice tracking if needed
    ];

}
