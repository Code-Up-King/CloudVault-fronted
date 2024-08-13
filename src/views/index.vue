<template>
    <div class="container">
        <div class="header f fac fpj">
            <div class="logo f fac">
                <img src="../assets/logo.png" alt="">
                <div class="name">Easy云盘</div>
            </div>
            <div class="right f fac">
                <el-popover placement="bottom" width="auto" popper-style="padding:0px;border-radius:8px;"
                    trigger="click" :offset="30" :hide-after="10" v-model:visible="data.transferVisible">
                    <template #reference>
                        <i class="iconfont icon-transfer"></i>
                    </template>
                    <template #default>
                        <button>我是弹框内容</button>
                    </template>
                </el-popover>
                <el-dropdown>
                    <div class="user-info f fac">
                        <div class="avatar">
                            <img :src="userInfo.icon" alt="">
                        </div>
                        <span class="nickname">{{ userInfo.username }}</span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="">修改头像</el-dropdown-item>
                            <el-dropdown-item @click="">修改密码</el-dropdown-item>
                            <el-dropdown-item @click="">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="body f">
            <div class="left-sider">
                <AsideMenu />                 
            </div>            
            <div class="body-content f1">我是内容</div>
        </div>
    </div>
</template>

<script setup>
import userInfoStore from '@/stores/user'
import AsideMenu from "@/components/AsideMenu.vue"

const userInfo = userInfoStore()

onBeforeMount(() => {
    userInfo.getUserInfo()
})


const data = reactive({
    transferVisible: false
})
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
</style>
