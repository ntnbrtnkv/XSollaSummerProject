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
                const nbsp = '\xa0';
                const names = {
                    'global_name'  : 'Международное непатентованное наименование',
                    'name'         : 'Торговое наименование лекарственного препарата',
                    'form'         : `Лекарственная${nbsp}форма, дозировка, упаковка${nbsp}(полная)`,
                    'company'      : `Владелец${nbsp}РУ/производитель/упаковщик/Выпускающий${nbsp}контроль`,
                    'limit_price'  : `Предельная${nbsp}цена (без${nbsp}НДС)`,
                    'reg_date'     : `Дата${nbsp}регистрации${nbsp}цены (№${nbsp}решения)`,
                };
                return names;
            },

            getCurrentDrug() {
                return this.$store.state.currentDrug;
            },

            canGetCurrentDrug() {
                const currentDrug = this.getCurrentDrug;
                return !!currentDrug && Object.keys(currentDrug).length !== 0;
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
