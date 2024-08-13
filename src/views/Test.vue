<template>
    <div>
        我是{{ $route.meta.title }}
    </div>
</template>

<script setup>
const route = useRoute()

console.log(route);
</script>

<style lang="scss" scoped>

</style>