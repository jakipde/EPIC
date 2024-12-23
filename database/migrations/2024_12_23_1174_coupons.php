<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->string('coupon_code')->unique();  // Unique coupon code for the promotion
            $table->decimal('discount_amount', 10, 2);  // Discount amount (could be a fixed amount or percentage)
            $table->foreignId('repair_id')->constrained('repairs')->onDelete('cascade');  // Foreign key to repairs table
            $table->timestamps();  // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
