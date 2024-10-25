<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('spare_parts', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name'); // Name of the spare part
            $table->string('brand'); // Brand of the spare part
            $table->string('type'); // Type of spare part
            $table->string('model'); // Model of the spare part
            $table->decimal('price', 10, 2); // Price of the spare part
            $table->text('description')->nullable(); // Description of the spare part
            $table->timestamps(); // created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('spare_parts');
    }
};
