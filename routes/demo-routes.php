<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/streaming-comparison', function () {
    return Inertia::render('stream-demo');
});

Route::post('/api/text-stream', function () {

    return response()->stream(function () {
        $text = "Once upon a time, there was a developer who discovered Laravel and their life changed forever. No more spaghetti code, no more reinventing the wheel, no more spending hours on authentication systems. With Laravel, controllers became elegant, models became expressive, and migrations became a joy to write. The developer could finally focus on building amazing features instead of fighting with framework quirks. And they lived happily ever after, shipping clean code and meeting deadlines. The end.";
        $words = explode(' ', $text);
        foreach ($words as $word) {
            echo $word . ' ';
            ob_flush();
            flush();
            usleep(100000); // 100ms delay between words
        }
    }, 200, [
        'Cache-Control' => 'no-cache',
        'Content-Type' => 'text/event-stream',
        'X-Accel-Buffering' => 'no'
    ]);
});
