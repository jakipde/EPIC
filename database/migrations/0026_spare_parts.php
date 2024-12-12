<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('spare_parts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id')->constrained()->onDelete('cascade');
            $table->string('code');
            $table->string('name');
            $table->string('barcode_name');
            $table->string('grade');
            $table->integer('stock');
            $table->integer('minimum_stock');
            $table->decimal('modal_price', 10, 2);
            $table->decimal('store_price', 10, 2);
            $table->decimal('special_price', 10, 2);
            $table->decimal('selling_price', 10, 2);
            $table->string('ecommerce_link')->nullable();
            $table->foreignId('category_id')->constrained('product_categories')->onDelete('cascade');
            $table->foreignId('sub_category_id')->constrained('product_sub_categories')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->foreignId('invoice_id')->constrained('invoices')->onDelete('cascade');
            $table->date('date');
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');
            $table->foreignId('payment_id')->constrained('payments')->onDelete('cascade');
            $table->foreignId('admin_id')->constrained('employees')->onDelete('cascade'); // Changed to employees
            $table->decimal('profit', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('spare_parts');
    }
};
