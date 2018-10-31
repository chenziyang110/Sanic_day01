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
    path: '/base',
    component: Layout,
    redirect: 'noredirect',
    name: 'base',
    meta: {
      title: 'manage',
      icon: 'component'
    },
    children: [
      {
        path: 'users',
        component: _import('manage/pages/users'),
        name: 'base-users',
        meta: {title: 'users', icon: 'documentation', noCache: true}
      },
      {
        path: 'menus',
        name: 'base-menus',
        component: _import('manage/pages/menus'),
        meta: {title: 'menus', icon: 'documentation', noCache: true}
      },
      {
        path: 'permissions',
        name: 'base-permissions',
        component: _import('manage/pages/permissions'),
        meta: {title: 'permissions', icon: 'documentation', noCache: true}
      }
    ]
  }
]
