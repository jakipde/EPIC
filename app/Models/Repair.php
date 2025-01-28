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
        'cashier_id',
        'technician_id',
        'phone_brand',
        'phone_model',
        'imei_sn_1',
        'imei_sn_2',
        'damage_description',
        'under_warranty',
        'warranty_duration',
        'warranty_unit',
        'notes',
        'repair_type',
        'service_type',
        'total_price',
        'down_payment',
        'sub_total',
        'payment_status', // Add payment_status to fillable
        'remaining_payment', // Add remaining_payment to fillable
        'exit_date',
        'print_type',
        'invoice_number',
        'payment_method',
        'completeness',
    ];

    // Optionally, you can define relationships here
}
