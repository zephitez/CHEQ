module.exports = {

  //Home Page
  index: function(req, res) {
       res.render('pages/static/index', {
         title: 'Home',
         user: req.user
       }); //load the index.ejs file
     },

  // About Page
  about: function(req, res) {
       res.render('pages/static/about', {
         title: 'About',
         user: req.user
       }); //load the about.ejs file
     }

 };
