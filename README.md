# Laravel Mix Booststrap Inertia

## 1- Install laravel/ui and vue --auth

```
composer require laravel/ui

php artisan ui vue --auth

npm install
```

## 2- Install laravel-mix

```
npm install -D laravel-mix
```

## 3- Create file webpack.mix.js

```
const mix = require('laravel-mix');

mix.vue()
.js('resources/js/app.js', 'public/js')
.sass('resources/sass/app.scss', 'public/css')
.sourceMaps();
```

## 4- Delete vite.config.js

```
rm vite.config.js
```

## 5- Change package.json to:

```
{
    "private": true,
    "scripts": {
        "dev": "npm run development",
        "development": "mix",
        "watch": "mix watch",
        "watch-poll": "mix watch -- --watch-options-poll=1000",
        "hot": "mix watch --hot",
        "prod": "npm run production",
        "production": "mix --production"
    },
    "devDependencies": {
        "@popperjs/core": "^2.11.6",
        "axios": "^1.1.2",
        "bootstrap": "^5.2.3",
        "laravel-mix": "^6.0.49",
        "lodash": "^4.17.19",
        "postcss": "^8.1.14",
        "sass": "^1.56.1",
        "vue": "^3.2.37"
    }
}
```

## 6- Install Inertia [Serve-side](https://inertiajs.com/server-side-setup)

```
composer require inertiajs/inertia-laravel
 
php artisan inertia:middleware
```

Once generated, register the HandleInertiaRequests middleware in your App\Http\Kernel, as the last item in your web middleware group.

```
'web' => [
    // ...
    'web' => [
    // ...
    \App\Http\Middleware\HandleInertiaRequests::class,
],
```

## 7- Install Inertia [Client-side](https://inertiajs.com/client-side-setup)

```
npm install -D @inertiajs/inertia @inertiajs/inertia-vue3
```

## 8- Change app.js to:

```
import './bootstrap';

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'

createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .mount(el)
    },
})
```

## 9- Create file app.blade.php resources/views/

```
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    <script src="{{ mix('/js/app.js') }}" defer></script>

    <!-- Scripts -->
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
```

## 10- Create directory Pages under resources/js

## 11- In Pages directory create a Welcome.vue file:

```
<template>
    <Head title="Welcome">Hello</Head>
    <h1>Hello {{ name }}</h1>
</template>

<script setup>
import { Head } from '@inertiajs/inertia-vue3';

defineProps({
    name: String,
})
</script>

<style scoped>

</style>
```

## 12- In routes/web.php change:

```
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'name' => 'your-name'
    ]);
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
```

## 13- Test

```
npm run dev

php artisan serve
```


