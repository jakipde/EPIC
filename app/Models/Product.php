<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // Specify the fillable attributes
    protected $fillable = [
        'category_id', // Foreign key to the categories table
        'type',        // Type of the product (e.g., Devices, Accessories)
        'price',       // Price of the product
        'description', // Description of the product
        'created_at',  // Timestamp for when the product was created
        'updated_at',  // Timestamp for when the product was last updated
    ];

    // Define the relationship with the Category model
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
