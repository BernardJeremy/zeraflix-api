const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

// init express
const app = express();
app.use(helmet());

if (process.env.DEBUG === 'true') {
  app.use(morgan('dev'));
}

// init static & rendering files
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));
app.use('/jquery', express.static(__dirname + '/../node_modules/jquery/dist/'));
app.use('/ejs', express.static(__dirname + '/../node_modules/ejs/'));

module.exports = app;
