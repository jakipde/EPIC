<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accessory extends Model
{
    protected $fillable = [
        'name',         // Name of the accessory
        'brand',        // Brand of the accessory
        'type',         // Type of accessory
        'model',        // Model of the accessory
        'price',        // Price of the accessory
        'description',         // Description of the tool
    ];
}
