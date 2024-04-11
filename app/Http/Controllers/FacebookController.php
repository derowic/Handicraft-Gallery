<?php

namespace App\Http\Controllers;

use App\Repositories\FBRepository;

class FacebookController extends Controller
{
    private $categories;

    protected $fbRepository;

    public function __construct(FBRepository $fbRepository)
    {
        $this->fbRepository = $fbRepository;
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
