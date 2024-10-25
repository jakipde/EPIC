<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('data_entries_category_field', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('data_entries_category_id');
            $table->foreign('data_entries_category_id')->references('id')->on('data_entries_category')->onDelete('cascade');
            $table->string('field_name'); // The key name for the field
            $table->string('label'); // The user-friendly label for the field
            $table->enum('field_type', ['text', 'textarea', 'number', 'date', 'boolean', 'foreign_id', 'select']); // Added 'select'
            $table->string('default')->nullable(); // Add the default column
            $table->text('options')->nullable(); // Add this line for the options column
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('data_entries_category_field'); // Drop the entire table
    }
};
