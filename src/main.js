import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import Element from 'element-ui'
import echarts from 'echarts'
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
import base from '@/module-manage/' // 用户管理
// import form from '@/module-form/' // 表单页
// import details from '@/module-details/' // 表单页
// import example from '@/module-example/'
import flowanalyze from '@/module-flowanalyze/'
import source from '@/module-source/'
import visited from '@/module-visited/'
import visitor from '@/module-visitor/'

import tools from './utils/common.js'
Vue.prototype.$tools = tools
Vue.prototype.$echarts = echarts

Vue.use(echarts)
Vue.use(tools)
Vue.use(dashboard, store)
Vue.use(base, store)
// Vue.use(form, store)
// Vue.use(details, store)
// Vue.use(example, store)
Vue.use(flowanalyze, store)
Vue.use(source, store)
Vue.use(visited, store)
Vue.use(visitor, store)

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
