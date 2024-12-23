<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->foreignId('customer_id')  // Foreign key to the customers table
                ->constrained('customers')
                ->onDelete('cascade');
            $table->enum('notification_type', ['sms', 'email']);  // Type of notification (SMS or Email)
            $table->text('message');  // Message content of the notification
            $table->timestamp('sent_at');  // Date and time when the notification was sent
            $table->timestamps();  // created_at and updated_at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
    }
};
