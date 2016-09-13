var        User = require('../models/user'),
    Transaction = require('../models/transaction');

module.exports = {

  dashboard: function(req, res) {
      res.render('pages/user/dashboard', {
        title: 'Profile',
        message: req.flash('authMessage'),
        user: req.user //get the user out of  session and pass to template
      });
    },

  reactDashboard: function(req, res) {
       res.render('pages/user/dashboard', {
         title: 'Username',
         message: req.flash('authMessage'),
         user: req.user //get the user out of  session and pass to template
       });
     },


  signup: function(req, res) {
      //render the page and pass in any flash stuff
      res.render('pages/user/signup', {
        title: 'Sign Up',
        message: req.flash('signupMessage'),
      });
    },

  login: function(req, res) {
      res.render('pages/user/login', {
        title: 'Login',
        message: req.flash('loginMessage'),
      });
    },

  unlink: function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/dashboard');
        });
      }





 };
