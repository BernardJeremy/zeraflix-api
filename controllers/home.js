const categoryServices = require('../services/category');

exports.view = function(req, res) {
  categoryServices.renderBasicPage('allcategories', 1, res);
};
