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
    path: '/visitor',
    component: Layout,
    redirect: 'noredirect',
    name: 'visitor',
    meta: {
      title: '访客分析',
      icon: 'fa fa-users'
    },
    children: [
        {
        path: 'areaspread',
        name: 'area-spread',
        component: _import('visitor/pages/areaspread'),
        meta: {title: '地域分布', icon: 'documentation', noCache: true}
        },
      {
        path: 'oldnewvisitor',
        name: 'oldnew-visitor',
        component: _import('visitor/pages/oldnewvisitor'),
        meta: {title: '新老访客', icon: 'documentation', noCache: true}
      },
      {
        path: 'accessattribute',
        name: 'access-attribute',
        component: _import('visitor/pages/accessattribute'),
        meta: {title: '访问属性', icon: 'documentation', noCache: true}
      }
    ]
  }
]
