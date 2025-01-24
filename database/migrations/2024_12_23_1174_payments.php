<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Payments extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->unsignedBigInteger('repair_id'); // Explicitly define the type
            $table->unsignedBigInteger('invoice_id')->nullable();
            $table->decimal('sub_total', 10, 2);
            $table->decimal('voucher', 10, 2)->nullable();
            $table->decimal('total', 10, 2);
            $table->decimal('down_payment', 10, 2)->nullable();
            $table->enum('payment_status', ['pending', 'paid', 'partially_paid'])
                ->default('pending');
            $table->enum('payment_method', ['cash', 'card', 'bank_transfer', 'other'])
                ->nullable();
            $table->ulid('cashier_id')->nullable(); // Change to ulid
            $table->text('notes')->nullable();
            $table->timestamps();

            // Foreign key definitions
            $table->foreign('repair_id')
                ->references('id')->on('repairs')
                ->onDelete('cascade');

            $table->foreign('invoice_id')
                ->references('id')->on('invoices')
                ->onDelete('cascade');

            // Update foreign key for cashier_id
            $table->foreign('cashier_id')
                ->references('id')->on('users')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
