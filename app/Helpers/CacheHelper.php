<?php

namespace App\Helpers;

use App\Models\Post;
use Illuminate\Support\Facades\Cache;

class CacheHelper
{
    public static function set($key, $value, $minutes = 60)
    {
        Cache::put($key, $value, $minutes);
    }

    public static function get($key, $default = null)
    {
        return Cache::get($key, $default);
    }

    public static function has($key)
    {
        return Cache::has($key);
    }

    public static function forget($key)
    {
        Cache::forget($key);
    }

    public static function flush()
    {
        Cache::flush();
    }

    public static function forver($key, $value)
    {
        Cache::forever($key, $value);
    }

    public static function getPosts()
    {
        if (Cache::has('posts')) {
            return Cache::get('posts');
        } else {
            Cache::forever('posts', self::fetchPosts());
        }
    }

    public static function refreshCache()
    {
        self::forget('posts');
        Cache::forever('posts', self::fetchPosts());
    }

    private static function fetchPosts()
    {
        $postsQuery = Post::with(['category:id,name'])->orderBy('created_at', 'desc');
        $postsQuery->where('category_id', '>', 0);

        return $postsQuery->paginate(20);
    }
}
