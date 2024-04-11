<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Image;
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

        if ($post == null) {
            $post = new Post();
            $post->category_id = 0;
            $post->created_at = now();
            $post->updated_at = now();
            $post->save();
        } else {
            $post->load('images');
        }

        return Inertia::render('Post/Form/FormPost', [
            'categories' => Category::all(),
            'post' => $post,
        ]);
    }

    public function edit(Post $post)
    {
        //dd("hh");
        $post->load('images');

        return Inertia::render('Post/Form/FormPost', [
            'categories' => Category::all(),
            'post' => $post,
        ]);
    }

    public function fetchPosts(Request $request)
    {
        $categories = $request->input('category');
        $tolerance = 10;
        $perPage = 20;

        $postsQuery = Post::with(['category:id,name'])->orderBy('created_at', 'desc');
        $postsQuery->where('category_id', '>', 0);
        if ($request->input('category')) {
            $postsQuery->where('category_id', $request->input('category'));
        }

        // if ($request->input('minPrice')) {
        //     $postsQuery->where('price', '>=', $request->input('minPrice'));
        // }

        // if ($request->filled('maxPrice')) {
        //     $postsQuery->where('price', '<=', $request->input('maxPrice'));
        // }

        // if ($request->filled('width')) {
        //     $postsQuery->whereBetween('width', [$request->input('width') - $tolerance, $request->input('width') + $tolerance]);
        // }

        // if ($request->filled('length')) {
        //     $postsQuery->whereBetween('length', [$request->input('length') - $tolerance, $request->input('length') + $tolerance]);
        // }

        // if ($request->filled('height')) {
        //     $postsQuery->whereBetween('height', [$request->input('height') - $tolerance, $request->input('height') + $tolerance]);
        // }

        // if ($request->filled('diameter')) {
        //     $postsQuery->whereBetween('diameter', [$request->input('diameter') - $tolerance, $request->input('diameter') + $tolerance]);
        // }

        $posts = $postsQuery->paginate($perPage);
        //$posts = $postsQuery->get();
        $postsResources = PostResource::collection($posts);

        return response()->json([
            'hasMore' => $posts->hasMorePages(),
            'posts' => $postsResources,
        ]);
    }

    public function show(Post $post): Response
    {
        return Inertia::render('OnePostShow', [
            'post' => $post->load('user', 'category', 'tags'),
            'tags' => Tag::all(),
        ]);
    }

    public function store(PostRequest $request)
    {
        // $image = $request->file('image');
        // $imageName = auth()->user()->id.time().'_'.$image->getClientOriginalName();
        // $image->move(public_path('images'), $imageName);

        $post = new Post();
        $post->title = $request->input('title');
        $post->description = $request->input('description');
        $post->category_id = $request->input('category');
        $post->price = $request->input('price');
        $post->created_at = now();
        $post->updated_at = now();
        $post->save();

        if ($post->save()) {
            return response()->json(['message' => trans('notifications.Post added, wait in fresh to accept by moderators')], 201);
        } else {
            return response()->json(['message' => trans('notifications.Error while adding post')], 500);
        }

        return response()->json(['message' => trans('notifications.Error while adding post')], 400);
    }

    public function update(Post $post, Request $request)
    {
        //dd($request);
        $post->title = $request->input('title');
        $post->price = $request->input('price');
        $post->description = $request->input('description');
        $post->updated_at = now();
        $post->save();

        if ($post->save()) {
            return response()->json(['message' => trans('notifications.Post updated')], 201);
        } else {
            return response()->json(['message' => trans('notifications.Error while adding post')], 500);
        }

        return response()->json(['message' => trans('notifications.Error while adding post')], 400);
    }

    public function destroy(Post $post)
    {
        foreach ($post->images as $image) {
            $fileToDelete = public_path('images/'.$image->path_to_image);
            if (file_exists($fileToDelete)) {
                unlink($fileToDelete);
            }
        }

        $post->delete();

        return response()->json(['message' => trans('notifications.Post deleted')], 201);
    }
}
