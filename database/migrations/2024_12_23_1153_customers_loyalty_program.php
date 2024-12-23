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
        Schema::create('customer_loyalty_program', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');  // Foreign key to the customer
            $table->integer('points_earned')->default(0);  // Total points earned by the customer
            $table->decimal('discount_earned', 10, 2)->default(0);  // Total discount earned (could be used for future repairs or purchases)
            $table->text('loyalty_offers')->nullable();  // A text field to store details of loyalty offers, or use a JSON field for specific offers
            $table->timestamps();  // created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_loyalty_program');
    }
};
