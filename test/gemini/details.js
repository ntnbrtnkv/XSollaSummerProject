gemini.suite('details', (suite) => {
    gemini.suite('no-found', (suite) => {
        suite.setUrl('/drug/-1')
            .setCaptureElements('.content')
            .capture('drug-details');
    });

    gemini.suite('drug1', (suite) => {
        suite.setUrl('/drug/1')
            .setCaptureElements('.content')
            .capture('drug-details')
            .capture('hover-back-link', function(actions, find) {
                actions.mouseMove('.button-router')
            });
    });
});
