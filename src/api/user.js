import request from '@/utils/http'

const apiList = {
    login: 'user/login',
    register: 'user/register',
    userInfo: 'user/userInfo',
    updateInfo: 'user/update',
}

export default {
    login: data => {
        return request.post(apiList.login, data)
    },    
    register: data => {
        return request.post(apiList.register, data)
    },
    userInfo: data => {
        return request.get(apiList.userInfo, { params: data })
    },
    updateInfo: data => {
        return request.post(apiList.updateInfo, data)
    },
}