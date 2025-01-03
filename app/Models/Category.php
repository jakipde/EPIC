<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'data_entries_category'; // Specify the table name if not following conventions

    // Polymorphic relationship to category-specific data (e.g., repairs, devices)
    public function categoryData()
    {
        return $this->morphTo();
    }

    public function fields()
    {
        return $this->hasMany(CategoryField::class, 'data_entries_category_id'); // Ensure the foreign key is correct
    }
}
