const express = require('express');
const Router = require('named-routes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const initRouter = require('../routes');

module.exports = function initExpress() {

  let expressRouter = express.Router();
  let _router = new Router();
  _router.extendExpress(expressRouter);

  // init express
  let app = express();
  app.use(helmet());

  // init all routes
  app.use('/', expressRouter);
  initRouter(expressRouter);

  if (process.env.DEBUG) {
    app.use(morgan('dev'));
  }

  // init global middleware
  app.use(cookieParser(process.env.SECRET));
  app.use(bodyParser.urlencoded({ extended: true }));
  _router.registerAppHelpers(app);

  // init static & rendering files
  app.set('view engine', 'ejs');
  app.use(express.static(__dirname + '/../public'));
  app.use('/jquery', express.static(__dirname + '/../node_modules/jquery/dist/'));
  app.use('/ejs', express.static(__dirname + '/../node_modules/ejs/'));

  module.exports.app = app;
  return app;
};
