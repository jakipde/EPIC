<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductSubCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'product_category_id',
    ];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }
}
