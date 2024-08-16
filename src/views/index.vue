<template>
    <div class="container">
        <div class="header f fac fpj">
            <div class="logo f fac">
                <img src="../assets/logo.png" alt="">
                <div class="name">Easy云盘</div>
            </div>
            <div class="right f fac">
                <el-popover placement="bottom" width="auto" popper-style="padding:0px;border-radius:8px;"
                    trigger="click" :hide-after="10" v-model:visible="data.transferVisible">
                    <template #reference>
                        <i class="iconfont icon-transfer"></i>
                    </template>
                    <template #default>
                        <FileUploader />
                    </template>
                </el-popover>
                <el-dropdown>
                    <div class="user-info f fac">
                        <div class="avatar">
                            <img :src="userInfo.userInfo.icon" alt="">
                        </div>
                        <span class="nickname">{{ userInfo.userInfo.username }}</span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="openAvatarDialog">修改头像</el-dropdown-item>
                            <el-dropdown-item @click="data.updatePasswordVisible = true">修改密码</el-dropdown-item>
                            <el-dropdown-item @click="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="body f">
            <div class="left-sider">
                <AsideMenu />
            </div>
            <div class="body-content f1">
                <router-view></router-view>
            </div>
        </div>
    </div>

    <!-- 修改头像 -->
    <el-dialog class="dialog" v-model="data.avatarVisible" draggable title="修改头像" width="500">
        <el-form label-width="auto" style="padding-left: 0.6rem;">
            <el-form-item label="昵称">
                <div>{{ userInfo.userInfo.username }}</div>
            </el-form-item>
            <el-form-item label="头像">
                <img class="tx" :src="data.avatarUrl" alt="">
                <el-upload name="file" :show-file-list="false" accept=".png,.PNG,.jpg,.JPG,.jpeg,.gif,.GIF,.bmp,.MP"
                    :multiple="false" :http-request="handleUploadFile">
                    <el-button type="primary">选择</el-button>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="data.avatarVisible = false">取消</el-button>
                <el-button type="primary" @click="updateAvatar">确定</el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog class="dialog" v-model="data.updatePasswordVisible" draggable title="修改密码" width="500"
        :before-close="closeUpdatePasswordDialog">
        <el-form ref="formRef" :rules="data.rules" :model="data.form" label-width="auto">
            <el-form-item label="原密码" prop="oldPassword">
                <el-input placeholder="请输入密码" show-password type="password" v-model="data.form.oldPassword" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input placeholder="请输入密码" show-password type="password" v-model="data.form.newPassword" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input placeholder="请再次输入密码" show-password type="password" v-model="data.form.confirmPassword" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeUpdatePasswordDialog">取消</el-button>
                <el-button type="primary" @click="updatePassword">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import userInfoStore from '@/stores/user'
import AsideMenu from "@/components/AsideMenu.vue"
import FileUploader from "@/components/FileUploader.vue"
import http from '@/api/user'

const userInfo = userInfoStore()
const router = useRouter()

const checkRePassword = (rule, value, callback) => {
    if (value !== data.form.newPassword) {
        callback(new Error(rule.message))
    } else {
        callback()
    }
}

onBeforeMount(() => {
    userInfo.getUserInfo()
})

const formRef = ref(null)
const data = reactive({
    transferVisible: false,
    avatarVisible: false,
    avatarUrl: '',
    updatePasswordVisible: false,
    form: {},
    file: null,
    rules: {
        oldPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '密码必须为6-12位', trigger: 'blur' }
        ],
        newPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '密码必须为6-12位', trigger: 'blur' }
        ],
        confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '密码必须为6-12位', trigger: 'blur' },
            { validator: checkRePassword, message: '两次密码不一致', trigger: 'blur' }
        ]
    }
})

// 打开修改头像对话框
const openAvatarDialog = () => {
    data.avatarUrl = userInfo.userInfo.icon
    data.avatarVisible = true
}

// 选择图片
const handleUploadFile = (file) => {
    file = file.file
    data.file = file
    let img = new FileReader()
    img.readAsDataURL(file)
    img.onload = ({ target }) => {
        data.avatarUrl = target.result
    }
}

// 更新头像TODO
const updateAvatar = () => {
    const params = new FormData()
    params.append('image', data.file)
    http.upload(params).then(res => { 
        http.updateInfo({
            username: userInfo.userInfo.username,
            headImg: res.data.url
        }).then(result => {
            ElMessage({ message: result.msg, type: 'success' })
            userInfo.getUserInfo()
            data.avatarVisible = false
        })      
    })    
}

// 关闭修改密码对话框
const closeUpdatePasswordDialog = () => {
    formRef.value.resetFields()
    data.form = {}
    data.updatePasswordVisible = false
}

// 修改密码
const updatePassword = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            console.error('未通过校验')
            return
        }
        let params = {
            ...data.form
        }
        http.updatePassword(params).then(res => {
            ElMessage({ message: res.msg, type: 'success' })
            data.updatePasswordVisible = false
            ElMessageBox.confirm(
                '用户信息已失效，请重新登录',
                '提示',
                {
                    confirmButtonText: '确定',
                    type: 'warning',
                    showCancelButton: false,
                    showClose: false,
                    closeOnClickModal: false,
                    closeOnPressEscape: false
                }
            ).then(() => {
                sessionStorage.removeItem('token')
                router.push('/login')
                userInfo.clearInfo()
            })
        })

    })
}

// 退出登录
const logout = () => {
    ElMessageBox.confirm(
        '是否退出当前登录?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        sessionStorage.removeItem('token')
        router.push('/login')
        userInfo.clearInfo()
    })
}

</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100vh;

    .header {
        box-shadow: 0 0.03rem 0.1rem 0 rgb(0 0 0 / 6%);
        height: 0.56rem;
        padding-left: 0.24rem;
        padding-right: 0.24rem;
        position: relative;
        z-index: 200;

        .logo {
            img {
                width: 0.4rem;
                height: 0.4rem;
            }

            .name {
                font-weight: bold;
                margin-left: 0.05rem;
                font-size: 0.25rem;
                color: #05a1f5;
            }
        }

        .right {
            .iconfont {
                font-size: 0.16rem;
            }

            .user-info {
                margin-right: 0.1rem;
                cursor: pointer;

                &:focus-visible {
                    outline: none;
                }

                .avatar {
                    margin: 0px 0.05rem 0px 0.15rem;
                    width: 0.46rem;
                    height: 0.46rem;
                    border-radius: 50%;
                    overflow: hidden;
                }

                .nickname {
                    color: #05a1f5;
                }
            }
        }
    }

    .body {
        height: calc(100vh - 0.56rem);
    }
}

.dialog {
    .tx {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.1rem;
    }
}

:deep(.el-form-item__content) {
    align-items: end !important;
}
</style>
