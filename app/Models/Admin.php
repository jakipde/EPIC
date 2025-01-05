<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Default\User;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'user_id', // Foreign key to users table
        'status',
    ];

    // Define the relationship with the User model ```php
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
