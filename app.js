var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var xmlParser = require('express-xml-bodyparser');

var routes = require('./routes/index');
var obm = require('./routes/outboundmsg');

var app = express();
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// BEGIN - Read XML directly
app.use(bodyParser.text({type: '*/*'}));
app.post('/outboundmsg', function(req, res, next) {
    console.log(req.body);
    res.sendStatus(200);
});
// END - Read XML directly

// BEGIN - Read XML as JSON
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(xmlParser());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/outboundmsg', xmlParser(), obm);
// END - Read XML as JSON

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
