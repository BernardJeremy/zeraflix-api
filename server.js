require('dotenv').config();

let app = require('./libs/express')();

let server = app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + process.env.PORT);
});
