const homeController = require('./controllers/home');
const playerController = require('./controllers/player');

module.exports = function (router, conf, app) {
  /*
    HOME
   */
  router.get('/', 'home', homeController.view);

  /*
    PLAYER
   */
  router.get('/player', 'player.view', playerController.view);
}
