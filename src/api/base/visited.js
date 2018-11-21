import {createAPI} from '@/utils/request'

export const total = data => createAPI('/visited/totals', 'get', data)
export const chart = data => createAPI('/visited/chart', 'get', data)
export const targetdata = data => createAPI('/visited/targetDatas', 'post', data)
export const visitedlist = data => createAPI('/visited/pages', 'get', data)
export const visitedswitch = data => createAPI(`/visited/pages/${data.id}/disabled`, 'put', data)
export const visitedhotmap = data => createAPI(`/visited/pages/${data.id}`, 'get', data)
export const visitedranklist = data => createAPI('/visited/rankList', 'post', data)