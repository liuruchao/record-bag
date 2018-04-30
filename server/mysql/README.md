# 数据库初始化工具

本文件夹下的脚本为腾讯云小程序解决方案 Demo 配套的工具，旨在让用户方便快捷的使用并创建小程序的开发环境。

_**注意**：本工具支持的 MySQL 版本为 **5.7**，并且需提前在数据库中创建名为 `cAuth` 的数据库。`charset` 设置为 `utf8mb4`。_

快速使用：

```bash
npm run initdb
```

或直接执行 `mysql` 目录下的 `initdb.js` 文件：

```bash
# 请保证已经执行了 npm install 安装了所需要的依赖
node mysql/initdb.js
```

我们提供了初始化的 SQL 文件，你也可以用其他数据库工具（如 Navicat）直接导入 SQL 文件。