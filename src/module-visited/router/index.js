/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn> 
 * @Description: 框架管理 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-10-31 16:50:04
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    path: '/visited',
    component: Layout,
    redirect: 'noredirect',
    name: 'visited',
    meta: {
      title: '受访分析',
      icon: 'component'
    },
    children: [
        {
        path: 'visiteddomain',
        name: 'visited-domain',
        component: _import('visited/pages/visiteddomain'),
        meta: {title: '受访域名', icon: 'documentation', noCache: true}
        },
      
      {
        path: 'visitedlist',
        name: 'visited-list',
        component: _import('visited/pages/visitedlist'),
        meta: {title: '页面点击列表', icon: 'documentation', noCache: true}
      },
      {
        path: 'visitedrank',
        name: 'visited-rank',
        component: _import('visited/pages/visitedrank'),
        meta: {title: '受访升降榜', icon: 'documentation', noCache: true}
      }
    ]
  }
]
