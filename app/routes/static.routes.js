module.exports = function(app) {

  //HOME PAGE (with login links)
  app.get('/', function(req, res) {
    res.render('pages/static/index', {
      title: 'Home',
      user: req.user
    }); //load the index.ejs file
  });

  // About Page
  app.get('/about', function(req, res) {
    res.render('pages/static/about', {
      title: 'About'
    }); //load the about.ejs file
  });








};
