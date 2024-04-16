<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    protected $perPage = 20;

    public function index(Category $category)
    {
        return Inertia::render('IndexPosts', ['category' => $category]);
    }

    public function create()
    {
        $post = Post::where('category_id', '=', 0)->first();

        $title = null;
        if ($post == null) {
            $post = new Post();
            $post->category_id = 0;
            $post->created_at = now();
            $post->updated_at = now();
            $post->save();
            $title = '';
        } else {
            $post->load('images');
            $title = 'Nie zapisano poprzedniego postu, możesz dokończyć jego edycję';
        }

        return Inertia::render('Post/Form/FormPost', [
            'title' => $title,
            'categories' => Category::all(),
            'postData' => $post,
        ]);
    }

    public function edit(Post $post)
    {
        $post->load('images');

        return Inertia::render('Post/Form/FormPost', [
            'categories' => Category::all(),
            'postData' => $post,
        ]);
    }

    public function fetchPosts(Request $request)
    {
        $perPage = 5;

        $postsQuery = Post::with(['category:id,name'])->orderBy('created_at', 'desc');
        $postsQuery->where('category_id', '>', 0);
        if ($request->input('category')) {
            $postsQuery->where('category_id', $request->input('category'));
        }
        $posts = $postsQuery->paginate($perPage);

        return response()->json([
            'hasMore' => $posts->hasMorePages(),
            'data' => PostResource::collection($posts),
        ]);
    }

    public function store(PostRequest $request)
    {
        $post = new Post();
        $post->title = $request->input('title');
        $post->description = $request->input('description');
        $post->category_id = $request->input('category');
        $post->price = $request->input('price');
        $post->created_at = now();
        $post->updated_at = now();
        $post->save();

        return redirect()->back()->with('toast', 'Added new product');
        // if ($post->save()) {
        //     return response()->json(['message' => trans('notifications.Post added, wait in fresh to accept by moderators')], 201);
        // } else {
        //     return response()->json(['message' => trans('notifications.Error while adding post')], 500);
        // }
    }

    public function update(Post $post, PostRequest $request)
    {
        $post->title = $request->input('title');
        $post->price = $request->input('price');
        $post->description = $request->input('description');
        $post->category_id = $request->input('category');
        $post->updated_at = now();
        $post->save();

        return redirect()->back()->with('toast', 'Updated the product');
        if ($post->save()) {
            return response()->json(['message' => trans('notifications.Post updated')], 200);
        } else {
            return response()->json(['message' => trans('notifications.Error while adding post')], 500);
        }
    }

    public function destroy(Post $post)
    {
        foreach ($post->images as $image) {
            $fileToDelete = public_path('images/'.$image->path_to_image);
            if (file_exists($fileToDelete)) {
                unlink($fileToDelete);
            }
            $image->delete();
        }

        $post->delete();

        return response()->json(['message' => trans('notifications.Post deleted')], 200);
    }
}
