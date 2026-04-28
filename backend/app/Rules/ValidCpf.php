<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidCpf implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Extrai somente os números
        $cpf = preg_replace('/[^0-9]/is', '', (string) $value);

        // Verifica se foi informado todos os digitos corretamente
        if (strlen($cpf) != 11) {
            $fail('O CPF informado é inválido.');

            return;
        }

        // Verifica se foi informada uma sequência de digitos repetidos. Ex: 111.111.111-11
        if (preg_match('/(\d)\1{10}/', $cpf)) {
            $fail('O CPF informado é inválido.');

            return;
        }

        // Faz o calculo para validar o CPF.
        // O laço roda duas vezes, uma para cada dígito verificador do CPF.
        for ($t = 9; $t < 11; $t++) {

            // Soma os dígitos anteriores ao verificador, multiplicando cada um pelo seu peso.
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }

            // Calcula o dígito verificador esperado.
            $d = ((10 * $d) % 11) % 10;

            // Valida se o dígito calculado bate com o dígito informado no CPF.
            if ($cpf[$c] != $d) {
                $fail('O CPF informado é inválido.');

                return;
            }
        }
    }
}
