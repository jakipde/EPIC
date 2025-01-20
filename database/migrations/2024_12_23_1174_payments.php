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
            $table->date('date');  // Payment date
            $table->foreignId('repair_id')  // Foreign key to the repairs table
                ->constrained('repairs')
                ->onDelete('cascade');
            $table->foreignId('invoice_id')  // Foreign key to the invoices table
                ->constrained('invoices')
                ->onDelete('cascade');
            $table->decimal('sub_total', 10, 2);  // Sub total for the payment
            $table->decimal('voucher', 10, 2)->nullable();  // Optional voucher amount (discount)
            $table->decimal('total', 10, 2);  // Total amount to be paid
            $table->decimal('down_payment', 10, 2)->nullable();  // Down payment amount
            $table->enum('payment_status', ['pending', 'paid', 'partially_paid']);  // Status of the payment
            $table->enum('payment_method', ['cash', 'card', 'bank_transfer', 'other'])->nullable();  // Method of payment (optional)
//            $table->foreignId('cashier_id')  // Foreign key to the employees table (cashier/admin who processed the payment)
//                ->constrained('admins')
//                ->onDelete('cascade');
            $table->text('notes')->nullable();  // Optional notes for the payment (e.g., payment remarks)
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
        Schema::dropIfExists('payments');
    }
};
