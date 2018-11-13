import {createAPI} from '@/utils/request'

export const list = data => createAPI('/dashboard/yesterday', 'get', data)
export const type = data => createAPI('/dashboard/tops', 'get', data)
export const trend = data => createAPI('/dashboard/trendChart', 'get', data)