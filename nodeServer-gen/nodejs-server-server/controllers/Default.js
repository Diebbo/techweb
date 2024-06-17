'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.getMenus = function getMenus (req, res, next) {
  var tipo = req.swagger.params['tipo'].value;
  Default.getMenus(tipo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMenusById = function getMenusById (req, res, next) {
  var menuId = req.swagger.params['menuId'].value;
  Default.getMenusById(menuId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
