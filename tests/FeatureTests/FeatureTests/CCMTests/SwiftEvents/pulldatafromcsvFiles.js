var newman = require('newman');

newman.run({
    collection: require('../../../../collections/RegressionTests.json'),
    environment: require('../../../../environments/intg.json'),
    folder: ["PullDataFromCsvFiles"],
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/CCM/SwiftEvents/PullDataFromCsvFiles_TestReport.html', logs: true, timezone: "Australia/Brisbane",
    browserTitle: "AI PullDataFromCsvFiles Test Report", title: "AI PullDataFromCsvFiles Test Dashboard", titleSize: 4}, 
	json: { export: './reports/json/CCM/SwiftEvents/PullDataFromCsvFiles_TestReport.json'}
	},
    insecure: true, 
    timeout: 180000,
    delayRequest:800 
}).on('start', function (err, args) { 
    console.log('running a collection...');

}).on('done', function (err, summary) {
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
});
