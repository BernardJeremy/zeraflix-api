let request = require("request");
let PNG = require('pngjs').PNG;

const SIGNATURE_NUMBER_LINK = 'https://openload.co/assets/js/obfuscator/numbers.js';

module.exports = function pngDecoder(buffer){
  return new Promise(function (fulfill, reject) {
    request({
      uri: SIGNATURE_NUMBER_LINK,
    }, function(error, response, body) {
      if (error !== null) {
        console.log(error);
        reject(error);
        return;
      }

      let window = [];
      window['signatureNumbers'] = body.replace("window.signatureNumbers='", "")
      window['signatureNumbers'] = window['signatureNumbers'].replace(/'+$/, "");
      
      new PNG({ filterType:4 }).parse(buffer, function(error, data) {
        if (error) {
          console.log('Unable to parse PNG data');
          reject('Unable to parse PNG data');
        }
      }).on('parsed', function() {

        var subscribers = [];
        var finalArray = [];
        var data = Array.prototype.slice.call(this.data, 0);

        var decoded = []['map']['call'](data, function(_0x456cx7) {
          return String['fromCharCode'](_0x456cx7)
        })['filter'](function(_0x456cx6, _0x456cx7) {
          return (_0x456cx7 + 1) % 4 && _0x456cx6 !== ' '
        })['join']('');


        decoded = decoded['match'](new RegExp('.{1,' + parseInt(decoded['length'] / 10) + '}', 'g'))['map'](function(_0x456cx7) {
          return _0x456cx7['match'](new RegExp('.{1,20}', 'g'))
        });
        window['signatureNumbers'] = window['signatureNumbers']['match'](new RegExp('.{1,' + parseInt(window['signatureNumbers']['length'] / 10) + '}', 'g'))['map'](function(_0x456cx7) {
          return _0x456cx7['match'](new RegExp('.{1,26}', 'g'))
        });
        var _0x456cx8 = 0;
        var _0x456cx7, _0x456cx9;

        for (_0x456cx7 = 0; _0x456cx7 < decoded['length']; _0x456cx7++) {
          if (Array(_0x456cx7 + 1)['join'](1)['match'](/^1?$|^(11+?)\1+$/)) {
            continue
          };
          _0x456cx8 = 'c'['charCodeAt'](0);
          subscribers[_0x456cx7] = [];
          for (_0x456cx9 = 0; _0x456cx9 < window['signatureNumbers'][_0x456cx7]['length']; _0x456cx9++) {
            for (var _0x456cxa = 0; _0x456cxa < window['signatureNumbers'][_0x456cx7][_0x456cx9]['length']; _0x456cxa++) {
              if (_0x456cx8 > +([+!+[]] + [!+[] + !+[]] + [!+[] + !+[]])) {
                _0x456cx8 = 'b'['charCodeAt'](0)
              };
              if (window['signatureNumbers'][_0x456cx7][_0x456cx9][_0x456cxa] === String['fromCharCode'](Math['floor'](_0x456cx8))) {
                if (subscribers[_0x456cx7][_0x456cx9]) {
                  continue
                };
                _0x456cx8 += +([!+[] + !+[]] + (+(+!+[] + [+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + [!+[] + !+[]] + [+[]]) + [])[+!+[]] + [!+[] + !+[] + !+[] + !+[] + !+[]]);
                subscribers[_0x456cx7]['push'](decoded[_0x456cx7][_0x456cx9][_0x456cxa])
              }
            }
          }
        };

        for (_0x456cx7 = 0; _0x456cx7 < [+!+[]] + [+[]]; _0x456cx7++) {
          if (!(Array(_0x456cx7 + 1)['join'](1)['match'](/^1?$|^(11+?)\1+$/))) {
            finalArray['push'](subscribers[_0x456cx7]['filter'](function(_0x456cx6) {
              return _0x456cx6 !== ','
            })['join'](''))
          }
        };

        fulfill(finalArray[3] + '~' + finalArray[1] + '~' + finalArray[2] + '~' + finalArray[0]);
      });
    });
  });
};
