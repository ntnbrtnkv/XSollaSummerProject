<template>
    <div id="fav-drugs" class="fav-drugs">
        <h2 class="fav-drugs__title">Избранные препараты</h2>

        <div class="fav-drugs__container">
            <template v-if="getFavDrugsList.length > 0">
                <card v-for="drug in getFavDrugsList" :key="drug.id" :drug="drug"></card>
            </template>
            <h3 v-else class="fav-drugs__empty-message">Сейчас тут пусто...</h3>
        </div>
    </div>
</template>

<script>
    import Card from './card.vue';

    export default {
        components: {
            Card
        },

        computed: {
            getFavDrugsList() {
                return this.$store.state.favDrugsList;
            }
        }
    }
</script>
