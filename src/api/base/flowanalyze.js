import {createAPI} from '@/utils/request'

export const total = data => createAPI('/flowAnalyze/totals', 'get', data)
export const chart = data => createAPI('/flowAnalyze/chart', 'get', data)
export const targetdata = data => createAPI('/flowAnalyze/targetDatas', 'post', data)