<template>
    <div class="upload-container">
        <div class="header">
            <span>上传任务</span>
            <span class="tip">（仅展示本次上传任务）</span>
        </div>

        <div class="file-list">
            <template v-if="data.fileList.length > 0">
                <div class="file-item f fac fpj" v-for="(item, index) in data.fileList">
                    <div class="content f1">
                        <div class="file-name">宝马.png</div>
                        <el-progress :percentage="50" />
                        <div>
                            <span>秒传</span>
                        </div>
                    </div>
                    <div class="op">
                        <img src="../assets/icon-image/clean.png" title="清除" alt="">
                    </div>
                </div>
            </template>
            <div v-else class="f fac fpc fv no-data">
                <img src="../assets/icon-image/no_data.png" alt="">
                <span>暂无上传任务</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import statusMap from "@/model/status"
const data = reactive({
    fileList: []
})

const addFile = (file, filePid) => {
    const fileItem = {
        // 文件
        file: file,
        // 文件UID
        uid: file.uid,
        // md5值
        md5: null,
        // 文件名
        filename: file.name,
        // 上传状态
        status: statusMap.init.value,
        // 已上传大小
        uploadSize: 0,
        // 文件总大小
        totalSize: file.size,
        // 上传进度
        progress: 0,
        // 暂停
        pause: false,
        // 取消
        cancel: false,
        // 当前分片
        chunkIndex: 0,
        // 文件父级ID
        filePid: filePid,
        // 错误信息
        errorMsg: null
    }
}

defineExpose({
    addFile
})

</script>

<style lang="scss" scoped>
.upload-container {
    width: 6rem;
    height: 4rem;

    .header {
        font-size: 0.15rem;
        border-bottom: 0.01rem solid #ddd;
        line-height: 0.4rem;
        padding: 0 0.1rem;

        .tip {
            font-size: 0.13rem;
            color: #a9a9a9;
        }
    }

    .file-list {
        height: 100%;
        overflow: auto;
        padding: 0.1rem 0;

        .file-item {
            padding: 0.03rem 0.1rem;
            border-bottom: 0.01rem solid #ddd;

            .op {
                width: 0.28rem;
                height: 0.28rem;
                border-radius: 50%;
                margin-left: 0.5rem;
            }
        }

        .no-data {            
            color: #909399;
            font-size: 0.14rem;
            height: 100%;
            margin-top: -0.4rem;
            img {
                width: 0.8rem;
                height: 0.8rem;
            }
        }
    }
}
</style>