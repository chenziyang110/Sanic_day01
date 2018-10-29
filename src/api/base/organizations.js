import {
  createAPI, createFileAPI
} from '@/utils/request'

export const organList = data => createAPI('/organizations', 'get', data)
export const simpleList = data => createAPI('/organizations/simple', 'get', data)
export const add = data => createAPI('/organizations', 'post', data)
export const update = data => createAPI(`/organizations/${data.id}`, 'put', data)
export const detail = data => createAPI(`/organizations/${data.id}`, 'get', data)
export const remove = data => createAPI(`/organizations/${data.id}`, 'delete', data)
export const changeDept = data => createAPI(`/organizations/changeDept`, 'put', data)
export const moveDept = data => createAPI(`/organizations/${data.id}/moveDept`, 'put', data)
export const importData = data => createAPI(`/organizations/import`, 'post', data)
export const exportData = data => createFileAPI(`/organizations/export`, 'post', data)
