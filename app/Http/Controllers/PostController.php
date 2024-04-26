<?php

namespace App\Http\Controllers;

use App\Helpers\CacheHelper;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $page = $request->input('page');
        $posts = null;
        $hasMorePosts = null;
        if ($request->input('page') == 1 && $request->input('category') == null) {
            $posts = CacheHelper::getPosts();
            $hasMorePosts = true;
        }

        if (! $posts) {
            $postsQuery = Post::with(['category:id,name'])->orderBy('created_at', 'desc');
            if ($request->input('category')) {
                $postsQuery->where('category_id', $request->input('category'));
            }
            else
            {
                $postsQuery->where('category_id', '>', 0)->orWhereNull('category_id');
            }
            $posts = $postsQuery
                ->skip(($page - 1) * $this->perPage)
                ->take($this->perPage)
                ->get();

            $hasMorePosts = $posts->count() === $this->perPage;
        }

        return response()->json([
            'hasMore' => $hasMorePosts,
            'data' => PostResource::collection($posts),
        ]);
    }

    public function store(PostRequest $request)
    {
        $post = new Post([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'category_id' => $request->input('category'),
            'price' => $request->input('price'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        CacheHelper::refreshCache();

        return redirect()->back()->with('toast', 'Added new product');
    }

    public function update(Post $post, PostRequest $request)
    {

        $post->update([
            'title' => $request->input('title'),
            'price' => $request->input('price'),
            'description' => $request->input('description'),
            'category_id' => $request->input('category'),
            'updated_at' => now(),
        ]);

        CacheHelper::refreshCache();

        return redirect()->back()->with('toast', 'Updated the product');
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

        CacheHelper::refreshCache();

        return response()->json(500);
    }
}
