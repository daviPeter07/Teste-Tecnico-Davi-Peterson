<?php

namespace App\Http\Requests\Products;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends BaseFormRequest
{
    public function rules(): array
    {
        return [
            'user_id' => [
                'required',
                'exists:users,id',
                Rule::in([(string) $this->user()?->id, $this->user()?->id]),
            ],
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'gt:0'],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
