<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray($request)
    {
        $firstPost = $this->posts()->first();
        $path_to_image = null;

        if ($firstPost) {
            $firstImage = $firstPost->images()->first();
            if ($firstImage) {
                $path_to_image = $firstImage->path_to_image;
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'path_to_image' => $path_to_image,
        ];
    }
}
