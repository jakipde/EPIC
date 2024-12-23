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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->enum('report_type', ['repair_history', 'technician_performance', 'parts_usage']);  // Type of report (repair history, technician performance, parts usage)
            $table->json('filters')->nullable();  // JSON field to store filter criteria used for the report (e.g., date range, technician ID, customer ID)
            $table->text('generated_report');  // Text or JSON field to store the actual report content (could be CSV, JSON, or text data)
            $table->timestamp('generated_at')->nullable();  // Date and time when the report was generated
            $table->timestamps();  // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
