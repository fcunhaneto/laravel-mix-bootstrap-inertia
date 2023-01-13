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
