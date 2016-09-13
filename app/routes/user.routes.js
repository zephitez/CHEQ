var userController = require('../controllers/userController');

module.exports = function(app, passport) {

  //-------- Dashboard --------//
  app.route('/dashboard')
    .get(isLoggedIn, userController.dashboard);

  app.route('/dashboard/*')
    .get(isLoggedIn, userController.reactDashboard);

  //-------- Transaction --------//
  app.route('/dashboard')
    .post(isLoggedIn, userController.createTransaction);

  //-------- Sign Up --------//
  app.route('/signup')
  .get(userController.signup);

  app.route('/signup')
  .post(passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  //-------- Login --------//
  app.route('/login')
  .get(userController.login);

  app.route('/login')
  .post(passport.authenticate('local-login', {
    successRedirect: '/dashboard', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  //-------- Facebook --------//
  app.route('/auth/facebook')
  .get(passport.authenticate('facebook', {
    scope: ['user_friends', 'email', 'public_profile']
  }));

  app.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', {
            successRedirect : '/dashboard',
            failureRedirect : '/'
  }));

  //-------- Linking Facebook to Local --------//
  app.route('/connect/facebook')
  .get(passport.authorize('facebook', {
    scope: ['user_friends', 'email', 'public_profile']
  }));

  app.route('/connect/facebook/callback')
  .get(passport.authorize('facebook', {
          successRedirect : '/dashboard',
          failureRedirect : '/'
  }));


  //-------- Unlinking Facebook --------//
  app.route('/unlink/facebook')
  .get(isLoggedIn, userController.unlink);

  //------- Log out users -----------------//
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
//
};


//-------- Check if its logged in -------//
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  //if not auth then redirect to homepage
  res.redirect('/');
}
