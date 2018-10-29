import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/social_securitys', 'get', data)
export const getContent = data => createAPI('/social_securitys/:id', 'get', data)
export const saveContent = data => createAPI('/social_securitys/:id', 'put', data)
export const importFill = data => createAPI('/social_securitys/import', 'post', data)

// 历史归档接口
export const getArchivingList = data => createAPI('/social_securitys/historys/:year', 'get', data)
export const getArchivingCont = data => createAPI('/social_securitys/historys/:month', 'get', data)
