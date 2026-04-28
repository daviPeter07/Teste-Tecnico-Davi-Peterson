<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

abstract class BaseFormRequest extends FormRequest
{
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Dados invalidos.',
            'errors' => $validator->errors(),
        ], 422));
    }

    public function authorize(): bool
    {
        return true;
    }

    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'string' => 'O campo :attribute deve ser um texto.',
            'email' => 'Informe um e-mail válido.',
            'unique' => 'O campo :attribute já está cadastrado.',
            'digits' => 'O campo :attribute deve conter exatamente :digits números.',
            'max' => 'O campo :attribute não pode ter mais de :max caracteres.',
            'min' => 'O campo :attribute deve ter pelo menos :min caracteres.',
            'numeric' => 'O campo :attribute deve ser um número.',
            'decimal' => 'O campo :attribute deve ter um formato decimal válido.',
            'gt' => 'O campo :attribute deve ser maior que :value.',
            'gt.numeric' => 'O campo :attribute deve ser maior que :value.',
            'exists' => 'O campo :attribute selecionado é inválido.',
            'nullable' => 'O campo :attribute pode ser nulo.',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'nome',
            'cpf' => 'CPF',
            'email' => 'e-mail',
            'password' => 'senha',
            'device_name' => 'dispositivo',

            'user_id' => 'usuário',
            'price' => 'preço',
            'description' => 'descrição',
        ];
    }
}
