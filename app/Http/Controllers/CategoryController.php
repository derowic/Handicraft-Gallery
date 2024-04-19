<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return CategoryResource::collection($categories);
    }

    public function store(CategoryRequest $request)
    {
        $category = new Category();
        $category->name = $request->input('name');
        $category->save();

        return response()->json(['message' => trans('notifications.Success, category added')], 201);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(['message' => trans('notifications.Success, category deleted')], 200);
    }
}
