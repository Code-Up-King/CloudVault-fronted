<template>
    <div>
        我是{{ $route.meta.title }}
    </div>
</template>

<script setup>
const route = useRoute()
</script>

<style lang="scss" scoped>

</style>