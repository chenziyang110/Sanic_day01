/*
 * @Author: 陶峙巍 <taoshiwei@itcast.cn>
 * @Description: 招聘
 * @Date: 2018-04-13 16:13:27
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:12:47
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/recruits',
    component: Layout,
    redirect: 'noredirect',
    name: 'recruits',
    meta: {
      title: '招聘管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('recruits/pages/index'),
        name: 'recruits-index',
        meta: {title: '招聘', icon: 'component', noCache: true}
      },
      {
        path: 'releasePosition',
        component: _import('recruits/pages/releasePosition'),
        name: 'releasePosition',
        meta: {title: '发布职位', icon: 'component', noCache: true}
      },
      {
        path: 'information',
        component: _import('recruits/pages/information'),
        name: 'information',
        meta: {title: '消息', icon: 'component', noCache: true}
      },
      {
        path: 'mailTemplate',
        component: _import('recruits/pages/mailTemplate'),
        name: 'mailTemplate',
        meta: {title: '邮件模板', icon: 'component', noCache: true}
      },
      {
        path: 'sendOffer/:id',
        component: _import('recruits/pages/sendOffer'),
        name: 'sendOffer',
        meta: {title: '发送offer', icon: 'component', noCache: true}
      },
      {
        path: 'resume/:id',
        component: _import('recruits/pages/resume'),
        name: 'resume',
        meta: {title: '简历查看', icon: 'component', noCache: true}
      },
      {
        path: 'importData',
        component: _import('recruits/pages/importData'),
        name: 'importData',
        meta: {title: '导入简历', icon: 'component', noCache: true}
      }
    ]
  }
]
