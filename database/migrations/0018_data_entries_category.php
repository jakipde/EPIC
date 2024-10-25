<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('data_entries_category', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps(); // Ensure this is included
        });
    }

    public function down()
    {
        Schema::dropIfExists('data_entries_category');
    }
};
