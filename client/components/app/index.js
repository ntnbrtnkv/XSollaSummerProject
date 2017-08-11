export default {
    render(h) {
        return (
            <div class="app">
                <div class="page">
                    <router-link class="page__back-link" to="/"><h1 class="page__title">Pharmacy</h1></router-link>
                    <router-view></router-view>
                </div>
            </div>
        );
    }
}