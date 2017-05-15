const request = require('request');

const openloadDecoder = require("../workers/openload");

function handleVideo(req, res, isStream) {
  if (typeof req.query.url === 'undefined') {
    res.json({code: 400, msg: 'URL missing'})
    return;
  }

  if (typeof req.query.fileName === 'undefined') {
    res.json({code: 400, msg: 'FileName missing'})
    return;
  }

  let link = openloadDecoder(req.query.url).then(function(link) {
    if (isStream){
      link += '?mime=true';
    }

    request.get({
      url: link,
      headers: {
        'range': req.headers.range,
      }
    }).pipe(res);
  }).catch(function (err) {
    res.json({code: 400, msg: 'Error : ' + err})
    return;
  });
}

exports.stream = function(req, res) {
  handleVideo(req, res, true);
};

exports.download = function(req, res) {
  handleVideo(req, res, false);
};
