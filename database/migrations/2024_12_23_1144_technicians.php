<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('technicians', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->string('name');  // Technician's full name
            $table->string('phone')->nullable();  // Technician's phone number (nullable)
            $table->string('email')->nullable();  // Technician's email address (nullable)
            $table->ulid('user_id');  // Foreign key to users table
            $table->enum('role', ['technician', 'lead_technician', 'assistant_technician'])->default('technician');  // Role of the technician
            $table->decimal('hourly_rate', 10, 2)->nullable();  // Technician's hourly rate (nullable)
            $table->decimal('total_hours_worked', 10, 2)->default(0);  // Total hours worked by the technician
            $table->enum('status', ['active', 'inactive', 'on_leave'])->default('active');  // Current status of the technician
            $table->timestamps();  // Created at and updated at timestamps

            // Foreign key constraint
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade'); // Delete technician if user is deleted
 });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technicians');
    }
};
