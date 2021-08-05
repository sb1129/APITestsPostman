var newman = require('newman');

newman.run({
    collection: require('../../../../collections/RegressionTests.json'),
    environment: require('../../../../environments/intg.json'),
    folder:["ListFolders"],
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/Swift/SwiftFolderConfiguration/ListFolders_TestReport.html', logs: true, timezone: "Australia/Brisbane",
    browserTitle: "AI ListFolders Test Report", title: "AI ListFolders Test Dashboard", titleSize: 4}, 
	json: { export: './reports/json/Swift/SwiftFolderConfiguration/ListFolders_TestReport.json'}
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
