/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn> 
 * @Description: 组织架构 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:13:05
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/organizations',
    component: Layout,
    redirect: 'noredirect',
    name: 'organizations',
    meta: {
      title: '组织架构管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('organizations/pages/index'),
        name: 'organizations-index',
        meta: {title: '组织架构', icon: 'component', noCache: true}
      },
      {
        path: 'import',
        component: _import('organizations/pages/import'),
        name: 'importCon',
        meta: {title: '导入', icon: 'component', noCache: false}
      }
    ]
  }
]
