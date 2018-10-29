import {createAPI, createFormAPI} from '@/utils/request'
export const company = data => createAPI('/accounts/company', 'get', data)
export const information = data => createAPI('/accounts/information', 'get', data)
export const pay = data => createAPI('/accounts/pay', 'post', data)
export const paySuccess = data => createAPI('/accounts/paySuccess/:id', 'get', data)

export const attendancesList = data => createAPI('/attendances', 'get', data)
// export const information = data => createAPI('/attendances', 'get', data)
export const modify = data => createAPI('/attendances/:id', 'put', data)
export const alert = data => createAPI('/attendances/alert', 'post', data)
export const getArchivingList = data => createAPI('/attendances/reports/:year', 'get', data) // 归档
export const getArchivingCont = data => createAPI('/attendances/reports/:month', 'get', data)
export const importAccount = data => createAPI('/attendances/import', 'post', data)
export const archives = data => createAPI('/attendances/archives', 'post', data)
export const newReports = data => createAPI('/attendances/reports', 'post', data)
