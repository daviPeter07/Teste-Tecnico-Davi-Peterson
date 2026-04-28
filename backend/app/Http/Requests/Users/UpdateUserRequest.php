<?php

namespace App\Http\Requests\Users;

use App\Http\Requests\BaseFormRequest;
use App\Rules\ValidCpf;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends BaseFormRequest
{
    public function rules(): array
    {
        $userId = $this->route('user')?->id ?? $this->route('user');

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'cpf' => [
                'sometimes',
                'required',
                'digits:11',
                new ValidCpf(),
                Rule::unique('users', 'cpf')->ignore($userId),
            ],
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'password' => ['sometimes', 'nullable', 'string', 'min:6'],
        ];
    }
}
