<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('photo')->nullable();
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('cascade'); // Foreign key to suppliers
            $table->timestamps();
            $table->softDeletes(); // Add this line for soft deletes
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_categories');
    }
};
