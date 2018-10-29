/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn>
 * @Description: 员工页面
 * @Date: 2018-04-13 16:13:27
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:12:47
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/users',
    component: Layout,
    redirect: 'noredirect',
    name: 'users',
    meta: {
      title: '员工页面管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('users/pages/index'),
        name: 'users-index',
        meta: {title: '员工页面', icon: 'component', noCache: true}
      },
      {
        path: 'approvals',
        component: _import('users/pages/approvals'),
        name: 'usersApprovals',
        meta: {title: '审批', icon: 'component', noCache: true}
      },
      {
        path: 'myInfo',
        component: _import('users/pages/myInfo'),
        name: 'myInfo',
        meta: {title: '我的信息', icon: 'component', noCache: true}
      },
      {
        path: 'recruit',
        component: _import('users/pages/recruit'),
        name: 'recruit',
        meta: {title: '招聘', icon: 'component', noCache: true}
      },
      {
        path: 'recruitDetails',
        component: _import('users/pages/recruitDetails'),
        name: 'recruitDetails',
        meta: {title: '招聘详情', icon: 'component', noCache: true}
      },
      {
        path: 'noticeDetails',
        component: _import('users/pages/noticeDetails'),
        name: 'noticeDetails',
        meta: {title: '公告详情', icon: 'component', noCache: true}
      }
    ]
  }
]
