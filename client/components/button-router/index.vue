<template>
    <router-link class="button-router" :to="href">
        <i :class="['button-router__icon', iconClasses]"></i>
        <span class="button-router__text">{{ text }}</span>
    </router-link>
</template>

<script>
    export default {
        props: {
            text: {
                default: 'На главную',
                type: String
            },
            href: {
                default: '/',
                type: String
            },
            iconClasses: {
                default: '',
                type: String
            },
        },
    }
</script>

