<?php

use App\Http\Controllers\Api\ReportSqlController;
use Illuminate\Support\Facades\Route;

Route::get('/relatorio-sql', [ReportSqlController::class, 'index']);
