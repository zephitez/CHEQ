//load the things we need
var LocalStrategy = require('passport-local').Strategy;

//load user model
var User = require('../app/models/user');



//expose this function to our app
module.exports = function(passport) {

  //passport session setup
  //required for persistent login
  //passport needs ability to serialize and unserialize users out of session

  //used to serialize the user for session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  //used to DE-serialize the user for session
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //local signup
  //we are using named strategies since we have one for login and one for signup
  passport.use('local-signup', new LocalStrategy({
      //by default, local strategy uses username and pwd, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true //allows us to pass back entire request to the callback
    },
    function(req, email, password, done) {
      //asynchronous
      //User.findOne won't fire unless data is sent back
      process.nextTick(function() {
        User.findOne({
          'local.email': email
        }, function(err, user) {
          //if error return error
          if (err) return done(err);
          //check if theres user with that email
          if (user) {
            return done(null, false, req.flash('signupMessage', 'Someone use this email liao'));
          } else {

            //create LocalStrategy
            var newUser = new User();

            //set local credentials

            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            //save it

            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser, req.flash('authMessage', 'WELCOME to jiak simi sai!'));
            });
          }

        });

      });

    }));

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({
        'local.email': email
      }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
          return done(err);

        // if no user is found, return the message
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No such user leh.. sorry')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Hehehe.. wrong password ')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user, req.flash('authMessage', 'Welcome Back..shiok sia'));
      });

    }));
}
