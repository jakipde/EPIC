<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();  // Auto-incrementing primary key
            $table->string('name');  // Admin's full name
            $table->string('phone')->nullable();  // Admin's phone number (nullable)
            $table->string('email')->nullable();  // Admin's email address (nullable)
            // Make sure user_id references users table with matching type
            $table->ulid('user_id');  // Foreign key to users table (matching the `users.id` type, which is `ulid`)
            $table->enum('role', ['admin', 'cashier'])->default('admin');  // Role of the admin (admin or cashier)
            $table->string('username')->unique();  // Unique username for login
            $table->string('password');  // Admin password (hashed)
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');  // Status of the admin account
            $table->timestamps();  // Created at and updated at timestamps

            // Foreign key constraint
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('admins');
    }
};
