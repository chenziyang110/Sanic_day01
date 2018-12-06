import {createAPI} from '@/utils/request'

export const total = data => createAPI('/source/totals', 'get', data)
export const chart = data => createAPI('/source/chart', 'get', data)
export const targetdata = data => createAPI('/source/targetDatas', 'post', data) // 来源分析-指标数据列表
export const setargetdata = data => createAPI('/source/targetDatas/se', 'post', data) // 来源分析-搜索引擎-指标数据列表

export const keywordstarget = data => createAPI('/source/keywords/target', 'post', data)// 来源分析-搜索词-按指标分类
export const keywordsse = data => createAPI('/source/keywords/se', 'post', data) // 来源分析-搜索词-按搜索引擎

export const domainchart = data => createAPI('/domain/chart', 'get', data)// 来源域名-指标图
export const domaintargetdata = data => createAPI('/domain/targetDatas', 'post', data)// 来源域名-指标数据列表
export const domainranklist = data => createAPI('/domain/rankList', 'post', data)// 来源升降榜