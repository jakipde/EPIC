<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('data_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('data_entries_category_id')->constrained('data_entries_category')->onDelete('cascade'); // Add this line
            $table->enum('entry_type', ['customers', 'technician', 'repairs', 'devices', 'accessories', 'spare_parts', 'tools']);
            $table->json('data')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('data_entries');
    }
};
