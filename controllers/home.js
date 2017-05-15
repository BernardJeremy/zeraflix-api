const conf = require('../config/config.json');

exports.view = function (req, res) {
  res.render('../views/index.ejs', {
    client_id: conf.client_id,
    redirect_uri: conf.redirect_uri
  });
};
