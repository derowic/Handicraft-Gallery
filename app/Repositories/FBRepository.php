<?php

namespace App\Repositories;

use App\Helpers\CacheHelper;
use App\Models\Category;
use App\Models\Image;
use App\Models\Post;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class FBRepository
{
    private $categories;

    private function imageSave(int $postId, string $imageUrl)
    {
        $extension = pathinfo($imageUrl, PATHINFO_EXTENSION);
        $imageContent = file_get_contents($imageUrl);
        $fileName = strval($postId).'.jpg';
        file_put_contents(public_path('images/'.$fileName), $imageContent);

        $image = new Image();
        $image->post_id = $postId;
        $image->path_to_image = $fileName;
        $image->created_at = now();
        $image->updated_at = now();
        $image->save();
    }

    private function findCategory($post)
    {
        $text = $post['message'];
        $text = strtolower($text);

        foreach ($this->categories as $name => $number) {
            if (strpos($text, $name) !== false) {
                dump($name);

                return $number;
            }
        }

        return null;
    }

    private function findPrice($post)
    {
        $pattern = '/Cena (\d+) zł/';

        if (preg_match($pattern, $post['message'], $matches)) {
            dump("Znaleziona cena: {$matches[1]} zł");

            return $matches[1];
        }

        return null;
    }

    private function findKeyWords(string $text)
    {
        $wordToFind = 'przykładowy';

        if (strpos($text, $wordToFind) !== false) {
            echo "Znaleziono słowo '{$wordToFind}' w tekście.";
        } else {
            echo "Nie znaleziono słowa '{$wordToFind}' w tekście.";
        }
    }

    public function getFacebookPosts()
    {
        $this->categories = Category::pluck('id', 'key_word_name');

        set_time_limit(0);
        $accessToken = config('services.facebook.long_lived_access_token');
        $userId = config('services.facebook.account_id');
        $graphVersion = config('services.facebook.default_graph_version');

        $endpoint =
            'https://graph.facebook.com/'.$graphVersion.'/'.$userId.
            '/posts?fields=id,message,created_time,full_picture,attachments&access_token='.$accessToken;

        $client = new Client([
            'headers' => [
                'Connection' => 'keep-alive',
            ],
        ]);

        do {
            $response = $client->get($endpoint);
            $body = $response->getBody();
            $posts = json_decode($body, true);
            foreach ($posts['data'] as $post) {
                if (isset($post['attachments']) && isset($post['attachments']['data'])) {
                    if (! Post::where('fbId', $post['id'])->exists()) {
                        try {
                            DB::beginTransaction();
                            foreach ($post['attachments']['data'] as $attachment) {
                                if (isset($attachment['subattachments'])) {
                                    $newPost = new Post();
                                    $newPost->fbId = $post['id'];
                                    $newPost->category_id = $this->findCategory($post);
                                    $newPost->price = $this->findPrice($post);
                                    $newPost->created_at = $post['created_time'];
                                    $newPost->updated_at = now();
                                    $newPost->save();
                                    $counter = 0;
                                    foreach ($attachment['subattachments']['data'] as $subAttachment) {
                                        $imageUrl = $subAttachment['media']['image']['src'];
                                        $imageContent = file_get_contents($imageUrl);
                                        $originalImage = imagecreatefromstring($imageContent);
                                        $webpImagePath = public_path('images/' . (strval($newPost->id).strval($counter)) . '.webp');
                                        imagewebp($originalImage, $webpImagePath,10);

                                        $imageModel = new Image();
                                        $imageModel->post_id = $newPost->id;
                                        $imageModel->path_to_image = (strval($newPost->id).strval($counter)). '.webp';
                                        $imageModel->created_at = $post['created_time'];
                                        $imageModel->updated_at = now();
                                        $imageModel->save();
                                        $counter++;
                                    }
                                }
                            }
                            DB::commit();
                        } catch (\Exception $e) {
                            DB::rollBack();
                            Log::info('Error while fetching new post from FB ' . $e->getMessage());
                            return response()->json(['error' => $e->getMessage()], 500);
                        }
                    }
                }
            }

            $nextPageUrl = (isset($posts['paging']['next']) && ! empty($posts['paging']['next'])) ? $posts['paging']['next'] : null;

            if ($nextPageUrl) {
                $endpoint = $nextPageUrl;
            } else {
                break;
            }

        } while ($nextPageUrl);
        CacheHelper::refreshCache();
        Log::info('Content updated!');
    }

    public function clearDB()
    {
        DB::table('images')->truncate();
        DB::table('posts')->truncate();
        $directory = public_path('images');
        File::cleanDirectory($directory);
    }

    public function updateFBToken()
    {
        $graphVersion = config('services.facebook.default_graph_version');
        $appId = config('services.facebook.app_id');
        $appSecret = config('services.facebook.app_secret');
        $accessLongLiveToken = config('services.facebook.long_lived_access_token');

        $endpoint =
            'https://graph.facebook.com/'.$graphVersion.
            '/oauth/access_token?grant_type=fb_exchange_token&client_id='.$appId.
            '&client_secret='.$appSecret.
            '&fb_exchange_token='.$accessLongLiveToken;

        $client = new Client([
            'headers' => [
                'Connection' => 'keep-alive',
            ],
        ]);

        try {
            $response = $client->get($endpoint);
            $body = $response->getBody();
            $data = json_decode($body, true);
            $data['access_token'];
            $this->updateEnvFile('FACEBOOK_LONG_LIVED_ACCESS_TOKEN', $data['access_token']);
            dump('token zaktualizowano');
        } catch (\Exception $e) {
            dump($e->getMessage());

            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    public function updateEnvFile($key, $value)
    {
        $envFile = base_path('.env');
        if (File::exists($envFile)) {
            $currentEnv = file_get_contents($envFile);
            $envVariables = explode("\n", $currentEnv);

            foreach ($envVariables as $index => $envVariable) {
                if (strpos($envVariable, $key) !== false) {
                    $envVariables[$index] = $key.'='.$value;
                    break;
                }
            }

            $updatedEnv = implode("\n", $envVariables);
            File::put($envFile, $updatedEnv);
        }
    }
}
