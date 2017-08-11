<template>
    <div class="page">
        <h1 class="page__title">Информация о препарате</h1>
        <DrugInfo :drugId="getId"></DrugInfo>
    </div>
</template>

<script>
    import DrugInfo from './../components/drug-info/index';

    export default {
        components: {
            DrugInfo
        },

        computed: {
            getId() {
                return this.$route.params.drugId;
            }
        }
    }
</script>

