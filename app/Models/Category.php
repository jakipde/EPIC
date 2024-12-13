<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'data_entries_category'; // Specify the table name if not following conventions

    public function dataEntries()
    {
        return $this->hasMany(DataEntry::class, 'data_entries_category_id');
    }

    public function fields()
    {
        return $this->hasMany(CategoryField::class, 'data_entries_category_id'); // Ensure the foreign key is correct
    }

}
