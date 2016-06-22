'use strict';

module.exports.init = function(app) {
  var modelsPath = app.get('root') + '/app/models/';

  ['user', 'product'].forEach(function(model) {
    require(modelsPath + model);
  });
};
