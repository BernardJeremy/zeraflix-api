var fetchMatches = function(socket) {
  var currentCategory = 'allcategories';
  var currentPage = 1;

  if (window.location.pathname.indexOf('category') >= 0) {
    var splited = window.location.pathname.split('/');
    if (splited.length >= 3){
      currentCategory = splited[2];
    }
    if (splited.length >= 4) {
      currentPage = parseInt(splited[3]);
      currentPage = (currentPage <= 0 ? 1 : currentPage);
    }
  }

  socket.emit('loadMatches', {page: currentPage, category: currentCategory});
};

$(document).ready(function(){
    var socket = io();

    fetchMatches(socket);

    socket.on('loadMatch', function(match) {
      var nextElement = $(".part-bottom");
      var currentMatchDate = new Date(match.time)
      var inserted = false;
      $(".data-time").each(function(i, elem) {
        var iteratorDate = new Date($(this).data("time"));
        if (currentMatchDate > iteratorDate && !inserted) {
          nextElement = $(this).parent();
          inserted = true;
        }
      });
      nextElement.before(match.html);
      $('.grid').each(function(i, elem) {
        $(this).removeClass('clearFloat');
        if (i == 3 || (i > 4 && i % 3 == 0)) {
          $(this).addClass('clearFloat')
        }
      });
    });

    socket.on('endOfLoading', function() {
       $(".loading-message").hide();
    });

    socket.on('fail', function(err) {
      console.log("FAIL : ", err);
    });
});
