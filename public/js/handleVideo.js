var MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var CURRENT_OFFSET = 0

function displayLink(link) {
  $.ajax({
    type: "GET",
    url: "/decode",
    data: "url=" + link,
    processData: false,
    success: function (data) {
      $('#dialog-message').html(data);
      $( "#dialog-message" ).dialog( "open" );
    },
    error: function (err) {
      console.error(err);
    }
  });
}

function padZero(integer) {
  return integer < 10 ? '0' + integer : '' + integer
};

function dateToString(date) {
  return (MONTH_NAMES[date.getMonth()]) + ' ' + (padZero(date.getDate())) + ', ' + date.getFullYear();
};

function formatVideoData(video) {
  var ret = {};

  ret.url = video.url;
  ret.label = video.title;
  ret.preview = video.preview;
  ret.preview = video.preview;
  ret.date = dateToString(new Date(video.recorded_at));

  return ret;
}

function renderVideo(html) {
  $(".part-bottom").before(html);
  $('.grid').each(function (i, elem) {
    $(this).removeClass('clearFloat');
    if (i == 3 || (i > 4 && i % 3 == 0)) {
      $(this).addClass('clearFloat')
    }
  });
}

function populateVideo(template, offset) {
  $('.page-number').html((offset / 12) + 1);
  $('.loading-message').html('(Loading...)');  
  $.ajax({
    type: "GET",
    beforeSend: function (request) {
      request.setRequestHeader("client-id", client_id);
    },
    url: "https://api.twitch.tv/kraken/channels/zerator/videos",
    data: "limit=12&offset=" + offset + "&broadcast_type=archive%2Cupload%2Chighlight&sort=time",
    processData: false,
    success: function (data) {
      data.videos.forEach(function (video) {
        var formattedData = formatVideoData(video);
        var html = ejs.render(template, { video: formattedData });
        renderVideo(html);
      });
      $('.loading-message').html('');
    },
    error: function (err) {
      console.error(err);
    }
  });
}

$(function () {
  $.ajax({
    type: "GET",
    url: "/templates/thumbnail.ejs",
    processData: false,
    success: function (template) {
      populateVideo(template, 0);

      $( "#link-prev" ).click(function(e) {
        e.preventDefault();
        if (CURRENT_OFFSET === 0) {
          return;
        }
        CURRENT_OFFSET -= 12 ;
        $( ".grid" ).remove();
        populateVideo(template, CURRENT_OFFSET);
      });

      $( "#link-next" ).click(function(e) {
        e.preventDefault();
        CURRENT_OFFSET += 12 ;
        $( ".grid" ).remove();
        populateVideo(template, CURRENT_OFFSET);
      });
    },
    error: function (err) {
      console.error(err);
    }
  });
});