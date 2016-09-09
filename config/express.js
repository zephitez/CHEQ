var config         = require('./config'),
      express        = require('express'),
      morgan         = require('morgan'),
      compress       = require('compression'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override'),
      passport       = require('passport'),
      flash          = require('connect-flash'),
      cookieParser   = require('cookie-parser'),
      session        = require('express-session'),
      expressLayouts = require('express-ejs-layouts');

module.exports = function(){
  var app = express();


  //set npm for logging or compression depending on env
  if(! process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production'){
    app.use(compress());
  }

  //for request parsing
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());

  //for passport
  require('../config/passport')(passport);
  app.use(cookieParser());
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.set('views', './app/views/');
  app.use(express.static('./public'));
  app.use(session({ secret: '$$$' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session


  //require routes

  require('../app/routes/user.routes')(app, passport);


  //create routes for public folder
  app.use(express.static('./public'));

  return app;

};
