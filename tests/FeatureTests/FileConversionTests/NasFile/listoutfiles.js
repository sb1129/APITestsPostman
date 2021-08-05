var newman = require('newman');
var fs =require('fs-extra');
var findRemove = require('find-remove');
const destOUT = '\\\\uat-specfs-01\\spectra_files_uat2\\tech1\\nas\\nas_staging\\out_staging'
const src = process.cwd() + '\\samplefiles';

newman.run({
    collection: require('../../../../collections/RegressionTests.json'),
    environment: require('../../../../environments/intg.json'),
    folder: ["ListOutFiles"],
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/FileConversion/Nasfile/ListOutFiles_TestReport.html', logs: true, timezone: "Australia/Brisbane",
    browserTitle: "AI ListOutFiles Test Report", title: "AI ListOutFiles Test Dashboard", titleSize: 4}, 
	json: { export: './reports/json/FileConversion/Nasfile/ListOutFiles.json'}
	},
    insecure: true, 
    timeout: 180000,
    delayRequest: 800
}).on('start', function (err, args) { 
    console.log('running a collection...');

	console.log('Copying OUT Test files from '+ src + ' to ' + destOUT + ' ...');
	fs.copySync(src, destOUT,{overwrite: true}, err => {
	if(err) return console.error(err);
	});
	
}).on('beforeDone', function (err, args) {
	
	console.log('Removing files from OUT ' + destOUT + '....');
	var result = findRemove(destOUT, {prefix: 'test'})
	console.log('Removed all the files from ' + destOUT );
}).on('done', function (err, summary) {
	
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
});