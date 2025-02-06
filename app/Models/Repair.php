<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Repair extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
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
        'payment_status',
        'remaining_payment',
        'exit_date',
        'print_type',
        'invoice_number',
        'payment_method',
        'completeness',
        'repair_status',
    ];

    protected $casts = [
        'completeness' => 'array',
    ];
}
