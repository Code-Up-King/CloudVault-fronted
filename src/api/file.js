import request from '@/utils/http'

const apiList = {
    fileList: ''
}

export default {    
    fileList: data => {
        return request.get(`file/list/${data.pageNum}/${data.fileId}`, { params: {category: data.category, pageSize: data.pageSize} })
    },
    // updateInfo: data => {
    //     return request.post(apiList.updateInfo, data)
    // },
}