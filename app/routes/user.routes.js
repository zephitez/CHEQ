
module.exports = function(app, passport) {


  app.get('/user', isLoggedIn, function(req, res) {
    res.render('pages/user/user', {
      title: 'Profile',
      message: req.flash('authMessage'),
      user: req.user //get the user out of  session and pass to template
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
    successRedirect: '/user',
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
    successRedirect: '/user', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));


  //Log out users
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
