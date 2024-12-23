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
        Schema::create('spare_parts_inventory', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->foreignId('spare_part_id')->constrained('spare_parts')->onDelete('cascade');  // Foreign key to spare_parts table
            $table->integer('quantity_in_stock')->default(0);  // Quantity available in stock
            $table->decimal('price_per_unit', 10, 2);  // Price per unit of the part
            $table->timestamps();  // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spare_parts_inventory');
    }
};
