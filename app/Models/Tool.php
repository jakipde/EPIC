<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    protected $fillable = [
        'name',         // Name of the tool
        'brand',        // Brand of the tool
        'type',         // Type of tool
        'model',        // Model of the tool
        'price',        // Price of the tool
        'description',         // Description of the tool
    ];
}
