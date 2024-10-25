<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('brand'); // Brand of the device
            $table->string('type'); // Type of device
            $table->string('model'); // Model of the device
            $table->string('sn')->nullable(); // Serial number
            $table->string('imei_1')->nullable(); // IMEI 1
            $table->string('imei_2')->nullable(); // IMEI 2
            $table->decimal('price', 10, 2); // Price of the device
            $table->timestamps(); // created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('devices');
    }
};
