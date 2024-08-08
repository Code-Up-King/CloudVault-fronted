<template>
    <div class="container f">
        <div class="bg f1"></div>
        <div class="login-panel">
            <div class="panel">
                <div class="ewm" @click="data.isWxLogin = true" v-if="!data.isWxLogin" title="微信扫码登录"></div>
                <div class="zh" v-else @click="data.isWxLogin = false" title="账号登录"></div>
                <div class="title">Easy云盘</div>
                <!-- 微信扫码登录 -->
                <div v-if="data.isWxLogin" class="ewm-login f fv fac">
                    <img class="img" src="../assets/ewm-login.png" alt="">
                    <div class="desc">打开微信 扫码二维码</div>                    
                </div>
                <!-- 密码登录 -->
                <el-form v-else :model="data.form" :rules="data.rules" ref="formRef">
                    <el-form-item prop="email">
                        <el-input clearable placeholder="请输入邮箱" v-model.trim="data.form.email" :prefix-icon="User"
                            maxLength="150" />
                    </el-form-item>
                    <el-form-item prop="password" v-if="data.opType == 1">
                        <el-input show-password type="password" placeholder="请输入密码" v-model.trim="data.form.password"
                            :prefix-icon="Lock" maxLength="20" />
                    </el-form-item>

                    <!-- 注册 -->
                    <div v-if="data.opType == 0 || data.opType == 2">
                        <el-form-item prop="emailCode">
                            <div class="send-email-panel f fac">
                                <el-input placeholder="请输入邮箱验证码" v-model.trim="data.form.emailCode"
                                    :prefix-icon="Iphone" />
                                <el-button class="send-mail-btn" type="primary" @click="">获取验证码</el-button>
                            </div>
                            <el-popover placement="left" :width="500" trigger="click">
                                <div>
                                    <p>1、在垃圾箱中查找邮箱验证码</p>
                                    <p>2、在邮箱中头像->设置->反垃圾->白名单->设置邮箱地址白名单</p>
                                    <p>3、将邮箱【2627.311935@qq.com】添加到白名单</p>
                                </div>
                                <template #reference>
                                    <el-link type="primary" :underline="false">未收到邮箱验证码？</el-link>
                                </template>
                            </el-popover>
                        </el-form-item>
                        <el-form-item prop="nickname" v-if="data.opType == 0">
                            <el-input placeholder="请输入昵称" v-model.trim="data.form.nickname" :prefix-icon="User"
                                maxLength="20" />
                        </el-form-item>
                        <!-- 注册密码，找回密码 -->
                        <el-form-item prop="registerPassword">
                            <el-input show-password type="password" placeholder="请输入密码"
                                v-model.trim="data.form.registerPassword" :prefix-icon="Lock" maxLength="20" />
                        </el-form-item>
                        <el-form-item prop="reRegisterPassword">
                            <el-input show-password type="password" placeholder="请再次输入密码"
                                v-model.trim="data.form.reRegisterPassword" :prefix-icon="Lock" maxLength="20" />
                        </el-form-item>
                    </div>

                    <el-form-item prop="checkCode">
                        <div class="check-code-panel f fac">
                            <el-input placeholder="请输入验证码" v-model.trim="data.form.checkCode" :prefix-icon="Iphone"
                                @keyup.enter="submit" />
                            <img :src="data.checkCodeUrl" class="check-code" @click="getQrImg" />
                        </div>
                    </el-form-item>

                    <!-- 登陆 -->
                    <el-form-item v-if="data.opType == 1">
                        <div style="width: 100%;">
                            <div>
                                <el-checkbox v-model="data.rememberMe" label="记住我" />
                            </div>
                            <div class="f fpj">
                                <el-link type="primary" :underline="false" @click="changeType(2)">忘记密码？</el-link>
                                <el-link type="primary" :underline="false" @click="changeType(0)">没有账号？</el-link>
                            </div>
                        </div>
                    </el-form-item>
                    <!-- 找回密码 -->
                    <el-form-item v-if="data.opType == 2">
                        <div class="no-account">
                            <el-link type="primary" :underline="false" @click="changeType(1)">去登陆</el-link>
                        </div>
                    </el-form-item>
                    <!-- 注册 -->
                    <el-form-item v-if="data.opType == 0">
                        <div class="no-account">
                            <el-link type="primary" :underline="false" @click="changeType(1)">已有账号？</el-link>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%" @click="submit">
                            <span v-if="data.opType == 0">注册</span>
                            <span v-if="data.opType == 1">登陆</span>
                            <span v-if="data.opType == 2">重置密码</span>
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { User, Lock, Iphone } from '@element-plus/icons-vue'
import Verify from "@/utils/verify"
const checkRePassword = (rule, value, callback) => {
    if (value !== data.form.registerPassword) {
        callback(new Error(rule.message))
    } else {
        callback()
    }
}

const formRef = ref(null)
const data = reactive({
    opType: 1,
    form: {},
    checkCodeUrl: '',
    isWxLogin: false,
    rules: {
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: Verify.email, message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '密码必须为6-12位', trigger: 'blur' }
        ],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        registerPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '密码必须为6-12位', trigger: 'blur' }
        ],
        reRegisterPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: checkRePassword, message: '两次密码不一致', trigger: 'blur' }
        ],
        checkCode: [{ required: true, message: '请输入图片验证码' }],
        emailCode: [{ required: true, message: '请输入邮箱验证码' }]
    }
})

const changeType = (type) => {
    resetForm()
    data.opType = type
}

// 图片验证码
const getQrImg = () => {
    // data.checkCodeUrl = utils.apiUrl + 'account/qrcode?&t=' + new Date().getTime()
}

// 重置表单
const resetForm = () => {
    // 刷新验证码
    getQrImg()
    formRef.value.resetFields()
    data.form = {}
}

// 登陆，注册，重置密码提交表单
const submit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            console.error('未通过校验')
            return
        }
        let params = {}
        Object.assign(params, data.form)
        // 注册 找回密码
        if (data.opType == 0 || data.opType == 2) {
            params.password = params.reRegisterPassword
            delete params.reRegisterPassword
            delete params.registerPassword
        }
        switch (data.opType) {
            case 0: {
                // 注册
                // http.register(params).then(res => {
                //     ElMessage({ message: res.message, type: 'success' })
                //     changeType(1)
                // })
                console.log(params);

                break
            }
            case 1: {
                // 登录
                // http.login(params).then(res => {
                //     ElMessage({ message: res.message, type: 'success' })
                //     sessionStorage.setItem('yp-account', params)
                //     router.replace('/')
                // })
                console.log(params);
                break
            }
            case 2: {
                // 重置密码
                // http.resetPassword(params).then(res => {
                //     ElMessage({ message: res.message, type: 'success' })
                //     changeType(1)
                // })
                console.log(params);
                break
            }
        }
    })
}

</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    background: url("../assets/bg.jpg");

    .bg {
        background: url("../assets/login_bg.png") center center no-repeat;
        background-size: 8rem;
    }

    .login-panel {
        width: 3.6rem;
        margin-right: 15%;
        margin-top: calc((100vh - 5rem) / 2);

        .panel {
            width: 100%;
            background-color: #fff;
            border-radius: 0.05rem;
            padding: 0.25rem;
            position: relative;

            .ewm {
                position: absolute;
                top: 0;
                right: 0;
                width: 0.48rem;
                height: 0.48rem;
                background: linear-gradient(-135deg, transparent 50%, white 50%), url('../assets/ewm.png');
                background-size: 80%;
                background-repeat: no-repeat;
                background-position: center;
                cursor: pointer;
            }

            .zh {
                position: absolute;
                top: 0;
                right: 0;
                width: 0.48rem;
                height: 0.48rem;
                background: linear-gradient(-135deg, transparent 50%, white 50%), url('../assets/zh.png');
                background-size: 80%;
                background-position: center;
                background-repeat: no-repeat;
                cursor: pointer;
            }

            .ewm-login {
                .img {
                    width: 1.5rem;
                    height: 1.5rem;
                }

                .desc {
                    margin-top: 0.16rem;
                    margin-bottom: 0.2rem;
                }                
            }

            .title {
                text-align: center;
                font-size: 0.18rem;
                font-weight: bold;
                margin-bottom: 0.2rem;
            }

            .send-email-panel {
                .send-mail-btn {
                    margin-left: 0.05rem;
                }
            }

            .check-code-panel {
                width: 100%;

                .el-input {
                    flex: 2;
                }

                .check-code {
                    margin-left: 0.05rem;
                    cursor: pointer;
                    height: 0.3rem;
                    flex: 1;
                }
            }
        }
    }
}
</style>