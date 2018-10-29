/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn>
 * @Description: 社保
 * @Date: 2018-04-13 16:13:27
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:12:47
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/social-securitys',
    component: Layout,
    redirect: 'noredirect',
    name: 'social-securitys',
    meta: {
      title: '社保管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('social-securitys/pages/index'),
        name: 'social-securitys-index',
        meta: {title: '社保', icon: 'component', noCache: true}
      },
      // 报表
      {
        path: 'detail',
        component: _import('social-securitys/pages/detail'),
        name: 'social-securitys-detail',
        meta: {
          title: '社保'
        }
      },
      // 历史归档
      {
        path: 'historicalArchiving',
        component: _import('social-securitys/pages/historicalArchiving'),
        name: 'historicalArchiving',
        meta: {
          title: '历史归档'
        }
      },
      // 月报表
      {
        path: 'monthStatement',
        component: _import('social-securitys/pages/monthStatement'),
        name: 'monthStatement',
        meta: {
          title: '当月报表'
        }
      }
    ]
  }
]
