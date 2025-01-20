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
            $table->string('code')->unique();  // Unique part code
            $table->string('name');  // Name of the spare part
            $table->string('barcode_name')->nullable();  // Barcode name or number
            $table->string('grade')->nullable();  // Spare part grade (e.g., OEM, aftermarket)
            $table->integer('stock')->default(0);  // Total stock quantity available
            $table->integer('minimum_stock')->default(0);  // Minimum stock threshold for reordering
            $table->integer('stock_used_for_repairs')->default(0);  // Stock used for repairs
            $table->integer('stock_sold')->default(0);  // Stock sold
            $table->decimal('modal_price', 10, 2)->default(0);  // Cost price for the part
            $table->decimal('store_price', 10, 2)->default(0);  // Store price
            $table->decimal('special_price', 10, 2)->nullable();  // Special pricing
            $table->decimal('selling_price', 10, 2)->default(0);  // Selling price to customers
            $table->string('ecommerce_link')->nullable();  // Link to eCommerce listing
            $table->foreignId('category_id')->constrained('product_categories')->onDelete('cascade');  // Foreign key to product categories
            $table->foreignId('sub_category_id')->constrained('product_sub_categories')->onDelete('cascade');  // Foreign key to product sub-categories
            $table->text('description')->nullable();  // Description of the spare part
            $table->string('image')->nullable();  // Link to an image of the part
            $table->foreignId('invoice_id')->nullable()->constrained('invoices')->onDelete('cascade');  // Foreign key to invoices table (nullable)
            $table->date('date')->nullable();  // Date of the transaction or part addition
            $table->foreignId('customer_id')->nullable()->constrained('customers')->onDelete('cascade');  // Foreign key to the customer who bought the part (nullable)
            $table->foreignId('payment_id')->nullable()->constrained('payments')->onDelete('cascade'); // Foreign key to payments table (nullable)
//            $table->foreignId('admin_id')->constrained('admins')->onDelete('cascade');  // Foreign key to employees table
            $table->decimal('profit', 10, 2)->default(0);  // Profit made from selling this part
            $table->timestamps();  // created_at and updated_at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('spare_parts');
    }
};
