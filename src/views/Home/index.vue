<template>
    <div class="container" v-loading="data.loading">
        <div class="top">
            <el-upload :show-file-list="false" :with-credentials="true" :multiple="true" :http-request="addFile"
                :accept="fileAccept">
                <el-button type="primary">
                    <i class="iconfont icon-upload"></i>
                    上传</el-button>
            </el-upload>

            <el-button type="success" :disabled="isAdding" v-if="isAllMenu" @click="addFolder"><i
                    class="iconfont icon-folder-add"></i>新建文件夹</el-button>
            <el-button type="danger" disabled><i class="iconfont icon-del"></i>批量删除</el-button>
            <el-button type="warning" disabled><i class="iconfont icon-move"></i>批量移动</el-button>
            <el-input v-model="data.fileName" style="width: 3rem;" placeholder="请输入文件名" :suffix-icon="Search" />
        </div>

        <div class="navigation">全部文件</div>
        <el-table class="table" :data="data.list" v-if="data.list.length > 0">
            <el-table-column type="selection" width="50" />
            <el-table-column prop="fileName" label="文件名">
                <template #default="scope">
                    <div v-if="scope.row.isAdd" class="edit-row">
                        <el-input ref="inputRef" v-model="scope.row.fileName"></el-input>
                        <i @click="exitHandler(scope.row)" class="iconfont icon-right1"
                            :class="scope.row.fileName.trim() == '' ? 'not-allow' : ''"></i>
                        <i @click="exitExit(scope.row)" class="iconfont icon-error"></i>
                    </div>
                    <div v-else class="file-row">
                        <img v-if="scope.row.folderType" src="../../assets/icon-image/folder.png" alt="">
                        <img v-else :src="fileType[scope.row.fileType].url" alt="">
                        <div class="folder-name">
                            <span>{{ scope.row.fileName }}</span>
                        </div>
                        <div class="op">
                            <span><i class="iconfont icon-share1"></i>分享</span>
                            <span v-if="scope.row.folderType == 0"><i class="iconfont icon-download"></i>下载</span>
                            <span><i class="iconfont icon-del"></i>删除</span>
                            <span @click="reName(scope.row)"><i class="iconfont icon-edit"></i>重命名</span>
                            <span><i class="iconfont icon-move"></i>移动</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="200" />
            <el-table-column prop="fileSize" label="大小" width="200">
                <template #default="scope">
                    <span v-if="scope.row.fileSize">{{ utils.size2Str(scope.row.fileSize) }}</span>
                    <span v-else></span>
                </template>
            </el-table-column>
        </el-table>
        <div class="null" v-else>
            <div class="empty"></div>
            <div>当前目录为空，上传你的第一个文件吧</div>
            <div class="op">
                <el-upload :show-file-list="false" :with-credentials="true" :multiple="true" :http-request="addFile"
                    :accept="fileAccept">
                    <div class="op-btn">
                        <img src="../../assets/icon-image/file.png" alt="">
                        <div>上传文件</div>
                    </div>
                </el-upload>
                <div class="op-btn" v-if="isAllMenu" @click="addFolder">
                    <img src="../../assets/icon-image/folder.png" alt="">
                    <div>新建目录</div>
                </div>
            </div>
        </div>
        <div class="pagination" v-if="data.list.length > 0">
            <el-pagination v-model:current-page="data.pageNum" v-model:page-size="data.pageSize" background
                layout="total, sizes, prev, pager, next, jumper" :total="data.total" @size-change=""
                @current-change="" />
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import category from '@/model/category'
import http from "@/api/file"
import utils from '@/utils/utils'
import fileType from "@/model/file"
const route = useRoute()
const router = useRouter()


const CATEGORYMAP = {
    'all': 0,
    'video': 1,
    'music': 2,
    'image': 3,
    'doc': 4,
    'other': 5
}

const inputRef = ref(null)
const data = reactive({
    fileName: "",
    pageNum: 1,
    pageSize: 20,
    total: 0,
    category: 'all',
    list: [],
    loading: false,
    filePid: 0,
    currentEditFileName: "",
    editType: 0 //0新建 1重命名
})


// 是否是全部页面
const isAllMenu = computed(() => {
    return route.path == '/home/all'
})

// 可上传的文件
const fileAccept = computed(() => {
    const categoryItem = category[data.category]
    return categoryItem ? categoryItem.accept : '*'
})
// 正在新建文件夹
const isAdding = computed(() => {
    return data.list.some(item => item.isAdd)
})

// 获取文件列表
const getList = (reset = false) => {
    if (reset) data.pageNum = 1
    data.loading = true
    http.fileList({
        pageNum: data.pageNum,
        pageSize: data.pageSize,
        fileId: data.filePid,
        category: CATEGORYMAP[data.category]
    }).then((res) => {
        data.list = res.data.records
        data.total = res.data.total
    }).finally(() => data.loading = false)
}

// 新建文件夹
const addFolder = () => {      
    data.list.unshift({ isAdd: true, fileName: "", fileId: data.filePid })
    data.editType = 0
    setTimeout(() => {
        inputRef.value.focus()
    }, 0)
}

// 编辑处理
const exitHandler = (row) => {
    // 重命名
    if (data.editType == 1) {
        http.mv({
            fileId: row.fileId,
            name: row.fileName
        }).then(res => {
            getList()          
        })
        return
    }
    // 新建
    http.mkdir({
        name: row.fileName,
        fileId: row.fileId
    }).then(res => {
        getList()
    })
}

// 退出编辑
const exitExit = (row) => {
    // 重命名
    if (data.editType == 1) {
        row.isAdd = false
        row.fileName = data.currentEditFileName
        // 清空
        data.currentEditFileName = ''
        return
    }
    // 新建
    data.list.shift()
}

// 重命名
const reName = (row) => {    
   // 将正在编辑的取消掉
    const editing = data.list.filter(item => item.isAdd)[0]
    if (data.editType == 0 && editing) {
        data.list.shift()
    }
    if (data.editType == 1 && editing) {        
        editing.fileName = data.currentEditFileName        
        editing.isAdd = false
    }
    // 记录原来的文件名
    data.currentEditFileName = row.fileName    
    data.editType = 1
    row.isAdd = true    
    setTimeout(() => {
        inputRef.value.focus()
    }, 0)
}

watch(
    () => router.currentRoute.value,
    (newValue) => {
        data.category = newValue.name.toLowerCase()
        getList()
    },
    { immediate: true }
)

const addFile = () => {

}
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;

    .top {
        display: flex;
        align-items: center;

        .iconfont {
            font-size: 0.16rem;
            margin-right: 0.05rem;
        }

        .el-button {
            margin-left: 0;
            margin-right: 0.1rem;
        }
    }

    .navigation {
        line-height: 0.4rem;
        font-size: 0.13rem;
        display: flex;
        align-items: center;
    }

    .table {
        height: 100%;
        flex: 1;
        font-size: 0.14rem;

        .edit-row {
            display: flex;
            align-items: center;

            .iconfont {
                font-size: 0.16rem;
                margin-left: 0.1rem;
                background-color: #0c95f7;
                color: #fff;
                padding: 0.03rem 0.05rem;
                border-radius: 0.05rem;
                cursor: pointer;
            }

            .not-allow {
                cursor: not-allowed;
                background: #7cb1d7;
                color: #ddd;
                text-decoration: none;
            }
        }

        .file-row {
            display: flex;
            align-items: center;

            img {
                width: 0.32rem;
                height: 0.32rem;
                margin-right: 0.08rem;
            }

            .folder-name {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                span {
                    cursor: pointer;

                    &:hover {
                        color: var(--el-color-primary);
                    }
                }
            }

            .op {
                color: var(--el-color-primary);
                padding-right: 0.1rem;
                margin-left: 0.1rem;
                display: none;

                span {
                    margin-left: 0.1rem;
                    cursor: pointer;
                }

                i {
                    font-size: 0.14rem;
                    margin-right: 0.03rem;
                }
            }

            &:hover {
                .op {
                    display: block;
                }
            }
        }
    }

    .null {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .empty {
            background: url("../../assets/icon-image/no_data.png") center center no-repeat;
            background-size: contain;
            width: 1.2rem;
            height: 1.2rem;
            margin-bottom: 0.1rem;
        }

        .op {
            margin-top: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;

            .op-btn {
                width: 1rem;
                height: 1rem;
                margin: 0 10px;
                padding: 0.05rem 0;
                background: #f1f1f1;
                text-align: center;
                cursor: pointer;

                img {
                    width: 0.6rem;
                    height: 0.6rem;
                }
            }
        }
    }

    .pagination {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        margin-top: 0.1rem;
    }
}
</style>