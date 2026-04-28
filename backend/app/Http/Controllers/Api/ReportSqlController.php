<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ReportSqlService;
use Illuminate\Http\JsonResponse;

class ReportSqlController extends Controller
{
    public function __construct(
        private readonly ReportSqlService $reportSqlService
    ) {}

    public function index(): JsonResponse
    {
        $data = $this->reportSqlService->usersWithProductsSummary();

        return response()->json([
            'message' => 'Relatório SQL gerado com sucesso.',
            'data' => $data,
        ]);
    }
}
