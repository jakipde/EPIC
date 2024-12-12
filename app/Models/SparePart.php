<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SparePart extends Model
{
    protected $fillable = [
        'name',         // Name of the spare part
        'brand',        // Brand of the spare part
        'type',         // Type of spare part
        'model',        // Model of the spare part
        'price',        // Price of the spare part
        'description',         // Description of the tool
    ];
}
