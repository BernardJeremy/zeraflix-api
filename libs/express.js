const express = require('express');
const Router = require('named-routes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet')

module.exports = function initExpress(conf) {

  let expressRouter = express.Router();
  let _router = new Router();
  _router.extendExpress(expressRouter);

  // init express
  let app = express();
  app.use(helmet());
  app.use('/', expressRouter);
  app.use(morgan('dev'));

  // init all routes
  require('../routes')(expressRouter, conf, app);

  // init global middleware
  app.use(cookieParser(conf.secret));
  app.use(bodyParser.urlencoded({ extended: true }));
  _router.registerAppHelpers(app);

  // init static & rendering files
  app.set('view engine', 'ejs');
  app.use(express.static(__dirname + '/../public'));
  app.use('/jquery', express.static(__dirname + '/../node_modules/jquery/dist/'));
  app.use('/socket.io', express.static(__dirname + '/../node_modules/socket.io-client/'));

  module.exports.app = app;
  return app;
};
