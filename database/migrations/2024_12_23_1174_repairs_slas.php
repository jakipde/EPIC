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
        Schema::create('repair_slas', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->foreignId('repair_id')->constrained('repairs')->onDelete('cascade');  // Foreign key to repairs table
            $table->timestamp('sla_deadline');  // Deadline for repair completion
            $table->enum('sla_met', ['yes', 'no'])->default('no');  // Whether the SLA was met (yes/no)
            $table->boolean('alert_overdue')->default(false);  // Alert flag for overdue repairs (true/false)
            $table->timestamps();  // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repair_slas');
    }
};
