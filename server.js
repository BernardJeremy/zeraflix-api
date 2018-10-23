require('dotenv').config();

const app = require('./libs/express');
require('./routes')(app);

let server = app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + process.env.PORT);
});
