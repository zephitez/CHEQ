var User = require('../models/user'),
    Transaction = require('../models/transaction');

module.exports = function(app, passport) {

  app.get('/dashboard', isLoggedIn, function(req, res) {
    res.render('pages/user/user', {
      title: 'Profile',
      message: req.flash('authMessage'),
      user: req.user //get the user out of  session and pass to template
    });
  });

  app.post('/dashboard', isLoggedIn, function(req, res) {

    var firstUser = req.user

    User.findOne({
        'facebook.name': req.body.friend
      }, function(err, secondUser) {


        if (err) return done(err);

        if (secondUser) {

          var primaryTransaction = new Transaction();
          var secondaryTransaction = new Transaction();

          primaryTransaction.first_user = firstUser._id;
          primaryTransaction.second_user = secondUser._id;

          primaryTransaction.amount = req.body.amount;

          primaryTransaction.item = req.body.item;


          primaryTransaction.save(function(err, transaction){
            if (err) throw err;

            firstUser.transactions.push(transaction._id);
            firstUser.save(function(err) {
              if (err) throw err;
            });
            console.log(firstUser);
          });

          secondaryTransaction.first_user = secondUser._id;
          secondaryTransaction.second_user = firstUser._id;

          secondaryTransaction.amount = -req.body.amount;
          secondaryTransaction.item = req.body.item;

          secondaryTransaction.save(function(err, transaction){
            if (err) throw err;

            secondUser.transactions.push(transaction._id);
            secondUser.save(function(err) {
              if (err) throw err;
            });
            console.log(secondUser);
          });
        }
      });











  });


  //show signup forms
  app.get('/signup', function(req, res) {
    //render the page and pass in any flash stuff
    res.render('pages/user/signup', {
      title: 'Sign Up',
      message: req.flash('signupMessage'),
    });
  });

  //process the signup forms
  app.post('/signup',  passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
  }));


  //show login form
  app.get('/login', function(req, res) {
    res.render('pages/user/login', {
      title: 'Login',
      message: req.flash('loginMessage'),
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

//---------- Facebook Routing ---------------------//

  app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['user_friends', 'email', 'public_profile'] }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect : '/dashboard',
          failureRedirect : '/'
      }));




//------------- Authorize (already logged in / connecting to fb) ------------//

//local

// locally --------------------------------
        app.get('/connect/local', isLoggedIn, function(req, res) {
            res.render('pages/user/connect-local', { title: 'Connect Local', message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope: ['user_friends', 'email', 'public_profile'] }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/dashboard',
                failureRedirect : '/'
            }));



//---------------- Unlinking Accounts -----------------//
// 1. for social accounts, just remove the token
// 2. for local account, remove email and password
// Note: user account will stay active in case they want to reconnect in the future

// local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/dashboard');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/dashboard');
        });
    });


  //------- Log out users -----------------//
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};


//-------- Check if its logged in -------//
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  //if not auth then redirect to homepage
  res.redirect('/');
}
