/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn> 
 * @Description: 账户 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:20:15
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/accounts',
    component: Layout,
    redirect: 'noredirect',
    name: 'accounts',
    meta: {
      title: '账户管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('accounts/pages/index'),
        name: 'accounts-index',
        meta: {title: '账户', icon: 'component', noCache: true}
      }
    ]
  }
]
