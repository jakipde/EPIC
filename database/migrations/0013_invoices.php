<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('invoice_number')->unique(); // Ensure this is unique and not nullable
            $table->date('date'); // Invoice date
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade'); // Foreign key to customers
            $table->string('description'); // Invoice description
            $table->decimal('amount', 10, 2); // Invoice amount
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
};
