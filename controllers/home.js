exports.view = function (req, res) {
  res.render('../views/index.ejs', {
    client_id: process.env.CLIENT_ID,
  });
};
