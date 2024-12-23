<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('warranties', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->foreignId('repair_id')  // Foreign key to repairs table
                ->constrained('repairs')
                ->onDelete('cascade');
            $table->foreignId('customer_id')  // Foreign key to customers table
                ->constrained('customers')
                ->onDelete('cascade');
            $table->foreignId('invoice_id')  // Foreign key to invoices table
                ->constrained('invoices')
                ->onDelete('cascade');
            $table->integer('warranty_duration');  // Duration of warranty (in months or years)
            $table->date('date_claimed');  // Date when the warranty was claimed
            $table->enum('warranty_status', ['active', 'expired', 'claimed'])->default('active');  // Warranty status (active, expired, claimed)
            $table->timestamps();  // created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('warranties');
    }
};
