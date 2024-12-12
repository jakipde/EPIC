<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'photo',
    ];

    public function spareParts()
    {
        return $this->hasMany(SparePart::class);
    }

    public function productSubCategories()
    {
        return $this->hasMany(ProductSubCategory::class);
    }
}
