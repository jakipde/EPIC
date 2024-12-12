<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        // Add payment fields here
    ];

    public function spareParts()
    {
        return $this->hasMany(SparePart::class);
    }
}
