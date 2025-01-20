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
            $table->id();  // Auto-incrementing primary key
            $table->string('invoice_number')->unique();  // Unique invoice number
            $table->date('date');  // Date the invoice was created
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');  // Foreign key to customers
//            $table->foreignId('admin_id')->constrained('admins')->onDelete('cascade');  // Foreign key to admins (who created the invoice)
            $table->string('description');  // Invoice description (e.g., "Repair service for iPhone screen replacement")
            $table->decimal('amount', 10, 2);  // Total invoice amount
            $table->enum('status', ['pending', 'paid', 'partially_paid', 'cancelled'])->default('pending');  // Status of the invoice
            $table->decimal('discount', 10, 2)->default(0);  // Discount applied (if any)
            $table->decimal('tax', 10, 2)->default(0);  // Tax applied (if any)
            $table->decimal('total_amount', 10, 2);  // Total amount after discount and tax
            $table->timestamps();  // created_at and updated_at
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
