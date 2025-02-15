<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SparePart extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id',
        'sku',
        'product_name',
        'name_in_barcode',
        'grade',
        'stock',
        'minimum_stock',
        'capital_price',
        'stock_price',
        'selling_price',
        'ecommerce_link',
        'category_id',
        'sub_category_id',
        'description',
        'image',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(ProductSubCategory::class);
    }
}
