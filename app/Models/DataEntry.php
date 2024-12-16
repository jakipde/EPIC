<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataEntry extends Model
{
    use HasFactory;

    protected $fillable = ['entry_type', 'data', 'data_entries_category_id']; // Make sure to include the category ID

    public function category()
    {
        return $this->belongsTo(Category::class, 'data_entries_category_id');
    }
}
