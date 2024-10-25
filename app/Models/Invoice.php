<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    // Specify the table if it's not the plural form of the model name
    protected $table = 'invoices';

    // Define the fillable attributes
    protected $fillable = [
        'date',
        'customer_id',
        'description',
        'amount',
        'invoice_number', // Add this line
    ];

    // Define the relationship with the Customer model
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function repairs()
    {
        return $this->hasMany(Repair::class);
    }

    public function devices()
    {
        return $this->hasMany(Device::class);
    }

    public function accessories()
    {
        return $this->hasMany(Accessory::class);
    }

    public function spareparts()
    {
        return $this->hasMany(SparePart::class);
    }

    public function tools()
    {
        return $this->hasMany(Tool::class);
    }
}
