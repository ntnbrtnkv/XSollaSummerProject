export default {
    render(h) {
        return (
            <div class="app">
                <div class="page">
                    <div class="page__title__container">
                        <router-link class="page__back-link" to="/"><h1 class="page__title__text">Pharmacy</h1></router-link>
                    </div>
                    <router-view></router-view>
                </div>
            </div>
        );
    }
}