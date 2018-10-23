const getTwitchLink = require('node-twitch-link');

exports.exec = function (req, res) {
  getTwitchLink(req.query.url, {oauth_token: process.env.HOST_OAUTH}).then(function (ret) {
    let html = ''
    for (let i in ret) {
      html += '<p style="text-align: center;">'
        + '<a href="' + ret[i].url + '" target="_blank">' + ret[i].type + '</a>'
        + '</p>';
    }
    res.send(html);
  }).catch(function (err) {
    console.log("Error : ", err.message);
    res.send('<p>Aucun lien trouvé</p>');
  });
};
