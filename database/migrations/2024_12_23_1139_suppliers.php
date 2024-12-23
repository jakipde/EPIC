<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->string('name');  // Name of the supplier
            $table->string('contact_name');  // Name of the contact person
            $table->string('phone')->nullable();  // Supplier's phone number
            $table->string('email')->nullable();  // Supplier's email address
            $table->string('address')->nullable();  // Supplier's address
            $table->text('notes')->nullable();  // Additional notes about the supplier
            $table->timestamps();  // created_at and updated_at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('suppliers');
    }
};
