<template>
    <div class="drug-details">
        <div class="drug-details__content">
            <template v-if="canGetCurrentDrug">
                <h2 class="drug-details__title">Информация о препарате</h2>
                <div v-if="canGetCurrentDrug" class="drug-table">
                    <Row v-for="field in getFiledsList" :key="field" :rowInfo="getRowInfoByFiled(field)"></Row>
                </div>
            </template>
            <h2 v-else class="drug-details__empty_message">
                Не удалось найти препарат :(
            </h2>
        </div>
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

            canGetCurrentDrug() {
                return !!this.getCurrentDrug;
            }
        },

        mounted() {
            this.$store.commit(MutationTypes.SET_DRUG_BY_ID, +this.$route.params.drugId);
        },

        methods: {
            getNameForField: function(field) {
                const names = this.getNames;
                return names[field];
            },

            getRowInfoByFiled: function(field) {
                const drug = this.getCurrentDrug;
                const rowInfo = {
                    field        : this.getNameForField(field),
                    description  : this.getCurrentDrug[field]
                };
                if (field === 'limit_price')
                    rowInfo.description = this.$options.filters.ru_currency(rowInfo.description);
                return rowInfo;
            }
        }
    }
</script>
