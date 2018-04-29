const {uploader} = require('../qcloud');

// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
var fn_upload = async ctx => {
  // 获取上传之后的结果
  // 具体可以查看：
  const data = await uploader(ctx.req);

  ctx.state.data = data
};

module.exports = {
  'POST /upload': fn_upload
};