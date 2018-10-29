import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/attendances/:month', 'get', data)
