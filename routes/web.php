<?php

use App\Livewire\Settings\Appearance;
use App\Livewire\Settings\Password;
use App\Livewire\Settings\Profile;
use App\Livewire\Settings\TwoFactor;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Laravel\Fortify\Features;
use App\Livewire\Beers\Index;
use App\Livewire\Beers\Create;
use App\Http\Controllers\BeerController; 
use App\Livewire\Beers\Update;

// Serve storage files directly (fallback if symlink doesn't work)
// This route MUST be first and public (before any other routes)
Route::any('storage/{path}', function ($path) {
    // #region agent log
    $logPath = base_path('.cursor/debug.log');
    @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'K', 'location' => 'web.php:storage.serve', 'message' => 'storage route called', 'data' => ['path' => $path, 'method' => request()->method(), 'uri' => request()->getRequestUri()], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
    // #endregion
    
    try {
        $exists = Storage::disk('public')->exists($path);
        
        // #region agent log
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'K', 'location' => 'web.php:storage.serve', 'message' => 'file check', 'data' => ['path' => $path, 'exists' => $exists], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
        
        if (!$exists) {
            // #region agent log
            @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'K', 'location' => 'web.php:storage.serve', 'message' => 'file not found', 'data' => ['path' => $path], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
            // #endregion
            abort(404);
        }
        
        $filePath = Storage::disk('public')->path($path);
        
        // #region agent log
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'K', 'location' => 'web.php:storage.serve', 'message' => 'serving file', 'data' => ['path' => $path, 'filePath' => $filePath], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
        
        return response()->file($filePath);
    } catch (\Exception $e) {
        // #region agent log
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'K', 'location' => 'web.php:storage.serve', 'message' => 'error serving file', 'data' => ['path' => $path, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
        abort(404);
    }
})->where('path', '.*')->name('storage.serve');

Route::view('dashboard', 'dashboard')
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', Profile::class)->name('profile.edit');
    Route::get('settings/password', Password::class)->name('user-password.edit');
    Route::get('settings/appearance', Appearance::class)->name('appearance.edit');

    Route::get('settings/two-factor', TwoFactor::class)
        ->middleware(
            when(
                Features::canManageTwoFactorAuthentication()
                    && Features::optionEnabled(Features::twoFactorAuthentication(), 'confirmPassword'),
                ['password.confirm'],
                [],
            ),
        )
        ->name('two-factor.show');
    
    Route::get('beers', Index::class)->name('beers.index');
    Route::get('beers/create', Create::class)->name('beers.create');
    Route::get('beers/{beer}/edit', Update::class)
    ->name('beers.edit');


});
