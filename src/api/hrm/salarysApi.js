import {createAPI, createFormAPI} from '@/utils/request'

export const getSalarysList = data => createAPI('/salarys', 'get', data)
export const dimission = data => createAPI('/user/apply/dimission', 'put', data)
export const applyOvertime = data => createAPI('/user/apply/overtime', 'put', data)
export const applyLeave = data => createAPI('/user/apply/leave', 'put', data)
export const approvalsList = data => createAPI('/user/approvals', 'get', data)
export const regularWorker = data => createAPI('/user/approvals/:id/regularWorker', 'put', data)
export const transferPosition = data => createAPI('/user/approvals/:id/transferPosition', 'get', data)
