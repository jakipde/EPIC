<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'brand_id']; // Define fillable fields

    public function brand()
    {
        return $this->belongsTo(Brand::class); // Define relationship with Brand
    }
}
