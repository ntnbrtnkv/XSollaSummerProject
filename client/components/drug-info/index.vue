<template>
    <div class="drug-table">
         <Row v-for="field in getFiledsList" :rowInfo="getRowInfoByFiled(field)"></Row>
    </div>
</template>

<script>
    import MutationTypes from './../../store/mutation-types';
    import Row from './row';

    export default {
        props: [
            'drugId'
        ],

        components: {
            Row
        },

        computed: {
            getFiledsList() {
                return ['global_name', 'name', 'form', 'company', 'limit_price', 'reg_date'];
            },

            getNames() {
                const names = {
                    'global_name'  : 'Международное название',
                    'name'         : 'Название',
                    'form'         : 'Форма выпуска',
                    'company'      : 'Выпускающая компания',
                    'limit_price'  : 'Предельная цена',
                    'reg_date'     : 'Дата регистрации',
                };
                return names;
            },

            getCurrentDrug() {
                return this.$store.state.currentDrug;
            },


        },

        mounted() {
            this.$store.commit(MutationTypes.SET_DRUG_BY_ID, +this.$route.params.drugId);
            // this.$store.dispatch('loadForecast');
        },

        methods: {
            getNameForField: function(field) {
                const names = this.getNames;
                return names[field];
            },

            getRowInfoByFiled: function(field) {
                console.log(field);
                const drug = this.getCurrentDrug;
                const rowInfo = {
                    field        : this.getNameForField(field),
                    description  : this.getCurrentDrug[field]
                };
                console.log(rowInfo);
                return rowInfo;
            }
        }
    }
</script>
