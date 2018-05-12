/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://t60sdopn.qcloud.la';

var config = {
  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/api/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/api/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/api/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/api/upload`
  },

  option(inter, method, login) {
    // 设置请求方法（需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    if (method === undefined) {
      method = 'GET';
    } else {
      method = method.toUpperCase();
    }

    // 设置登录态，默认带登陆请求
    if (login === undefined) {
      login = true
    }

    // 拼接URL
    let url = `${host}/api/${inter}`;

    // 返回 option
    return {method, url, login};
  }
};

module.exports = config;
