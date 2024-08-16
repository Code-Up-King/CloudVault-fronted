<template>
    <div class="menu f">
        <div class="menu-list">
            <div class="menu-item" @click="$router.push(item.path)" :class="{ 'active': $route.path.search(item.path) != -1 }" v-for="item in userInfo.menuList">
                <div class="item-img">                    
                    <i :class="['iconfont', `icon-${item.icon}`]"></i>
                </div>
                <div class="text">{{item.name}}</div>
            </div>
        </div>

        <div class="menu-sub-list">
            <div class="menu-sub-item f fac" @click="$router.push(item.path)" :class="{ 'active': $route.path.search(item.path) != -1 }" v-for="item in menuList">
                <i :class="['iconfont', `icon-${item.icon}`]"></i>
                <span class="text">{{item.name}}</span>
            </div>

            <div class="space-info">
                <div>空间使用</div>
                <div class="percent">
                    <el-progress :percentage="percentage" :show-text="true"></el-progress>
                </div>
                <div class="space-use">
                    <div class="use">
                        {{utils.size2Str((userInfo.userInfo.totalSize - userInfo.userInfo.freeSize) || 0)}} / {{ utils.size2Str(userInfo.userInfo.totalSize || 0) }}
                    </div>
                    <el-icon class="refresh"><Refresh /></el-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import userInfoStore from '@/stores/user'
import utils from '@/utils/utils.js'

const userInfo = userInfoStore()
const route = useRoute()

// 菜单
const menuList = computed(() => {
    return userInfo.menuList.filter(item => item.path.startsWith(`/${route.meta.belong}`))[0]?.children ?? []
})


const percentage = computed(() => {
    if (!userInfo.totalSize) {
        return 0
    }
    return Math.floor((userInfo.freeSize || 0 / userInfo.totalSize) * 10000) / 100
})


</script>

<style lang="scss" scoped>
.menu {
    border-right: 1px solid #f1f2f4;

    .menu-list {
        height: calc(100vh - 0.56rem);
        width: 0.8rem;
        color: #636d7e;
        box-shadow: 0 0.03rem 0.1rem 0 rgba(0, 0, 0, 0.06);
        border-right: 0.01rem solid #f1f2f4;

        .menu-item {
            text-align: center;
            font-size: 0.14rem;
            cursor: pointer;
            padding: 0.16rem 0;

            &:first-child {
                margin-top: 0;
            }

            &:hover {
                background: #f3f3f3;
            }

            .item-img {
                .iconfont {
                    // width: 0.36rem;
                    // height: 0.36rem;
                    font-size: 0.3rem;
                }
            }

            .text {
                max-width: 0.8rem;
                font-weight: 700;
            }
        }

        .active {
            color: #06a7ff;
        }
    }

    .menu-sub-list {
        width: 2rem;
        padding: 0.2rem 0;
        position: relative;

        .menu-sub-item {
            height: 0.4rem;
            line-height: 0.4rem;
            margin-left: 0.12rem;
            width: 1.77rem;
            font-size: 0.14rem;
            font-weight: 400;
            border-radius: 0.08rem;
            cursor: pointer;
            padding-left: 0.5rem;

            &:hover {
                background: #fafafa;
            }

            .iconfont {
                font-size: 0.14rem;
            }

            .text {
                color: #636d7e;
                font-size: 0.14rem;
                margin-left: 0.1rem;
            }
        }

        .active {
            background-color: #eef9fe;
            color: #06a7ff;

            .text {
                color: #06a7ff;
            }
        }

        .tip {
            margin-top: 0.1rem;
            color: #888888;
            font-size: 0.13rem;
        }

        .space-info {
            position: absolute;
            bottom: 0.1rem;
            width: 100%;
            padding: 0 0.2rem;
            font-size: 0.12rem;

            .percent {
                margin-top: 0.02rem;
            }


            .space-use {
                margin-top: 0.04rem;
                color: #afb3bf;
                font-size: 0.12rem;
                display: flex;
                justify-content: space-around;

                .use {
                    flex: 1;
                }

                .refresh {
                    cursor: pointer;
                    color: #05a1f5;
                    font-size: 0.14rem;
                }
            }
        }
    }
}
</style>

<style lang="scss">
    .el-progress__text {
        min-width: 0;
    }
</style>