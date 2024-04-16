<?php

namespace App\Http\Controllers;

use App\Repositories\FBRepository;

class FacebookController extends Controller
{
    protected $fbRepository;

    public function __construct()
    {
        $this->fbRepository =new FBRepository;
    }

    public function refresh()
    {
        $this->fbRepository->getFacebookPosts();
        $this->fbRepository->updateFBToken();

        return response()->json(['message' => trans('notifications.Posts updated')], 201);
    }

    public function clear()
    {
        $this->fbRepository->clearDB();
    }
}
