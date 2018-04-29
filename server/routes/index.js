const fs = require('fs');
const path = require('path');
// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')
// add url-route in /controllers:

function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      if (path === '/login') {
        router.get(path, authorizationMiddleware, mapping[url]);
      } else if (path === '/user') {
        router.get(path, validationMiddleware, mapping[url]);
      } else {
        router.get(path, mapping[url]);
      }
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith('PUT ')) {
      var path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith('DELETE ')) {
      var path = url.substring(7);
      router.del(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  var con_path = path.resolve(__dirname, '../' + dir);
  fs.readdirSync(con_path).filter((f) => {
    return f.endsWith('.js');
  }).forEach((f) => {
    console.log(`process controller: ${f}...`);
    let mapping = require(con_path + '/' + f);
    addMapping(router, mapping);
  });
}

module.exports = function (dir) {
  let
    controllers_dir = dir || 'controllers',
    router = require('koa-router')({
      prefix: '/weapp'
    });
  addControllers(router, controllers_dir);
  return router.routes();
};
