//load the things we need
var LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy;

//load user model
var User = require('../app/models/user');

//load the auth variable
var configAuth = require('./auth');

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

//---------------- Local Sign Up -------------------//
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
          'local.email' :  email
        },  function(err, existingLocalUser) {

                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if there's already a user with that email
                if (existingLocalUser) {
                    return done(null, false, req.flash('signupMessage', 'This email already exist in our database.'));
                  } else {
                //  If we have facebook email, we will link up local
                    User.findOne({
                     'facebook.email': email
                   }, function(err, existingFacebookUser) {
                      if (err) throw err;

                     if (existingFacebookUser) {
                     var user            = existingFacebookUser;
                     user.local.email    = email;
                     user.local.password = user.generateHash(password);
                     user.save(function(err) {
                         if (err) throw err;
                         return done(null, user, req.flash('authMessage', 'Now you can login using email and password too!'));
                     });
                   } else {
                       // No facebook user or user found, create the user
                       let newUser            = new User();

                       newUser.local.email    = email;
                       newUser.local.password = newUser.generateHash(password);

                       newUser.save(function(err) {
                           if (err) throw err;
                           return done(null, newUser, req.flash('authMessage', 'WELCOME to CHEQ!'));
                       });
                   }})}
            });
        });
    }));

//---------------- Local Login -------------------//
passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email },
            function(err, user) {
                // if there are any errors, return the error
                if (err) {
                  return next(err);
                }
                  // if no user is found, return the message
                if (!user) {
                  //  If we have facebook email, we will link up local

                    User.findOne({
                     'facebook.email': email
                   },
                   function(err, existingFacebookUser) {
                      if (err) return next(err);

                     if (existingFacebookUser) {
                        let user            = existingFacebookUser;
                        user.local.email    = email;
                        user.local.password = user.generateHash(password);
                        user.save(function(err) {
                            if (err) throw err;

                            return done(null, user, req.flash('authMessage', 'Now you can login using email and password too!'));
                        });

                     } else {
                       return done(null, false, req.flash('loginMessage', 'No user found.'));
                     }
                   })
                 }

                if (user) {
                 if (user.validPassword(password)) {
                   // all is well, return user
                   return done(null, user);
                 } else {
                   return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                 }
              }
            });
        });
    }));

//---------------- Facebook Login -------------------//
passport.use(new FacebookStrategy({

      // pull in our app id and secret from our auth.js file
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
      profileFields: ['id', 'displayName', 'picture', 'email', 'friends'],
      passReqToCallback: true //pass in the req from our route (lets us check if a user is logged in or not)
    },

    // facebook will send back the token and profile
    function(req, token, refreshToken, profile, done) {


      // asynchronous
      process.nextTick(function() {

        //check if user is logged in
        if (!req.user) {

        // find the user in the database based on their facebook id
        User.findOne({ $or: [{'facebook.id': profile.id}, {'local.email': profile.emails[0].value} ]
      },
        // User.findOne({
        //   'facebook.id': profile.id
        // },
        function(err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);

          // if the user is found, then log them in
          if (user) {
            // if there is a user id already but no token (user was linked at one point and then removed)
            // just add our token and profile information
            if (!user.facebook.token) {
              user.facebook.token = token;
              user.facebook.name = profile.displayName;
              user.facebook.email = profile.emails[0].value;
              user.facebook.photo = profile.photos[0].value;
              user.facebook.friends = profile._json.friends.data.map(function(friend) {
                      var outputBody = friend.name;
                      return outputBody;
              });

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
              }
            return done(null, user); // user found, return that user

            } else {
            // if there is no user found with that facebook id, create them
            let newUser = new User();

            // set all of the facebook information
            newUser.facebook.id = profile.id; // set the users facebook id
            newUser.facebook.token = token; //save the token that facebook provides to the user
            newUser.facebook.name = profile.displayName;
            newUser.facebook.email = profile.emails[0].value;
            newUser.facebook.photo = profile.photos[0].value;
            newUser.facebook.friends = profile._json.friends.data.map(function(friend) {
                    var outputBody = friend.name;
                    return outputBody;
            });

            // save our user to the database
            newUser.save(function(err) {
              if (err)
                throw err;

              // if successful, return the new user
              return done(null, newUser, req.flash('authMessage', 'WELCOME to CHEQ!'));
            });
          }

        });

    } else {

// user already exists and is logged in, we have to link accounts
    let user = req.user; // pull user from session

     // update the current users facebook credentials
     user.facebook.id = profile.id;
     user.facebook.token = token;
     user.facebook.name = profile.displayName;
     user.facebook.email = profile.emails[0].value;
     user.facebook.photo = profile.photos[0].value;
     user.facebook.friends = profile._json.friends.data.map(function(friend) {
             var outputBody = friend.name;
             return outputBody;
     });

     // save the user
      user.save(function(err) {
          if (err)
              throw err;
          return done(null, user);
      });
    }
      });

    }));




};
