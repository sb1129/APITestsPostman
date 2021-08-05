var newman = require('newman');
var fs =require('fs-extra');
const sql = require("msnodesqlv8");
var findRemove = require('find-remove');
const destIN = '\\\\uat-specfs-01\\spectra_files_uat2\\tech1\\nas\\in';
const destOUT = '\\\\uat-specfs-01\\spectra_files_uat2\\tech1\\nas\\nas_staging\\out_staging'
const src = process.cwd() + '\\samplefiles';

newman.run({
    collection: require('../../collections/RegressionTests.json'),
    environment: require('../../environments/intg.json'),
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/RegressionTests/RegressionTests_TestReport.html', logs: true, timezone: "Australia/Brisbane", 
    browserTitle: "AI Regression Test Report", title: "AI Regression Test Dashboard", titleSize: 4}, 
	json: { export: './reports/json/RegressionTests/RegressionTests.json'},
	},
    insecure: true, 
    timeout: 18000000,
    delayRequest: 1000
}).on('start', function (err, args) { 
    console.log('running a collection...');

	console.log('Copying IN Test files from '+ src + ' to ' + destIN + ' ...');
	fs.copySync(src, destIN,{overwrite: true}, err => {
	if(err) return console.error(err);
	});

    console.log('Copying OUT Test files from '+ src + ' to ' + destOUT + ' ...');
	fs.copySync(src, destOUT,{overwrite: true}, err => {
	if(err) return console.error(err);
	});

    const connectionString = "server=TS-AGL-ODS;Database=ODS_UAT2_CUSTOM;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
    const query = "Delete FROM [ODS_UAT2_CUSTOM].[Rc].[CALL_LOG] ";
 
    sql.query(connectionString, query, (err, rows) => {
        console.log("Rows Deleted");
    });
}).on('beforeDone', function (err, args) {
	console.log('Removing files from IN ' + destIN + '....');
	var result = findRemove(destIN, {prefix: 'test'})
	console.log('Removed all the files from ' + destIN );

    console.log('Removing files from OUT ' + destOUT + '....');
	var result = findRemove(destOUT, {prefix: 'test'})
	console.log('Removed all the files from ' + destOUT );
	
}).on('done', function (err, summary) {
    const connectionString = "server=TS-AGL-ODS;Database=ODS_UAT2_CUSTOM;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
    const query = "Delete FROM [ODS_UAT2_CUSTOM].[dbo].[MicroService.VAULT_TEMPLATES] where TEMPLATE_ID Like 'Test%' Delete from [ODS_UAT2_CUSTOM].[dbo].[CCM_ACTIONS_HISTORY]where CLIENT_ID = '807964501' Delete From [ODS_UAT2_CUSTOM].[dbo].[CCM_ACTIONS] where CLIENT_ID = '807964501' Delete FROM [ODS_UAT2_CUSTOM].[MicroService].[PYS_INSURANCE_OPT_IN] where ACCOUNT_NUMBER in('100001234','100002222') Delete FROM [ODS_UAT2_CUSTOM].[MicroService].[PYS_INSURANCE_OPT_IN] where ACCOUNT_NUMBER in('100001234','100002222')";

    sql.query(connectionString, query, (err, rows) => {
        console.log("Rows Deleted");
    });
    
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
});
