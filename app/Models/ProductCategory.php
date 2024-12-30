<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'photo',
        'supplier_id',
    ];

    public function subCategories()
    {
        return $this->hasMany(ProductSubCategory::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
