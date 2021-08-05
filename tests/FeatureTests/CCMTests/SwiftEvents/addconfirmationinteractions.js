var newman = require('newman');

newman.run({
    collection: require('../../../../collections/RegressionTests.json'),
    environment: require('../../../../environments/intg.json'),
    folder:["AddConfirmationInteractions"],
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/CCM/SwiftEvents/AddConfirmationInteractions_TestReport.html', logs: true, timezone: "Australia/Brisbane",
    browserTitle: "AI AddConfirmationInteractions Test Report", title: "AI AddConfirmationInteractions Test Dashboard", titleSize: 4}, 
	json: { export: './reports/json/CCM/SwiftEvents/AddConfirmationInteractions_TestReport.json'}
	},
    insecure: true, 
    timeout: 180000,
    delayRequest: 800

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
