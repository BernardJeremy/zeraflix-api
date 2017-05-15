const conf = require('../config/config.json');

exports.view = function (req, res) {
  res.render('../views/player.ejs', {
    video_url: "video.m3u8",
  });
};