/**
 * 腾讯云微信小程序解决方案
 * Demo 数据库初始化脚本
 * @author Jason
 */
const fs = require('fs');
const {mysql: config} = require('../config');

console.log('=================== 开始初始化数据库 ===================');

const DB = require('knex')({
  client: 'mysql',
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.pass,
    database: config.db,
    charset: config.char,
    multipleStatements: true
  }
});

const files = fs.readdirSync(__dirname);
let sql_files = files.filter(f => {
  return f.endsWith('.sql');
});

let files_count = sql_files.length;
let count = 0;

for (let f of sql_files) {
  let path = __dirname + '/' + f;
  console.log(`准备读取 SQL 文件：${path}`);
  // 读取 .sql 文件内容
  let content = fs.readFileSync(path, 'utf8');
  // 执行 .sql 文件内容
  DB.raw(content).then(res => {
    console.log(`${f} 初始化成功！`);
    count += 1;
    if (count === files_count) {
      console.log('==================== 数据库初始化成功 ==================');
      process.exit(0);
    }
  }, err => {
    throw new Error(err);
  })
}