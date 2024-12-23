<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Create repairs table
        Schema::create('repairs', function (Blueprint $table) {
            $table->id();  // Automatically BIGINT UNSIGNED
            $table->date('entry_date');  // Date when the repair entry was created
            $table->foreignId('customer_id')  // Foreign key to the customers table
                ->constrained('customers')
                ->onDelete('cascade');
            $table->string('invoice_number')->nullable();  // Optional invoice number
            $table->foreignId('cashier_id')  // Foreign key to the employees table (admin/cashier)
                ->constrained('admins')
                ->onDelete('cascade');
            $table->string('phone_brand');  // Brand of the phone being repaired
            $table->string('phone_model');  // Brand of the phone being repaired
            $table->string('completeness');  // Brand of the phone being repaired
            $table->string('imei_sn_1')->nullable();  // First IMEI/serial number
            $table->string('imei_sn_2')->nullable();  // Second IMEI/serial number, if applicable
            $table->text('damage_description');  // Detailed description of the damage
            $table->text('phone_accessories')->nullable();  // Accessories accompanying the device
            $table->foreignId('technician_id')  // Foreign key to the employees table (technician)
                ->constrained('technicians')
                ->onDelete('cascade');
            $table->boolean('under_warranty')->default(false);  // Whether the device is under warranty
            $table->integer('warranty_duration')->nullable()->default(0);  // Duration of warranty in months
            $table->decimal('cost_estimate', 10, 2)->nullable();  // Estimated cost for the repair
            $table->string('repair_status')->default('pending');  // Repair status (pending, in-progress, completed)
            $table->date('exit_date')->nullable();  // Date when the repair was completed or device returned
            $table->text('notes')->nullable();  // Additional notes about the repair
            $table->string('repair_type'); // If you're storing it directly as a field in `repairs` table
            $table->string('print_type')->nullable();  // Type of print (if applicable, e.g., for receipts)
            $table->softDeletes();  // Soft delete to track deleted repairs
            $table->timestamps();  // Created at and updated at timestamps

        });

        // Create pivot table for many-to-many relationship between Repairs and Services
        Schema::create('repair_service', function (Blueprint $table) {
            $table->id();
            $table->foreignId('repair_id')  // Foreign key to repairs table
                ->constrained('repairs')
                ->onDelete('cascade');
            $table->foreignId('service_id')  // Foreign key to services table
                ->constrained('services')
                ->onDelete('cascade');
            $table->decimal('cost', 8, 2)->nullable();  // Additional attributes for service cost
            $table->timestamps();
        });
    }

    public function down()
    {
        // Drop the pivot table first
        Schema::dropIfExists('repair_service');
        // Drop the repairs table
        Schema::dropIfExists('repairs');
    }
};
