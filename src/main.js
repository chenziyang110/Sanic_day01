import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/element-theme/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import * as filters from './filters' // global filters
// font-awesome
import 'font-awesome/css/font-awesome.css'
/*
* 注册 - 业务模块
*/
import dashboard from '@/module-dashboard/' // 面板
// import base from '@/module-manage/' // 用户管理
// import form from '@/module-form/' // 表单页
// import details from '@/module-details/' // 表单页
// SaaS HRM
import saasClients from '@/module-saas-clients/' // 企业管理
import organizations from '@/module-organizations/' // 组织架构
import employees from '@/module-employees/' // 员工
import accounts from '@/module-accounts/' // 账户
import settings from '@/module-settings/' // 公司设置
import salarys from '@/module-salarys/' // 工资
import socialSecuritys from '@/module-social-securitys/' // 社保
import attendances from '@/module-attendances/' // 考勤
import recruits from '@/module-recruits/' // 招聘
import approvals from '@/module-approvals/' // 审批
import notices from '@/module-notices/' // 公告
import users from '@/module-users/' // 员工页面

import tools from './utils/common.js'
Vue.prototype.$tools = tools

Vue.use(tools)
Vue.use(dashboard, store)
// Vue.use(base, store)
// Vue.use(form, store)
// Vue.use(details, store)
Vue.use(saasClients, store)
Vue.use(organizations, store)
Vue.use(employees, store)
Vue.use(accounts, store)
Vue.use(settings, store)
Vue.use(salarys, store)
Vue.use(socialSecuritys, store)
Vue.use(attendances, store)
Vue.use(recruits, store)
Vue.use(approvals, store)
Vue.use(notices, store)
Vue.use(users, store)

/*
* 注册 - 组件
*/

// 饿了么
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
