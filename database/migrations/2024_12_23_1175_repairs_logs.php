<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Create the 'repair_logs' table to track repair status updates
        Schema::create('repair_logs', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->foreignId('repair_id')  // Foreign key to the repairs table
                ->constrained('repairs')
                ->onDelete('cascade');  // Cascade delete on repair deletion
            $table->string('status');  // Repair status (e.g., diagnosed, in-progress, completed)
            $table->text('notes')->nullable();  // Notes for the status update (optional)
            $table->timestamps();  // Created at and updated at timestamps (automatically includes `created_at` and `updated_at`)
        });
    }

    public function down()
    {
        // Drop the 'repair_logs' table if it exists
        Schema::dropIfExists('repair_logs');
    }
};
