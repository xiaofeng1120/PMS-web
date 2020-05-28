import axios from 'axios'
const http = axios.create({
    // 公共接口
    //baseURL: process.env.BASE_API,
    // 超时时间 单位是ms
    timeout: 5 * 1000
  })
//请求拦截器
http.interceptors.request.use(config=>{
    config.data=JSON.stringify(config.data);
    config.header={
        'Content-Type':'application/x-www-form-urlencoded'
    }
    console.log("请求前的拦截");
    //loading 开始
    return config
},error=>{
    Promise.reject(error)
})
//响应拦截器
http.interceptors.response.use(response => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    console.log(response);
    //loading 关闭
    return response
  }, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '错误请求'
                break
            case 401:
                err.message = '未授权，请重新登录'
                break
            case 403:
                err.message = '拒绝访问'
                break
            case 404:
                err.message = '请求错误,未找到该资源'
                break
            case 405:
                err.message = '请求方法未允许'
                break
            case 408:
                err.message = '请求超时'
                break
            case 500:
                err.message = '服务器端出错'
                break
            case 501:
                err.message = '网络未实现'
                break
            case 502:
                err.message = '网络错误'
                break
            case 503:
                err.message = '服务不可用'
                break
            case 504:
                err.message = '网络超时'
                break
            case 505:
                err.message = 'http版本不支持该请求'
                break
            default:
                err.message = `连接错误${err.response.status}`
        }
    } else {
        // err.message = '连接到服务器失败'
    }
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(err.response)
  })
  export default {
    get (url, params, headers) {
        let options = {}//默认值
        if (params) options.params = params
        if (headers) options.headers = headers
        return http.get(url, options)
      },
    post (url, params, headers) {
        let options = {}//默认值
        if (params) options.params = params
        if (headers) options.headers = headers
        return http.post(url, params, options)
    }
}