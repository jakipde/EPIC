<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tools', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name'); // Name of the tool
            $table->string('brand'); // Brand of the tool
            $table->string('type'); // Type of tool
            $table->string('model'); // Model of the tool
            $table->decimal('price', 10, 2); // Price of the tool
            $table->text('description')->nullable(); // Description of the tool
            $table->timestamps(); // created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('tools');
    }
};
