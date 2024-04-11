<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Wiązanki',
            'key_word_name' => 'wian',
        ]);

        Category::create([
            'name' => 'Bukiety',
            'key_word_name' => 'bukiet',
        ]);

        Category::create([
            'name' => 'Kompozycje',
            'key_word_name' => 'kompozycj',
        ]);

        Category::create([
            'name' => 'Koszyki',
            'key_word_name' => 'kosz',
        ]);

        Category::create([
            'name' => 'Komplety',
            'key_word_name' => 'komplet',
        ]);

        Category::create([
            'name' => 'Stroiki',
            'key_word_name' => 'stroik',
        ]);

        Category::create([
            'name' => 'Dekoracje',
            'key_word_name' => 'dekoracj',
        ]);

        //////////////////////////////
        // Category::create([
        //     'name' => 'Ogólny',
        // ]);

        // Category::create([
        //     'name' => 'Wiązanki',
        // ]);

        // Category::create([
        //     'name' => 'Bukiety',
        // ]);

        // Category::create([
        //     'name' => 'Kompozycje',
        // ]);

        // Category::create([
        //     'name' => 'Koszyki',
        // ]);

        // Category::create([
        //     'name' => 'Komplety',
        // ]);

        // Category::create([
        //     'name' => 'Stroiki',
        // ]);

        // Category::create([
        //     'name' => 'Dekoracje',
        // ]);

        // Category::create([
        //     'name' => 'Kompozycje',
        // ]);

        // Category::create([
        //     'name' => 'Koszyki',
        // ]);

        // Category::create([
        //     'name' => 'Komplety',
        // ]);

        // Category::create([
        //     'name' => 'Stroiki',
        // ]);

        // Category::create([
        //     'name' => 'Dekoracje',
        // ]);

        // Category::create([
        //     'name' => 'Kompozycje',
        // ]);

        // Category::create([
        //     'name' => 'Koszyki',
        // ]);

        // Category::create([
        //     'name' => 'Komplety',
        // ]);

        // Category::create([
        //     'name' => 'Stroiki',
        // ]);

        // Category::create([
        //     'name' => 'Dekoracje',
        // ]);
    }
}
