import {createAPI} from '@/utils/request'

export const areatotals = data => createAPI('/visitors/areal/totals', 'get', data)
export const areachart = data => createAPI('/visitors/areal/chart', 'get', data)
export const areatargetData = data => createAPI('/visitors/areal/targetDatas', 'post', data)

export const totals = data => createAPI('/visitors/newOlds/totals', 'get', data)
export const chart = data => createAPI('/visitors/newOlds/chart', 'get', data)
export const targetDatas = data => createAPI('/visitors/newOlds/targetDatas', 'post', data)
export const properties = data => createAPI('/visitors/properties', 'post', data)
// export const chart = data => createAPI('/visited/chart', 'get', data)
// export const targetdata = data => createAPI('/visited/targetDatas', 'post', data)
// export const visitedlist = data => createAPI('/visited/pages', 'get', data)
// export const visitedswitch = data => createAPI(`/visited/pages/${data.id}/disabled`, 'put', data)
// export const visitedhotmap = data => createAPI(`/visited/pages/${data.id}`, 'get', data)
// export const visitedranklist = data => createAPI('/visited/rankList', 'post', data)