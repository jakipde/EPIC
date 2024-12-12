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
            $table->string('field_name');
            $table->string('label');
            $table->enum('field_type', ['text', 'textarea', 'number', 'date', 'boolean', 'foreign_id', 'select']);
            $table->string('default')->nullable();
            $table->json('options')->nullable();
            $table->boolean('is_manual')->default(true); // Field for manual input
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('data_entries_category_field');
    }
};
