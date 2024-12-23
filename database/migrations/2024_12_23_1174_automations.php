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
        Schema::create('automations', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->string('type');  // Type of automation (e.g., 'notification', 'payment_reminder', 'sla_alert')
            $table->string('event');  // The event that triggers the automation (e.g., 'repair_completed', 'payment_due', 'sla_overdue')
            $table->text('message');  // Message content for the notification, reminder, or alert
            $table->string('recipient_type');  // Type of recipient (e.g., 'customer', 'technician', 'admin')
            $table->foreignId('customer_id')->nullable()->constrained('customers')->onDelete('cascade');  // Foreign key to customers table (for customer-specific automations)
            $table->foreignId('repair_id')->nullable()->constrained('repairs')->onDelete('cascade');  // Foreign key to repairs table (for repair-specific automations)
            $table->dateTime('scheduled_at');  // When the automation is scheduled to occur (e.g., notification time, reminder time)
            $table->boolean('is_sent')->default(false);  // If the notification, reminder, or alert has been sent
            $table->timestamps();  // created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('automations');
    }
};
