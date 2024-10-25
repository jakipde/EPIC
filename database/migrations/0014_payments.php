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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->date('date'); // Payment date
            $table->foreignId('repair_id')->constrained('repairs')->onDelete('cascade'); // Foreign key to repairs table
            $table->foreignId('invoice_id')->constrained('invoices')->onDelete('cascade'); // Foreign key to invoices
            $table->decimal('sub_total', 10, 2); // Sub total
            $table->decimal('voucher', 10, 2)->nullable(); // Voucher
            $table->decimal('total', 10, 2); // TOTAL
            $table->decimal('down_payment', 10, 2)->nullable(); // Uang Muka
            $table->enum('payment_status', ['pending', 'paid', 'partially_paid']); // Payment status
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
};
