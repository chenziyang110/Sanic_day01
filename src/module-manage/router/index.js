/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn> 
 * @Description: 框架管理 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-10-30 10:53:46
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
        meta: {title: 'users'}
      },
      {
        path: 'menus',
        name: 'base-menus',
        component: _import('manage/pages/users'),
        meta: {title: 'menus'}
      },
      {
        path: 'permissions',
        name: 'base-permissions',
        component: _import('manage/pages/users'),
        meta: {title: 'permissions'}
      },
      {
        path: 'logs',
        name: 'base-logs',
        component: _import('manage/pages/users'),
        meta: {title: 'logs'}
      }
    ]
  }
]
