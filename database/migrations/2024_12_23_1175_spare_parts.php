<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('spare_parts', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->foreignId('supplier_id')->constrained()->onDelete('cascade');  // Foreign key to suppliers table
            $table->string('code')->unique();  // Unique part code (can be used for easy reference)
            $table->string('name');  // Name of the spare part
            $table->string('barcode_name')->nullable();  // Barcode name or number (nullable)
            $table->string('grade')->nullable();  // Spare part grade (e.g., OEM, aftermarket, refurbished)
            $table->integer('stock')->default(0);  // Stock quantity available
            $table->integer('minimum_stock')->default(0);  // Minimum stock threshold for reordering
            $table->decimal('modal_price', 10, 2)->default(0);  // Cost price for the part
            $table->decimal('store_price', 10, 2)->default(0);  // Store price (may include markup)
            $table->decimal('special_price', 10, 2)->nullable();  // Special pricing (e.g., discount or promotional price)
            $table->decimal('selling_price', 10, 2)->default(0);  // Selling price to customers
            $table->string('ecommerce_link')->nullable();  // Link to eCommerce listing (nullable)
            $table->foreignId('category_id')->constrained('product_categories')->onDelete('cascade');  // Foreign key to product categories table
            $table->foreignId('sub_category_id')->constrained('product_sub_categories')->onDelete('cascade');  // Foreign key to product sub-categories table
            $table->text('description')->nullable();  // Optional description of the spare part
            $table->string('image')->nullable();  // Link to an image of the part (nullable)
            $table->foreignId('invoice_id')->constrained('invoices')->onDelete('cascade');  // Foreign key to invoices table (if this part is part of a transaction)
            $table->date('date');  // Date of the transaction or part addition
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');  // Foreign key to the customer who bought the part
            $table->foreignId('payment_id')->constrained('payments')->onDelete('cascade');  // Foreign key to payments table (tracks payment for this part)
            $table->foreignId('admin_id')->constrained('admins')->onDelete('cascade');  // Foreign key to employees table (admin or employee handling the part)
            $table->decimal('profit', 10, 2)->default(0);  // Profit made from selling this part
            $table->timestamps();  // created_at and updated_at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('spare_parts');
    }
};
