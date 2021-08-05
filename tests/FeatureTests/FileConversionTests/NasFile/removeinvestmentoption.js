var newman = require('newman');
var fs = require('fs');
var path = require('path');

newman.run({
    collection: require('../../../../collections/RegressionTests.json'),
    environment: require('../../../../environments/intg.json'),
    folder: ["RemoveInvestmentOption"],
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/FileConversion/Nasfile/RemoveInvestmentOption_TestReport.html', logs: true, timezone: "Australia/Brisbane",
    browserTitle: "AI RemoveInvestmentOption Test Report", title: "AI RemoveInvestmentOption Test Dashboard", titleSize: 4}, 
	json: { export: './reports/json/FileConversion/Nasfile/RemoveInvestmentOption.json'}
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