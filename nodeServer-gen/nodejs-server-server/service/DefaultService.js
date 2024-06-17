'use strict';


/**
 * Miao
 *
 * tipo String  (optional)
 * returns String
 **/
exports.getMenus = function(tipo) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "bytes": [],
  "empty": true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * get menu by id
 *
 * menuId String 
 * returns Menu
 **/
exports.getMenusById = function(menuId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {"empty": false};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

