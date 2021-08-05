var newman = require('newman');
var fs =require('fs-extra');
var findRemove = require('find-remove');
const destIN = '\\\\uat-specfs-01\\spectra_files_uat2\\tech1\\nas\\in';
const src = process.cwd() + '\\samplefiles';

newman.run({
    collection: require('../../../../collections/RegressionTests.json'),
    environment: require('../../../../environments/intg.json'),
    folder:["ListInFile"],
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/FileConversion/Nasfile/ListInFiles_TestReport.html', logs: true, timezone: "Australia/Brisbane",
    browserTitle: "AI ListInFiles Test Report", title: "AI ListInFiles Test Dashboard", titleSize: 4}, 
	json: { export: './reports/json/FileConversion/Nasfile/ListInFiles_TestReport.json'}
	},
    insecure: true, 
    timeout: 180000,
    delayRequest: 800
}).on('start', function (err, args) { 
    console.log('running a collection...');
	console.log('Copying IN Test files from '+ src + ' to ' + destIN + ' ...');

	fs.copySync(src, destIN,{overwrite: true}, err => {
	if(err) return console.error(err);
	});


}).on('beforeDone', function (err, args) {
	console.log('Removing files from IN ' + destIN + '....');
	var result = findRemove(destIN, {prefix: 'test'})
	console.log('Removed all the files from ' + destIN );
	
}).on('done', function (err, summary) {
	
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
});