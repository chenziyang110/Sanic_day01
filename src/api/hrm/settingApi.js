import {createAPI, createFormAPI} from '@/utils/request'

export const baseinfo = data => createAPI('/settings/baseinfo', 'get', data)
export const putBtaseinfo = data => createAPI('/settings/baseinfo', 'put', data)
export const adminList = data => createAPI('/settings/admins', 'get', data)
export const addAdmin = data => createAPI('/settings/admins', 'post', data)
export const getAdminInfo = data => createAPI('/settings/admins_1537264797089', 'get', data)
export const changeAdmin = data => createAPI(`/settings/admins/${data.id}`, 'put', data)
export const deleteAdmin = data => createAPI(`/settings/admins/${data.id}`, 'delete', data)
export const getEmployees = data => createAPI('/employees/simple', 'get', data)
