/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn> 
 * @Description: SaaS管理员 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:11:54
 */

 import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    path: '/saas-clients',
    component: Layout,
    redirect: 'noredirect',
    name: 'saas-clients',
    meta: {
      title: 'SaaS企业管理',
      icon: 'component'
    },
    root: true,    
    children: [
      {
        path: 'index',
        name: 'saas-clients-index',
        component: _import('saas-clients/pages/index'),
        meta: {title: 'SaaS企业', icon: 'component', noCache: true}
      },
      {
        path: 'details/:id',
        name: 'saas-clients-details',
        component: _import('saas-clients/pages/sass-details'),
        meta: {title: 'SaaS企业', icon: 'component', noCache: false}
      }
    ]
  }
]
