<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryField extends Model
{
    protected $table = 'data_entries_category_field'; // Specify the table name if not following conventions

    public function category()
    {
        return $this->belongsTo(Category::class, 'data_entries_category_id');
    }
}
