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
        Schema::create('warranties', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->foreignId('repair_id')->constrained('repairs')->onDelete('cascade'); // Foreign key to repairs
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade'); // Foreign key to customers
            $table->foreignId('invoice_id')->constrained('invoices')->onDelete('cascade'); // Foreign key to invoices
            $table->integer('warranty_duration'); // Warranty duration
            $table->date('date_claimed'); // Date claimed
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
        Schema::dropIfExists('warranties');
    }
};
