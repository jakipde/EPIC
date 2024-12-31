<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->string('name');  // Customer's full name
            $table->string('phone')->nullable();  // Customer's phone number (nullable)
            $table->enum('customer_type', ['User ', 'Store'])->default('User ');  // Type of customer (default is 'User ')
            $table->decimal('loyalty_points', 10, 2)->nullable()->default(0);  // Loyalty points accumulated by the customer (optional)
            $table->timestamps();  // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers'); // Drop the customers table
    }
};
