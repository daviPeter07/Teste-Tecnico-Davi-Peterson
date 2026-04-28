<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserService
{
    public function listUsers(array $filters = []): LengthAwarePaginator
    {
        $search = $filters['search'] ?? null;
        $perPage = $filters['per_page'] ?? 10;

        return User::query()
            //se search tiver valor, aplica o filtro
            ->when($search, function ($query) use ($search) {
                //filtro para buscar por nome, email ou cpf para case-insensitive
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'ILIKE', "%{$search}%")
                        ->orWhere('email', 'ILIKE', "%{$search}%")
                        ->orWhere('cpf', 'ILIKE', "%{$search}%");
                });
            })
            //ordena do mais recente paginado
            ->latest()
            ->paginate($perPage);
    }

    public function createUser(array $data): User
    {
        return User::create($data);
    }

    public function getUserWithProducts(User $user): User
    {
        return $user->load('products');
    }

    public function updateUser(User $user, array $data): User
    {
        if (empty($data['password'])) {
            unset($data['password']);
        }

        $user->update($data);

        return $user->refresh();
    }

    public function deleteUser(User $user): void
    {
        $user->delete();
    }
}
