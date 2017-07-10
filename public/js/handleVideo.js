var MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var CURRENT_OFFSET = 0;
var CURRENT_CHANNEL = "zerator";
var DEFAULT_CHANNEL = "zerator";

//https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
function toHHMMSS(sec_num) {
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return hours + ':' + minutes + ':' + seconds;
}

function displayLink(link) {
  $.ajax({
    type: "GET",
    url: "/decode",
    data: "url=" + link,
    processData: false,
    success: function (data) {
      $('#dialog-message').html(data);
      $("#dialog-message").dialog("open");
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
  return (MONTH_NAMES[date.getMonth()]) + ' ' + (padZero(date.getDate())) + ', ' + date.getFullYear() + ' - ' + (padZero(date.getHours())) + ':' + (padZero(date.getMinutes()));
};

function formatVideoData(video) {
  var ret = {};

  ret.duration = toHHMMSS(video.length);
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

function populateVideo(channel, template, offset) {
  $('.page-number').html((offset / 12) + 1);
  $('.channel-name').html(channel !== DEFAULT_CHANNEL ? ' (' + channel + ')' : '');
  $('.loading-message').html('(Loading...)');
  $.ajax({
    type: "GET",
    beforeSend: function (request) {
      request.setRequestHeader("client-id", client_id);
    },
    url: "https://api.twitch.tv/kraken/channels/" + channel + "/videos",
    data: "limit=12&offset=" + offset + "&broadcast_type=archive&sort=time",
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

function updateVideoGrid(channel, template, offset) {
  $(".grid").remove();
  populateVideo(channel, template, offset);
}

function promptChannel(template) {
  var channel = window.prompt('Which channel ?', DEFAULT_CHANNEL);
  if (!channel) {
    return;
  }
  CURRENT_CHANNEL = channel;
  CURRENT_OFFSET = 0;
  updateVideoGrid(CURRENT_CHANNEL, template, 0)
}

$(function () {
  $.ajax({
    type: "GET",
    url: "/templates/thumbnail.ejs",
    processData: false,
    success: function (template) {
      populateVideo(CURRENT_CHANNEL, template, 0);

      $(document).bind('keydown', function (e) {
        if (e.ctrlKey && e.ctrlKey && e.which === 83) {
          e.preventDefault();
          promptChannel(template);
          return false;
        }
      });

      $("#link-prev").click(function (e) {
        e.preventDefault();
        if (CURRENT_OFFSET === 0) {
          return;
        }
        CURRENT_OFFSET -= 12;
        updateVideoGrid(CURRENT_CHANNEL, template, CURRENT_OFFSET);
      });

      $("#link-next").click(function (e) {
        e.preventDefault();
        CURRENT_OFFSET += 12;
        updateVideoGrid(CURRENT_CHANNEL, template, CURRENT_OFFSET);
      });
    },
    error: function (err) {
      console.error(err);
    }
  });
});