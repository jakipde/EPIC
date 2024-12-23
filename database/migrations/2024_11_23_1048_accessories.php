<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('accessories', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name'); // Name of the accessory
            $table->string('brand'); // Brand of the accessory
            $table->string('type'); // Type of accessory
            $table->string('model'); // Model of the accessory
            $table->decimal('price', 10, 2); // Price of the accessory
            $table->text('description')->nullable(); // Description of the accessory
            $table->timestamps(); // created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('accessories');
    }
};
