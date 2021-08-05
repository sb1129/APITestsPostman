var newman = require('newman');
var fs = require('fs');
var path = require('path');


newman.run({
    collection: require('../../collections/SmokeTests.json'),
    environment: require('../../environments/intg.json'),
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/SmokeTests/SmokeTests_TestReport.html', logs: true, timezone: "Australia/Brisbane",
    browserTitle: "AI Smoke Test Report",title: "AI Smoke Test Dashboard",
    titleSize: 4 }, 
	json: { export: './reports/json/SmokeTests/SmokeTests.json'},

	},
    insecure: true, 
    timeout: 1800000,
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