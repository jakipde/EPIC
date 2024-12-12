<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cashier extends Model
{
    use HasFactory;

    protected $fillable = [
        'identity_number',
        'name',
        'email',
        'password',
        'phone_number',
        'position',
        'photo',
    ];

    public function spareParts()
    {
        return $this->hasMany(SparePart::class);
    }
}
