let cheerio = require("cheerio");
let curl = require('curlrequest');

let performRequest = function(url, fulfill, reject, maxTry) {
  curl.request({url: url}, function(err, body) {

    if (err !== null) {
      console.log(err);
      reject("Error querying FMTV API")
      return -1;
    }

    if (body.indexOf("iframe") < 0 && maxTry > 0) {
      performRequest(url, fulfill, reject, maxTry - 1);
      return 0;
    }

    let $ = cheerio.load(body);
    $("iframe").each(function() {
      let src = $(this).attr("src");
      if(src.indexOf("openload") > -1) {
        //src = src.replace("embed", "f"); //Not needed for now on
        fulfill(src);
        return 1;
      }
   });
   reject("Format error in FMTV API")
   return -1;
  });
}

module.exports = function fmtv(url){
  return new Promise(function (fulfill, reject) {
    performRequest(url, fulfill, reject, 10);
  });
}
