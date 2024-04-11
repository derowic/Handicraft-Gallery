<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    public function authorize(): bool
    {
        app()->setLocale(auth()->user()->lang);

        return auth()->user()->hasRole('user') || auth()->user()->hasRole('admin') || auth()->user()->hasRole('moderator');
    }

    public function rules(): array
    {
        return [
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,mp4', //dimensions:max_width=1000
            'title' => 'required|string|min:1',
            'text' => 'required|string|min:1',
            'category' => 'required|numeric|min:1',
            'tags' => 'sometimes|nullable|exists:tags,id',
            'customTag' => 'sometimes|nullable|string|min:1',
        ];
    }
}
