<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \App\Models\Image::factory(40)->create();

    }
}
