/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn>
 * @Description: 工资
 * @Date: 2018-04-13 16:13:27
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:12:52
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/salarys',
    component: Layout,
    redirect: 'noredirect',
    name: 'salarys',
    meta: {
      title: '工资管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('salarys/pages/index'),
        name: 'salarys-index',
        meta: {title: '工资', icon: 'component', noCache: true}
      },
      {
        path: 'list',
        component: _import('salarys/pages/list'),
        name: 'salarys-list',
        meta: {title: '列表', icon: 'component', noCache: true}
      },
      {
        path: 'details',
        component: _import('salarys/pages/details'),
        name: 'salarysDetails',
        meta: {title: '详情', icon: 'component', noCache: true}
      },
      {
        path: 'setting',
        component: _import('salarys/pages/setting'),
        name: 'salarysSetting',
        meta: {title: '设置', icon: 'component', noCache: true}
      },
      {
        path: 'historicalArchiving',
        component: _import('salarys/pages/historicalArchiving'),
        name: 'salarysHistoricalArchiving',
        meta: {title: '历史归档', icon: 'component', noCache: true}
      },
      {
        path: 'monthStatement',
        component: _import('salarys/pages/monthStatement'),
        name: 'salarysMonthStatement',
        meta: {title: '月报表', icon: 'component', noCache: true}
      }
    ]
  }
]
