const conf = require('./config/config.json');

let app = require('./libs/express')(conf);

let server = app.listen(conf.port, function () {
  console.log('Listening on port ' + conf.port);
});
