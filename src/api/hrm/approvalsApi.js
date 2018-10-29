import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/approvals', 'get', data)
export const information = data => createAPI(`/approvals/${data.id}`, 'get', data)
export const reviewHistory = data => createAPI(`/approvals/flows/${data.id}`, 'get', data)
export const getSetState = data => createAPI(`/approvals/setting`, 'get', data)
export const saveSetState = data => createAPI(`/approvals/setting`, 'put', data)
export const submitApprovals = data => createAPI('/approvals/:id', 'put', data)
export const importApprovals = data => createAPI('/approvals/import', 'post', data)
export const exportApprovals = data => createAPI(`/approvals/export/${data.month}`, 'get', data)
