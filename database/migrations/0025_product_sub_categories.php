<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('product_sub_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('product_category_id')->constrained('product_categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_sub_categories');
    }
};
