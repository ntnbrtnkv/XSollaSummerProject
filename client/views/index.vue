<template>
    <div class="content">
        <SearchComponent></SearchComponent>
        <FavDrugsComponent></FavDrugsComponent>
    </div>
</template>

<script>
    import FavDrugsComponent from './../components/fav-drugs/index';
    import SearchComponent from './../components/search/index';

    export default {
        components: {
            FavDrugsComponent,
            SearchComponent
        }
    }
</script>

