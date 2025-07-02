<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Prism\Prism\Prism;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/editor', function () {
    return Inertia::render('editor');
});

function getPrompt(mixed $targetLang, mixed $code): string
{
    return <<<EOT
        Translate this PHP code to $targetLang code.
        Only output the translated code, no explanations.
        Keep the same functionality and use idiomatic $targetLang conventions.

        Here's the PHP code:
        $code
        EOT;
}

function createStreamedResponse($stream): \Symfony\Component\HttpFoundation\StreamedResponse
{
    return response()->stream(function () use ($stream) {
        foreach ($stream as $chunk) {
            if ($chunk->text) {
                echo $chunk->text;
                ob_flush();
                flush();
            }
        }
    }, 200, [
        'Cache-Control' => 'no-cache',
        'Content-Type' => 'text/event-stream',
        'X-Accel-Buffering' => 'no'
    ]);
}

Route::post('/stream', function () {
    $code = request()->input('code');
    $targetLang = request()->input('targetLang');

    $prompt = getPrompt($targetLang, $code);

    $stream = Prism::text()
        ->using('openai', 'gpt-4')
        ->withPrompt($prompt)
        ->asStream();

    return createStreamedResponse($stream);
});

require __DIR__ . '/demo-routes.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
