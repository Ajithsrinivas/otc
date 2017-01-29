

/*var express = require('express'),
    employees = require('./routes/employees'),
    app = express();*/
var express = require('express'),
    employees = require('./routes/employees'),
    app = express(),
   https = require('https'),   
  fs = require('fs'); 
app.use(express.static('www')); 

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
/*app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});*/

/*app.get('/employees', employees.findAll);
app.get('/employees/:id', employees.findById);
app.get('/employees/:id/reports', employees.findReports);*/
/* var options = {
  key: fs.readFileSync('server1.key'),
  cert: fs.readFileSync('server1.crt'),
passphrase: '1234'
};

 var httpsServer = https.createServer(options, app);

httpsServer.listen(3000,'192.168.0.127',function (){

});*/

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
