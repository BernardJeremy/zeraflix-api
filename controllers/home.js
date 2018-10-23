exports.view = function (req, res) {
  res.render('../views/index.ejs', {
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI
  });
};
