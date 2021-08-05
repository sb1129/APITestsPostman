var newman = require('newman');
var fs = require('fs');
var path = require('path');

newman.run({
    collection: require('../../../../collections/RegressionTests.json'),
    environment: require('../../../../environments/intg.json'),
    folder: ["PmifInsurance_DeleteAgedPmifInsuranceOptIn"],
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/LGIAInternalSonataHelperV2/PmifInsurance/DeleteAgedPmifInsuranceOptIn_TestReport.html', logs: true, timezone: "Australia/Brisbane",
    browserTitle: "AI DeleteAgedPmifInsuranceOptIn Test Report", title: "AI DeleteAgedPmifInsuranceOptIn Test Dashboard", titleSize: 4}, 
	json: { export: './reports/json/LGIAInternalSonataHelperV2/PmifInsurance/DeleteAgedPmifInsuranceOptIn_TestReport.json'}
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