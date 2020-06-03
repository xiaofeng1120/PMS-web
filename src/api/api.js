import http from './request'
import Url from './url'
export const creat = param => http.post(`${Url.requestUrl}room/room-type/creat`,param);
export const roomType = param => http.get(`${Url.requestUrl}room/room-type`,param);