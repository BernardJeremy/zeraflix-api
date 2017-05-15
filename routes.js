const homeController = require('./controllers/home');
const categoryController = require('./controllers/category');
const videoController = require('./controllers/video');
const testController = require('./controllers/test');

module.exports = function (router, conf, app) {
  /*
    HOME
   */
  router.get('/', 'home', homeController.view);

  /*
    PLAYER
   */
  router.get('/player', 'player.view', videoController.stream);
}
