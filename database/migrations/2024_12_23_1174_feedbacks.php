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
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->foreignId('repair_id')->constrained('repairs')->onDelete('cascade');  // Foreign key to repairs table
            $table->integer('rating')->default(0)->check('rating >= 1 AND rating <= 5');  // Rating from 1 to 5 stars
            $table->text('comments')->nullable();  // Feedback comments (nullable)
            $table->timestamps();  // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedbacks');
    }
};
