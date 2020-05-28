import http from './request'
import Url from './url'
export const groupDetail = param => http.post(Url.requestUrl+'/getList',param)