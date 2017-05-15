var ejs = require('ejs');

const categoryServices = require('../services/category');

module.exports.emitFail  = function(err, socket) {
  socket.emit('fail', err);
};

module.exports.endLoading  = function(socket) {
  socket.emit('endOfLoading');
};

module.exports.emitVideo  = function(match, socket) {
  ejs.renderFile(__dirname + "/../views/partials/match.ejs", {match: match}, {}, function(err, html){
      if (err !== null) {
        module.exports.emitFail(err, socket);
        console.log(err);
        return;
      }
      socket.emit('loadVideo', {html: html, time: match.time});
    });
};


module.exports.init = function(server, conf, app) {
  let io = require('socket.io')(server);

  io.on('connection', function(socket){

    socket.on('loadMatches', function(data) {
      categoryServices.fetchByCategory(data.category, data.page, socket, app);
    });

  });

  return io;
};
