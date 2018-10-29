/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn> 
 * @Description: 公告 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:12:47
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/notices',
    component: Layout,
    redirect: 'noredirect',
    name: 'notices',
    meta: {
      title: '公告管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('notices/pages/index'),
        name: 'notices-index',
        meta: {title: '公告', icon: 'component', noCache: true}
      }
    ]
  }
]
