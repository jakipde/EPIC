<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    // Define the table associated with the model (optional)
    protected $table = 'brands';

    // Define the fillable attributes (optional)
    protected $fillable = ['name'];
}