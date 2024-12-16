<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryField extends Model
{
    use HasFactory;

    protected $table = 'data_entries_category_field';

    protected $fillable = [
        'data_entries_category_id', 'field_name', 'label', 'field_type', 'default', 'options', 'is_manual'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'data_entries_category_id'); // Ensure the foreign key is correct
    }
}
