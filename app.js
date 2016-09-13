var express = require('./config/express'),
    mongoose = require('./config/mongoose')

var db = mongoose();
var app = express();
const path = require('path')

//set up ports based on env
// app.get('/dashboard/*', function (request, response) {
  // response.sendFile(path.resolve(__dirname, 'app/views/pages', 'index.ejs'))
  // response.render('pages/dashboard')
// })

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('live on ', app.get('port'));
});

//export for jasmine test
module.exports = app;
