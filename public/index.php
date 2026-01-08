<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// #region agent log - check if request reaches Laravel
if (str_starts_with($_SERVER['REQUEST_URI'] ?? '', '/storage/')) {
    $logPath = dirname(__DIR__) . '/.cursor/debug.log';
    @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'L', 'location' => 'index.php', 'message' => 'request reached index.php', 'data' => ['uri' => $_SERVER['REQUEST_URI'] ?? '', 'method' => $_SERVER['REQUEST_METHOD'] ?? ''], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
}
// #endregion

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
