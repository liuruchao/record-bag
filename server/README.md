# 腾讯云小程序解决方案[增强] - Node.js

## 开始使用

#### 安装依赖

```bash
# 安装全局依赖
npm i pm2 nodemon -g

# 安装项目依赖
npm i
```

#### 启动项目

```bash
# 开发环境，监听文件变化自动重启，并会输出 debug 信息
tnpm run dev

# 线上部署环境
tnpm start
```

按照[小程序创建资源配置指引](https://github.com/tencentyun/weapp-doc)进行操作，可以得到运行本示例所需的资源和服务，其中包括已部署好的示例代码及自动下发的 SDK 配置文件 `/etc/qcloud/sdk.config`。

- 示例代码部署目录：`/data/release/node-weapp-demo`
- 运行示例的 Node 版本：`v8.1.0`
- Node 进程管理工具：`pm2`

## 项目结构

```
record-bag
├── controllers      // 存放所有业务逻辑的目录，并输出 route map
│   ├── login.js
│   ├── message.js
│   ├── tunnel.js
│   ├── upload.js
│   └── user.js
├── middlewares
│   └── response.js  // 处理 HTTP Response Header 的中间件
├── routes
│   └── index.js     // 自动注册 controllers 目录下输出的 route map
├── app.js           // 主入口文件，项目使用 Koa 框架
├── config.js        // 配置文件，不可删除
├── nodemon.json
├── package.json
├── process.json
├── qcloud.js        // 导出了一个 SDK 的单例，包含了所有的 SDK 接口，之后使用的时候只需要 `require` 这个文件就行，无需重复初始化 SDK。
└── README.md
```

除了 `config.js` ，腾讯云还会在你初始化小程序解决方案的时候，向你的机器下发 `sdk.config`，里面包含了你的腾讯云 AppId、SecretId、SecretKey 和服务器等信息，无需修改，`qcloud.js` 会自动引入。如果你想要在自己的机器上部署 SDK 的 Demo，请查看[自行部署 Demo 说明]()。

除此以外，关于 SDK 的详细配置信息，还可以查看 [SDK 的 API 文档]()。