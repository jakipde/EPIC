<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Default\User;

class Repair extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'customer_id',
        'cashier_id',
        'technician_id',
        'phone_brand',
        'phone_model',
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
        'repair_status', // Add repair_status field
        'exit_date',
        'print_type',
        'completeness',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function cashier()
    {
        return $this->belongsTo(User::class, 'cashier_id');
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id');
    }
}
