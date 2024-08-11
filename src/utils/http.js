import axios from "axios"
import { ElMessage } from "element-plus"
import 'element-plus/theme-chalk/el-message.css'
import router from '@/router'
import utils from "./utils"


const request = axios.create({
    // baseURL: "http://192.168.10.201:30651/api/v1/",
    baseURL: utils.apiUrl,
    timeout: 60000
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        config.headers.authorization = sessionStorage.token;
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
// 响应拦截器
request.interceptors.response.use(function(response) {
    if (response.data.code == 1) {
        return Promise.resolve(response.data);
    } else if (response.data.code == 401) {
        ElMessage({
            message: response.data.msg,
            type: 'error'
        })
        sessionStorage.removeItem('token')
        router.push({ path: '/login' })
    } else {
        ElMessage({
            message: response.data.msg,
            type: 'error'
        })
        return Promise.reject(response.data.msg);
    }
}, function(error) {
    if (error.response) {
        switch (error.response.status) {
          case 401:
            ElMessage({
                message: error.response.data.msg,
                type: 'error'
            })
            sessionStorage.removeItem('token')
            router.push({ path: '/login' })
            break;
          default:
            ElMessage({
                message: '网络异常',
                type: 'error'
            })
            break;
        }
        return Promise.reject(error);
    }
    ElMessage({
        message: '网络异常',
        type: 'error'
    })
	return Promise.reject();
})

export default request;