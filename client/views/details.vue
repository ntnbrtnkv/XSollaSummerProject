<template>
    <div class="content">
        <DrugInfo :drugId="getId"></DrugInfo>
    </div>
</template>

<script>
    import DrugInfo from '../components/drug-details/index';

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

