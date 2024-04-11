<?php

use App\Models\Category;
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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('fbId')->nullable()->nullable();
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->foreignIdFor(Category::class)->nullable();
            $table->double('price')->nullable();
            $table->double('width')->nullable();
            $table->double('height')->nullable();
            $table->double('length')->nullable();
            $table->double('diameter')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
