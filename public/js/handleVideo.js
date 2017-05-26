var MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function displayLink(link) {
  console.log(link);

  $.ajax({
    type: "GET",
    url: "/decode",
    data: "url=" + link,
    processData: false,
    success: function (data) {
      console.log(data);
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

$(function () {
  $.ajax({
    type: "GET",
    url: "/templates/thumbnail.ejs",
    processData: false,
    success: function (template) {
      console.log(template);
      $.ajax({
        type: "GET",
        beforeSend: function (request) {
          request.setRequestHeader("client-id", client_id);
        },
        url: "https://api.twitch.tv/kraken/channels/zerator/videos",
        data: "limit=12&offset=0&broadcast_type=archive%2Cupload%2Chighlight&sort=time",
        processData: false,
        success: function (data) {
          console.log(data);
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
    },
    error: function (err) {
      console.error(err);
    }
  });
});