<template>
    <div class="menu f">
        <div class="menu-list">
            <div class="menu-item active">
                <div class="item-img">                    
                    <i class="iconfont icon-cloude"></i>
                </div>
                <div class="text">首页</div>
            </div>
            <div class="menu-item">
                <div class="item-img">
                    <i class="iconfont icon-share"></i>
                </div>
                <div class="text">分享</div>
            </div>
            <div class="menu-item">
                <div class="item-img">
                    <i class="iconfont icon-del"></i>
                </div>
                <div class="text">回收站</div>
            </div>
        </div>

        <div class="menu-sub-list">
            <div class="menu-sub-item active f fac">
                <i class="iconfont icon-all"></i>
                <span class="text">全部</span>
            </div>
            <div class="menu-sub-item f fac">
                <i class="iconfont icon-video"></i>
                <span class="text">视频</span>
            </div>
            <div class="menu-sub-item f fac">
                <i class="iconfont icon-music"></i>
                <span class="text">音频</span>
            </div>
            <div class="menu-sub-item f fac">
                <i class="iconfont icon-image"></i>
                <span class="text">图片</span>
            </div>
            <div class="menu-sub-item f fac">
                <i class="iconfont icon-doc"></i>
                <span class="text">文档</span>
            </div>
            <div class="menu-sub-item f fac">
                <i class="iconfont icon-more"></i>
                <span class="text">其他</span>
            </div>


            <div class="space-info">
                <div>空间使用</div>
                <div class="percent">
                    <el-progress :percentage="percentage" :show-text="true"></el-progress>
                </div>
                <div class="space-use">
                    <div class="use">
                        {{utils.size2Str(userInfo.freeSize || 0)}} / {{ utils.size2Str(userInfo.totalSize || 0) }}
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