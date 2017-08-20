<template>
      <div :class="['search-panel', {'search-panel_searching': isSearching}]">
            <InputComponent></InputComponent>
            <Results></Results>
      </div>
</template>

<script>
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

