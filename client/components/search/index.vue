<template>
      <div :class="['search-panel', {'search-panel_searching': isSearching}]">
            <InputComponent></InputComponent>
            <Results></Results>
      </div>
</template>

<script>
//      import Results from './results/index';
//      import InputComponent from './input';

      const Results = () => import('./results/index');
      const InputComponent = () => import('./input');

      export default {
            components: {
                  Results,
                  InputComponent
            },

            computed: {
                  isSearching() {
                        return this.$store.state.isSearching;
                  }
            }
      }
</script>

