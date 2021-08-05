var newman = require('newman');
const sql = require("msnodesqlv8");
newman.run({
    collection: require('../../../../collections/RegressionTests.json'),
    environment: require('../../../../environments/intg.json'),
    folder: ['RetrieveDocumentListAccountLevel'],
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/VaultClientServiceApi/VaultClient/RetrieveDocumentListAccountLevel_TestReport.html', logs: true, timezone: "Australia/Brisbane",
    browserTitle: "AI RetrieveDocumentListAccountLevel Test Report", title: "AI RetrieveDocumentListAccountLevel Test Dashboard", titleSize: 4}, 
	json: { export: './reports/json/VaultClientServiceApi/VaultClient/RetrieveDocumentListAccountLevel.json'}
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