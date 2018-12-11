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
    path: '/source',
    component: Layout,
    redirect: 'noredirect',
    name: 'source',
    meta: {
      title: '来源分析',
      icon: 'fa fa-pie-chart'
    },
    children: [
      {
        path: 'type',
        component: _import('source/pages/type'),
        name: 'source-type',
        meta: { title: '来源分类', icon: 'documentation', noCache: true }
      },
      {
        path: 'keywords',
        name: 'source-keywords',
        component: _import('source/pages/keywords'),
        meta: { title: '搜索词', icon: 'documentation', noCache: true }
      },
      {
        path: 'domain',
        name: 'source-domain',
        component: _import('source/pages/domain'),
        meta: { title: '来源域名', icon: 'documentation', noCache: true }
      },
      {
        path: 'rank',
        name: 'source-rank',
        component: _import('source/pages/rank'),
        meta: { title: '来源升降榜', icon: 'documentation', noCache: true }
      }

    ]
  }
]
