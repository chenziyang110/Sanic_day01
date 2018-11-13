import {createAPI} from '@/utils/request'

export const total = data => createAPI('/source/totals', 'get', data)
export const chart = data => createAPI('/source/chart', 'get', data)
export const targetdata = data => createAPI('/source/targetDatas', 'post', data)
export const keywordstarget = data => createAPI('/keywords/target', 'post', data)
export const keywordsse = data => createAPI('/keywords/se', 'post', data)
export const domainchart = data => createAPI('/domain/chart', 'get', data)
export const domaintargetdata = data => createAPI('/domain/targetDatas', 'post', data)
export const domainranklist = data => createAPI('/domain/rankList', 'post', data)