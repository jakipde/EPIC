<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('repairs', function (Blueprint $table) {
            $table->id();  // Primary key
            $table->date('entry_date');
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');
            $table->string('invoice_number')->nullable();
            $table->ulid('cashier_id')->nullable();
            $table->ulid('technician_id')->nullable();
            $table->string('phone_brand');
            $table->string('phone_model');
            $table->string('imei_sn_1')->nullable();
            $table->string('imei_sn_2')->nullable();
            $table->text('damage_description');
            $table->boolean('under_warranty')->default(false);
            $table->integer('warranty_duration')->nullable()->default(0);
            $table->string('warranty_unit')->default('days');
            $table->text('notes')->nullable();
            $table->string('repair_type');
            $table->string('service_type')->nullable();
            $table->decimal('total_price', 10, 2);
            $table->decimal('down_payment', 10, 2)->nullable();
            $table->decimal('sub_total', 10, 2)->nullable();
            $table->string('repair_status')->default('pending');
            $table->date('exit_date')->nullable();
            $table->string('print_type')->nullable();
            $table->json('completeness')->nullable();
            $table->softDeletes();
            $table->timestamps();

            // Define foreign keys
            $table->foreign('cashier_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('technician_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('repairs');
    }
};
