import axios from 'axios'
// import Router from '@/router/index'
var  token = "277e0b594b89d61bc78ade10b10368da";
axios.defaults.timeout = 5000;
//请求拦截器
axios.interceptors.request.use(function (config) {
    console.log("请求拦截器",config);
    config.headers['x-phone-userid'] = token;
    config.headers['Content-Type'] ='application/x-www-form-urlencoded';
    // 在发送请求之前做些什么
    // if(config){
    //     console.log(Router);
    //     Router.push('/index')
    // }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
//响应拦截器
axios.interceptors.response.use(response => {
    console.log("响应拦截器",response)
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
    }
})
export default {
    get(url, params) {
        let options = {}
        if (params) options.params = params
        return axios.get(url, options)
    },
    post(url, params) {
        let options = {}
        if (params) options.params = params
        return axios.post(url, params)
    }
}