import {createAPI} from '@/utils/request'

export const list = data => createAPI('/saas-clients', 'get', data)
export const sassDetail = data => createAPI(`/saas-clients/${data.id}`, 'get', data)
export const reviewDetail = data => createAPI(`/saas-clients/${data.id}`, 'put', data)
export const auditDetail = data => createAPI(`/saas-clients/${data.id}/audit`, 'post', data)
