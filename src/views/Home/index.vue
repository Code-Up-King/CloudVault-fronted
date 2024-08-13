<template>
    <div class="container">
        <div class="top">
            <el-upload :show-file-list="false" :with-credentials="true" :multiple="true" :http-request="addFile"
                :accept="fileAccept">
                <el-button type="primary">
                    <i class="iconfont icon-upload"></i>
                    上传</el-button>
            </el-upload>

            <el-button type="success" v-if="isAllMenu"><i class="iconfont icon-folder-add"></i>新建文件夹</el-button>
            <el-button type="danger" disabled><i class="iconfont icon-del"></i>批量删除</el-button>
            <el-button type="warning" disabled><i class="iconfont icon-move"></i>批量移动</el-button>
            <el-input v-model="data.fileName" style="width: 3rem;" placeholder="请输入文件名" :suffix-icon="Search" />
        </div>

        <div class="navigation">全部文件</div>
        <div class="table" v-if="data.total > 0">

        </div>
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
                <div class="op-btn" v-if="isAllMenu">
                    <img src="../../assets/icon-image/folder.png" alt="">
                    <div>新建目录</div>
                </div>
            </div>
        </div>
        <div class="pagination" v-if="data.total > 0">
            <el-pagination v-model:current-page="data.pageNum" v-model:page-size="data.pageSize" background
                layout="total, sizes, prev, pager, next, jumper" :total="data.total" @size-change=""
                @current-change="" />
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import category from '@/model/category'
const route = useRoute()
const router = useRouter()

const data = reactive({
    fileName: "",
    pageNum: 1,
    pageSize: 20,
    total: 0,
    category: 'all'
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

watch(
    () => router.currentRoute.value,
    (newValue) => {
        data.category = newValue.name.toLowerCase()        
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