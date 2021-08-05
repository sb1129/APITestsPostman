var newman = require('newman');
const sql = require("msnodesqlv8");
newman.run({
    collection: require('../../../collections/RegressionTests.json'),
    environment: require('../../../environments/intg.json'),
    folder: ['SyncCompanyCallLogs'],
    reporters: ['htmlextra','cli','json'],
    reporter : { 
	htmlextra : { export : './reports/html/RingCentral/SyncCompanyCallLogs_TestReport.html', logs: true, timezone: "Australia/Brisbane",
    browserTitle: "AI SyncCompanyCallLogs Test Report", title: "AI SyncCompanyCallLogs Test Dashboard", titleSize: 4}, 
	json: { export: './reports/json/RingCentral/SyncCompanyCallLogs.json'}
	},
    insecure: true, 
    timeout: 1800000,
    delayRequest: 1500
}).on('start', function (err, args) { 
    console.log('running a collection...');

}).on('done', function (err, summary) {
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
}).on('beforeItem', function(err,args){
    const connectionString = "server=TS-AGL-ODS;Database=ODS_UAT2_CUSTOM;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
    const query = "Delete FROM [ODS_UAT2_CUSTOM].[Rc].[CALL_LOG]";
 
    sql.query(connectionString, query, (err, rows) => {
        console.log("Rows Deleted");
    });
});