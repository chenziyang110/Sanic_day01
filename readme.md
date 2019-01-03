# SAAS IRHM 系统

## 运行

```sh
- 1 安装 node

https://nodejs.org/en/

- 2 安装 cnpm

npm install -g cnpm --registry=https://registry.npm.taobao.org​

- 3 Git 拉取

git clone http://git.itcast.cn/development/project-analytics-cmm-vue

- 4 安装依赖包

cnpm i

- 5 运行

npm start
```

## 配置 API 地址

编辑文件 config/index.js

修改 `api` `upfile` 转发配置

```js
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    proxyTable: {
      '/api': {
        target: 'https://mock.boxuegu.com/mock/29',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
```

## 资源

- UED 产品
  http://research.itcast.cn/itcast-frontpage/大数据-盘析/start.html

- API
  https://mock.boxuegu.com/project/56/interface/api

- 前端 git
  http://git.itcast.cn/development/project-analytics-cmm-vue

- 后端 git
  http://git.itcast.cn/development/project-analytics-cmm-java

- 域名
  http://px.research.itcast.cn

- BUG 管理
  http://research.itcast.cn/zentaopms/www/index.php?m=bug&f=browse&productID=6

---

@传智研究院-研发部

江苏传智播客教育科技股份有限公司 &nbsp;版权所有 Copyright 2006-2018, All Rights Reserved
