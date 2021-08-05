var newman = require('newman');

newman.run({
    collection: require('../../../../collections/RegressionTests.json'),
    environment: require('../../../../environments/intg.json'),
    folder: ["SyncSwiftEventsToSfCampaigns"],
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/CCM/SwiftEvents/SyncSwiftEventsToSfCampaigns_TestReport.html', logs: true, timezone: "Australia/Brisbane",
    browserTitle: "AI SyncSwiftEventsToSfCampaigns Test Report", title: "AI SyncSwiftEventsToSfCampaigns Test Dashboard", titleSize: 4 }, 
	json: { export: './reports/json/CCM/SwiftEvents/SyncSwiftEventsToSfCampaigns_TestReport.json'}
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
