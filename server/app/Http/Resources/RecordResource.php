<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RecordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=> $this->id,
            'type' => $this->type,
            'category' => $this->category,
            'moneySpentInPLN' => $this->moneySpentInPLN, 
            'description' => $this->description,
            'userID' => 6, 
            'created_at' => $this->created_at, 
            'updated_at' => $this->updated_at,  
        ];
    }
}
