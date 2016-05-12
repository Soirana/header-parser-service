var express = require('express');
var useragent = require('useragent');
var fs = require('fs');

var app = express();
var html = fs.readFileSync('index.html');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(html);
});
	
app.get('/whoami', function(request,response) {
	var agent = useragent.parse(request.headers['user-agent']);

	var temp = request.headers['x-forwarded-for'];
	var ip;
	if (temp){
		ip = temp.split(",")[0];
	} else{

	 ip = request.connection.remoteAddress || 
     request.socket.remoteAddress ||
     request.connection.socket.remoteAddress;
 }

	response.json ({
		ipaddress: ip,
		language: request.headers["accept-language"].split(",")[0],
		software: agent.os.family
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});