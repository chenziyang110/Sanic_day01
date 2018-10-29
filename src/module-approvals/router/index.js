/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn>
 * @Description: 审批
 * @Date: 2018-04-13 16:13:27
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:12:47
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/approvals',
    component: Layout,
    redirect: 'noredirect',
    name: 'approvals',
    meta: {
      title: '审批管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('approvals/pages/index'),
        name: 'approvals-index',
        meta: {title: '审批', icon: 'component', noCache: true}
      },
      {
        path: 'salaryApproval/:id',
        component: _import('approvals/pages/salaryApproval'),
        name: 'salaryApproval',
        meta: {title: '工资审核', icon: 'component', noCache: true}
      },
      {
        path: 'enterApproval/:id',
        component: _import('approvals/pages/enterApproval'),
        name: 'enterApproval',
        meta: {title: '入职审核', icon: 'component', noCache: true}
      },
      {
        path: 'leaveApproval',
        component: _import('approvals/pages/leaveApproval'),
        name: 'leaveApproval',
        meta: {title: '申请请假', icon: 'component', noCache: true}
      },
      {
        path: 'quitApproval',
        component: _import('approvals/pages/quitApproval'),
        name: 'quitApproval',
        meta: {title: '申请离职', icon: 'component', noCache: true}
      },
      {
        path: 'securitySetting',
        component: _import('approvals/pages/securitySetting'),
        name: 'securitySetting',
        meta: {title: '设置', icon: 'component', noCache: true}
      }
    ]
  }
]
