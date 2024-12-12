<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('repairs', function (Blueprint $table) {
            $table->id();
            $table->date('entry_date');
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');
            $table->string('invoice_number')->nullable();
            $table->foreignId('cashier_id')->constrained('employees')->onDelete('cascade');
            $table->string('phone_brand');
            $table->string('imei_sn_1')->nullable();
            $table->string('imei_sn_2')->nullable();
            $table->text('damage_description');
            $table->text('phone_accessories')->nullable();
            $table->foreignId('technician_id')->constrained('employees')->onDelete('cascade');
            $table->boolean('under_warranty')->default(false);
            $table->integer('warranty_duration')->nullable()->default(0);
            $table->decimal('cost_estimate', 10, 2)->nullable();
            $table->string('repair_status')->default('pending');
            $table->date('exit_date')->nullable();
            $table->text('notes')->nullable();
            $table->string('print_type')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('repairs');
    }
};
