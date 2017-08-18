gemini.suite('details', (suite) => {
    gemini.suite('no-found', (suite) => {
        suite.setUrl('/drug/-1')
            .setCaptureElements('.drug-details')
            .capture('drug-details');
    });

    gemini.suite('drug1', (suite) => {
        suite.setUrl('/drug/1')
            .setCaptureElements('.drug-details')
            .capture('drug-details');
    });
});
