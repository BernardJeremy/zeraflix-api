require('dotenv').config();

const app = require('./libs/express');
require('./routes')(app);

const server = app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT);
});
