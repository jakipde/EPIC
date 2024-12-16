<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DataEntry extends Model
{
    public function category()
    {
        return $this->belongsTo(Category::class, 'data_entries_category_id');
    }
}
