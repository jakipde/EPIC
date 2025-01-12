<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PhoneList extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Create the brands table
        Schema::create('brands', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID
            $table->string('name'); // Brand name
            $table->timestamps(); // Created at and updated at timestamps
        });

        // Create the devices table
        Schema::create('devices', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID for devices
            $table->foreignId('brand_id')->constrained('brands'); // Foreign key referencing brands
            $table->integer('device_id'); // Device ID
            $table->string('device_name'); // Device name
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Drop the devices table first due to foreign key constraint
        Schema::dropIfExists('devices');
        // Then drop the brands table
        Schema::dropIfExists('brands');
    }
}