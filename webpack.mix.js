const mix = require('laravel-mix');

mix.vue()
    .js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps()
    .alias({
        '@': 'resources/js',
    });
