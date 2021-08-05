var newman = require('newman');
var fs = require('fs');
var path = require('path');

newman.run({
    collection: require('../../../../collections/RegressionTests.json'),
    environment: require('../../../../environments/intg.json'),
    folder: ["SyncInteractionsFromEngageOne"],
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/CCM/Correspondence/SyncInteractionsFromEngageOne_TestReport.html', logs: true, timezone: "Australia/Brisbane",
    browserTitle: "AI SyncInteractionsFromEngageOne Test Report", title: "AI SyncInteractionsFromEngageOne Test Dashboard", titleSize: 4 }, 
	json: { export: './reports/json/CCM/Correspondence/SyncInteractionsFromEngageOne_TestReport.json'}
	},
    insecure: true, 
    timeout: 180000, 
    delayRequest: 800
}).on('start', function (err, args) { 
    console.log('running a collection...');
    var date = new Date().toISOString().slice(0, 10);
	const folder = '\\\\uat-specfs-01\\spectra_files_uat2\\docmgmt\\corro\\CCM_JRN_ARCHIVE\\' + date;
    console.log(folder);
	fs.mkdirSync(folder,{ recursive: true }, (err) => {
	if (err) {
		return console.error(err);
	}
		console.log(folder + ' Directory created successfully!');
	});
}).on('done', function (err, summary) {
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
});
