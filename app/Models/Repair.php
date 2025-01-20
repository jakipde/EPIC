<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repair extends Model
{
    use HasFactory;

    // Specify the table if it doesn't follow Laravel's naming convention
    // protected $table = 'repairs'; // Uncomment if your table name is not 'repairs'

    // Specify the attributes that are mass assignable
    protected $fillable = [
        'entry_date',        // Date when the repair was entered
        'customer_id',       // Foreign key referencing the customer
        'cashier_id',        // Foreign key referencing the cashier
        'technician_id',     // Foreign key referencing the technician
        'phone_brand',       // Brand of the phone being repaired
        'phone_model',       // Model of the phone being repaired
        'imei_sn_1',        // First IMEI or serial number
        'imei_sn_2',        // Second IMEI or serial number (if applicable)
        'damage_description', // Description of the damage
        'under_warranty',    // Boolean indicating if the repair is under warranty
        'warranty_duration',  // Duration of the warranty (in days, weeks, etc.)
        'warranty_unit',     // Unit for the warranty duration (e.g., days, weeks, months)
        'notes',             // Additional notes about the repair
        'repair_type',       // Type of repair (e.g., screen replacement)
        'service_type',      // Type of service (e.g., hardware, software)
        'total_price',       // Total price for the repair
        'completeness',      // Status of the repair (e.g., complete, incomplete)
        'exit_date',         // Date when the repair was completed or exited
        'print_type',        // Type of print (if applicable)
        'invoice_number'     // Invoice number for tracking
    ];

    // Optionally, you can define relationships here
    // For example:
    // public function customer()
    // {
    //     return $this->belongsTo(Customer::class);
    // }

    // public function cashier()
    // {
    //     return $this->belongsTo(Cashier::class);
    // }

    // public function technician()
    // {
    //     return $this->belongsTo(Technician::class);
    // }
}
