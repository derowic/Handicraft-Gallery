<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageRequest;
use App\Http\Resources\ImageResource;
use App\Models\Category;
use App\Models\Image;
use App\Models\Post;
use Inertia\Inertia;

class ImageController extends Controller
{
    protected $perPage = 20;

    public function index(Category $category)
    {
        return Inertia::render('InfiniteScrollPosts', ['category' => $category]);
    }

    public function fetchImages(Post $post)
    {
        return ImageResource::collection($post->images);
    }

    public function store(Post $post, ImageRequest $request)
    {
        $images = $request->file('images');

        foreach ($images as $file) {
            $imageName = auth()->user()->id.time().'_'.$file->getClientOriginalName();
            $file->move(public_path('images'), $imageName);

            $image = new Image();
            $image->post_id = $post->id;
            $image->path_to_image = $imageName;
            $image->created_at = now();
            $image->updated_at = now();
            $image->save();
        }

        if ($post->save()) {
            return response()->json(['message' => trans('notifications.Images added')], 201);
        } else {
            return response()->json(['message' => trans('notifications.Error while adding post')], 500);
        }
    }

    public function destroy(Image $image)
    {
        $image->delete();

        return response()->json(['message' => trans('notifications.Image deleted')], 200);
    }
}
