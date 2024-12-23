<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();  // Automatically BIGINT UNSIGNED
            $table->string('name');  // Name of the service
            $table->text('description')->nullable();  // Description of the service
            $table->decimal('price', 10, 2)->nullable();  // Price of the service
            $table->boolean('is_active')->default(true);  // Status of the service (active/inactive)
            $table->timestamps();  // Created at and updated at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('services');
    }
};
