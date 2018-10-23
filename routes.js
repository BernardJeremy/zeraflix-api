const homeController = require('./controllers/home');
const decodeController = require('./controllers/decode');

module.exports = function (app) {
  /*
    HOME
   */
  app.get('/', homeController.view);

  /*
    URL API
   */
  app.get('/decode', decodeController.exec);
}
