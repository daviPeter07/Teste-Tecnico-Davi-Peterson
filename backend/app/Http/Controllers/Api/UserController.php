<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', User::class);

        $users = $this->userService->listUsers([
            'search' => $request->query('search'),
            'per_page' => $request->query('per_page', 10),
            'sort_by' => $request->query('sort_by', 'created_at'),
            'sort_dir' => $request->query('sort_dir', 'desc'),
        ]);

        return response()->json([
            'message' => 'Usuários listados com sucesso.',
            'data' => UserResource::collection($users),
            'meta' => $this->paginationMeta($users),
        ]);
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = $this->userService->createUser($request->validated());

        return response()->json([
            'message' => 'Usuário criado com sucesso.',
            'data' => new UserResource($user),
        ], 201);
    }

    public function show(User $user): JsonResponse
    {
        $this->authorize('view', $user);

        $user = $this->userService->getUserWithProducts($user);

        return response()->json([
            'message' => 'Usuário encontrado com sucesso.',
            'data' => new UserResource($user),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $this->authorize('update', $user);

        $user = $this->userService->updateUser($user, $request->validated());

        return response()->json([
            'message' => 'Usuário atualizado com sucesso.',
            'data' => new UserResource($user),
        ]);
    }

    public function destroy(User $user): JsonResponse
    {
        $this->authorize('delete', $user);

        $this->userService->deleteUser($user);

        return response()->json([
            'message' => 'Usuário excluído com sucesso.',
        ]);
    }
}
