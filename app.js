var express = require('./config/express'),
    mongoose = require('./config/mongoose')

var db = mongoose();
var app = express();

//set up ports based on env
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('live on ', app.get('port'));
});

//export for jasmine test
module.exports = app;
