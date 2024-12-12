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
        Schema::create('repairs', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->date('entry_date'); // Entry date of the repair
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade'); // Foreign key to customers
            $table->string('invoice_number')->nullable(); // Invoice number associated with the repair
            $table->string('cashier'); // Cashier's name
            $table->string('phone_brand'); // Brand of the phone
            $table->string('imei_sn_1')->nullable(); // IMEI number 1
            $table->string('imei_sn_2')->nullable(); // IMEI number 2
            $table->text('damage_description'); // Damage description
            $table->text('phone_accessories')->nullable(); // Phone accessories
            $table->foreignId('technician_id')->constrained('technicians')->onDelete('cascade'); // Technician's name
            $table->boolean('under_warranty'); // Under warranty status
            $table->integer('warranty_duration')->nullable(); // Warranty duration
            $table->date('exit_date')->nullable(); // Exit date
            $table->string('print_type'); // Print type
            $table->softDeletes(); // This adds the deleted_at column
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('repairs');
    }
};
