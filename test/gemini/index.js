gemini.suite('index', (suite) => {
    suite.setUrl('/')
        .setCaptureElements(['.search-panel', '.fav-drugs'])
        .before(function (actions, find) {
            this.input = find('.search-panel__input')
        })
        .capture('search-panel')
        .capture('focused', function (actions, find) {
            actions.click(this.input);
        })
        .capture('input', function (actions, find) {
            actions.sendKeys(this.input, "q");
            actions.wait(1500);
            this.id = 2817
        })
        .capture('added', function (actions, find) {
            actions.click("#search-result-" + this.id);
        })
        .capture('hover-card', function (actions, find) {
            actions.mouseMove("#drug-card-" + this.id);
        })
        .capture('hover-card-close-button', function (actions, find) {
            actions.mouseMove("#drug-card-" + this.id + " .drug-card__delete");
        });
});

