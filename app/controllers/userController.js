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

  //getting all transaction for req.user
  getTransaction: function(req, res) {
      let user = req.user;

      Transaction.find({
        '_id': {$in : user.transactions}
      }, function(err, result){
        if (err) return done(err);
        return res.json(result);
      })
  },

  createTransaction: function(req, res) {
      let firstUser = req.user;

      User.findOne({
          'facebook.name': req.body.friend
        }, function(err, secondUser) {

          if (err) return done(err);
          if (secondUser) {

           let primaryTransaction = {};
           let secondaryTransaction = {};




              primaryTransaction.first_user = firstUser._id;
              primaryTransaction.second_user = secondUser._id;
              primaryTransaction.amount = req.body.amount;
              primaryTransaction.item = req.body.item;
              primaryTransaction.updatedAt = new Date();
              primaryTransaction.createdAt = new Date();

              secondaryTransaction.first_user = secondUser._id;
              secondaryTransaction.second_user = firstUser._id;
              secondaryTransaction.amount = -req.body.amount;
              secondaryTransaction.item = req.body.item;
              secondaryTransaction.updatedAt = new Date();
              secondaryTransaction.createdAt = new Date();

            let groupTransaction = [primaryTransaction, secondaryTransaction];

            Transaction.collection.insert(groupTransaction, function(err, docs){
              if(err) {
                return done(err);
              } else {
                return res.json(docs);
              }

            })

//------------------- OLD CODE --------------//
          //   let primaryTransaction = new Transaction();
          //   let secondaryTransaction = new Transaction();
          //
          //   //---------- Fields for primary transaction ----------//
          //   primaryTransaction.first_user = firstUser._id;
          //   primaryTransaction.second_user = secondUser._id;
          //   primaryTransaction.amount = req.body.amount;
          //   primaryTransaction.item = req.body.item;
          //
          //   primaryTransaction.save(function(err, transaction){
          //     if (err) throw err;
          //
          //   firstUser.transactions.push(transaction._id);
          //   firstUser.save(function(err) {
          //       if (err) throw err;
          //     });
          //     //json is returned together with second user
          //   });
          //
          //   //---------- Fields for secondary transaction ----------//
          //   secondaryTransaction.first_user = secondUser._id;
          //   secondaryTransaction.second_user = firstUser._id;
          //   secondaryTransaction.amount = -req.body.amount;
          //   secondaryTransaction.item = req.body.item;
          //
          //   secondaryTransaction.save(function(err, transaction){
          //     if (err) throw err;
          //
          //     secondUser.transactions.push(transaction._id);
          //     secondUser.save(function(err) {
          //       if (err) throw err;
          //     });
          //    return res.json([firstUser, secondUser]);
          //   });
          }
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
        user                = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/dashboard');
        });
      }

 };
