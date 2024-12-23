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
            $table->string('email')->nullable();  // Customer's email address (nullable)
            $table->text('address')->nullable();  // Customer's physical address (nullable)
            $table->enum('customer_type', ['regular', 'vip', 'prospect'])->default('regular');  // Type of customer (default is 'regular')
            $table->decimal('loyalty_points', 10, 2)->default(0);  // Loyalty points accumulated by the customer
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
        Schema::dropIfExists('customers'); // Corrected table name
    }
};
