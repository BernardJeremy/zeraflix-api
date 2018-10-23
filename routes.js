const homeController = require('./controllers/home');
const decodeController = require('./controllers/decode');

module.exports = function (router) {
  /*
    HOME
   */
  router.get('/', 'home', homeController.view);

  /*
    URL API
   */
  router.get('/decode', 'decode.exec', decodeController.exec);
}
