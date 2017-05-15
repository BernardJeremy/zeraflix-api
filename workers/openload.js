let request = require("request");
let cheerio = require("cheerio");

let phantom = require('../libs/phantom');

module.exports = function openload(url){
  return new Promise(function (fulfill, reject) {
    phantom.getContent(url).then(function(content) {
      let $ = cheerio.load(content);

      let linkId = $("#streamurl").text();
      if (!linkId || 0 === linkId.length) {
        return reject("Fail to retrieve link from DOM");
      }

      fulfill('https://openload.co/stream/' + linkId);
    });
  });
}
