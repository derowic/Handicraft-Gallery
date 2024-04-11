<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        //dd($this->id);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => $this->category?->name,
            'price' => $this->price,
            'width' => $this->width,
            'length' => $this->length,
            'height' => $this->height,
            'diameter' => $this->diameter,
            'images' => $this->images()->get(),
        ];
    }
}
