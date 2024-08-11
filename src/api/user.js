import request from '@/utils/http'

const apiList = {
    login: 'user/login',
    register: 'user/register',
    userInfo: 'user/userInfo'
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
}