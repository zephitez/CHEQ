//load the things we need
var LocalStrategy = require('passport-local').Strategy;

//load user model
var User = require('../app/models/user');

//expose passport to our app.js
module.exports = function(passport) {

//--------  setting up passport  ------------//
  //required for persistent login

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //local signup
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {

      //asynchronous
      //User.findOne won't fire unless data is sent back
      process.nextTick(function() {
        User.findOne({
          'email': email
        }, function(err, user) {

          //if error return error
          if (err) return done(err);

          //check if theres user with that email
          if (user) {
            return done(null, false, req.flash('signupMessage', 'Someone use this email liao'));
          }  else {

            //create LocalStrategy
            var newUser = new User();

            //set local credentials
            newUser.username = req.body.username;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);

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
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({
        'email': email
      }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
          return done(err);

        // if no user is found, return the message
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No such user leh.. sorry'));
          // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Hehehe.. wrong password ')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user, req.flash('authMessage', 'Welcome Back..shiok sia'));
      });

    }));
};
