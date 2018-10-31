import {createAPI} from '@/utils/request'

export const list = data => createAPI('/menus', 'get', data)
export const add = data => createAPI('/menus', 'post', data)
export const update = data => createAPI(`/menus/${data.id}`, 'put', data)
export const remove = data => createAPI(`/menus/${data.id}`, 'delete', data)
export const detail = data => createAPI(`/menus/${data.id}`, 'get', data)
