<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    public function authorize(): bool {
        return auth()->check();
    }

    public function rules(): array {
        return [
            'title' => 'required|string|min:1',
            'price' => 'required|numeric|min:1',
            'description' => 'nullable|string|min:1',
            'category' => 'required|numeric|min:1'
        ];
    }

    public function messages(): array {
        return [
            'title.required' => 'podaj nazwe',
            'price.required' => 'podaj cene',
            'price.min' => 'podaj cene',
            'category.required' => 'wybierz kategorie',
            'category.min' => 'wybierz kategorie'
        ];
    }
}
