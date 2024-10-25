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
        'cashier',
        'phone_brand',
        'imei_sn_1',
        'imei_sn_2',
        'damage_description',
        'phone_accessories',
        'technician_id',
        'under_warranty',
        'warranty_duration',
        'exit_date',
        'print_type',
        'invoice_number'
    ];
}
