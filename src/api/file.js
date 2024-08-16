import request from '@/utils/http'

const apiList = {
    mkdir: 'file/mkdir',
    
}

export default {    
    fileList: data => {
        return request.get(`file/list/${data.pageNum}/${data.fileId}`, { params: {category: data.category, pageSize: data.pageSize} })
    },
    mkdir: data => {
        return request.put(apiList.mkdir + `?name=${data.name}&fileId=${data.fileId}`)
    },
    mv: data => {
        return request.put(`file/update/${data.fileId}?name=${data.name}`)
    },
}