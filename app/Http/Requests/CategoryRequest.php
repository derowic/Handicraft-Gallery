<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'podaj nazwe',
            'name.min' => 'kategoria musi mieć conajmnie jedną literę',
        ];
    }
}
