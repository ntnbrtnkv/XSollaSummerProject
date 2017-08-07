<template>
    <div class="search-panel">
          <div class="search-panel__filler"></div>
          
          <div class="search-panel__search-line">
            <i class="fa fa-search search-panel__icon" aria-hidden="true"></i>
            <input class="search-panel__input"
                  type="search"
                  placeholder="Поиск лекарства">
          </div>

          <div id="search-panel__results" class="drug-table search-panel__results search-panel__results_invisible ">
          </div>
    </div>
</template>
