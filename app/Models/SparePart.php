<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SparePart extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id',
        'code',
        'name',
        'barcode_name',
        'grade',
        'stock',
        'minimum_stock',
        'modal_price',
        'store_price',
        'special_price',
        'selling_price',
        'ecommerce_link',
        'category_id',
        'sub_category_id',
        'description',
        'image',
        'invoice_id',
        'date',
        'customer_id',
        'payment_id',
        'admin_id',
        'profit',
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

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }

    public function admin()
    {
        return $this->belongsTo(Cashier::class);
    }
}
