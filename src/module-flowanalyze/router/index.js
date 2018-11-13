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
    path: '/flowanalyze',
    component: Layout,
    redirect: 'noredirect',
    name: 'flowanalyze',
    meta: {
      title: '流量分析',
      icon: 'component'
    },
    children: [
      {
        path: 'trend',
        component: _import('flowanalyze/pages/trend'),
        name: 'flowanalyze-trend',
        meta: {title: '趋势分析', icon: 'documentation', noCache: true}
      },
      {
        path: 'visit',
        name: 'flowanalyze-visit',
        component: _import('flowanalyze/pages/visit'),
        meta: {title: '访问分析', icon: 'documentation', noCache: true}
      }
    ]
  }
]
