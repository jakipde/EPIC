<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Create 'devices_for_sale' table for selling inventory devices
        Schema::create('devices_for_sale', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('brand'); // Brand of the device
            $table->string('type'); // Type of device (e.g., phone, tablet)
            $table->string('model'); // Model of the device
            $table->string('sn')->nullable(); // Serial number (optional)
            $table->string('imei_1')->nullable(); // IMEI 1 (optional)
            $table->string('imei_2')->nullable(); // IMEI 2 (optional)
            $table->decimal('price', 10, 2); // Price of the device
            $table->integer('stock')->default(0); // Available stock
            $table->timestamps(); // created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('devices_for_sale');
    }
};
