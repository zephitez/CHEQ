module.exports = function(app) {
  var staticController = require('../controllers/staticController');

  //Home Page
  app.route('/')
    .get(staticController.index);

  //About Page
  app.route('/about')
    .get(staticController.about);

};
