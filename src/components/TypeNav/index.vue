<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container" @mouseleave="changeColor2()" @mouseenter="enterShow()">
            <h2 class="all">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <transition name="sort">
                <div class="sort" v-show="this.showTypeNav">
                    <div class="all-sort-list2" @click.prevent="goSearch">
                        <div class="item" v-for="p in categoryList" :key="p.categoryId"
                            :class="{ cur: currentIndex === p.categoryId }">
                            <h3 @mouseenter="changeColor(p.categoryId)">
                                <a :data-categoryName="p.categoryName" :data-category1Id="p.categoryId">{{
                                        p.categoryName
                                }}</a>
                                <!-- 优化 -->
                                <!-- <a href="" @click.prevent="goSearch">{{ p.categoryName }}</a> -->
                                <!-- route-link卡顿 -->
                                <!-- <router-link to="/search?">{{ p.categoryName }}</router-link> -->
                            </h3>
                            <div class="item-list clearfix"
                                :style="{ display: p.categoryId === currentIndex ? 'block' : 'none' }">
                                <div class="subitem">
                                    <dl class="fore" v-for="pp in p.categoryChild" :key="pp.categoryId">
                                        <dt>
                                            <a :data-categoryName="pp.categoryName" :data-category2Id="pp.categoryId">{{
                                                    pp.categoryName
                                            }}</a>
                                            <!-- 优化 -->
                                            <!-- <a href="" @click.prevent="goSearch">{{ pp.categoryName }}</a> -->
                                            <!-- <router-link to="/search">{{ pp.categoryName }}</router-link> -->
                                        </dt>
                                        <dd>
                                            <em v-for="ppp in pp.categoryChild" :key="ppp.categoryId">
                                                <a :data-categoryName="ppp.categoryName"
                                                    :data-category3Id="ppp.categoryId">{{ ppp.categoryName }}</a>
                                                <!-- 优化 -->
                                                <!-- <a href="" @click.prevent="goSearch">{{ ppp.categoryName }}</a> -->
                                                <!-- <router-link to="/search">{{ ppp.categoryName }}</router-link> -->
                                            </em>

                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </transition>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data() {
        return {
            // 存储用户鼠标移到哪一个数据
            currentIndex: -1,
            showTypeNav: true
        }
    },
    methods: {
        // 点击过快可能出现问题，浏览器反应不过来 加个节流
        changeColor:
            throttle(function (index) {
                this.currentIndex = index
            }, 50)
        // alert(index)

        ,
        changeColor2(index) {
            // console.log("我离开了")
            this.currentIndex = -1
            // 只有meta里的数据是false时才可以改变
            if (this.$route.meta.showTypeNav === false) {
                this.showTypeNav = false
            }

        },
        // goSearch进行路由跳转 编程路由加事件指派 进行传参
        goSearch(e) {
            // this.$router.push({
            //     path:'/search'
            // })
            // console.log(e.target.dataset)
            let { categoryname, category1id, category2id, category3id } = e.target.dataset
            if (categoryname) {
                // 整理参数
                let location = { name: 'search' }
                let query = {
                    categoryName: categoryname,
                }
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                }
                // 判断是否有param参数
                if(this.$route.params){
                    location.params=this.$route.params
                }
                // 整理参数
                location.query = query
                // 路由跳转
                this.$router.push(location)
            }
        },
        // 鼠标移入展示三级菜单（主要针对search）
        enterShow() {
            // console.log("进入了")
            this.showTypeNav = true
        }
    },
    mounted() {
        // 通知Vuex发送请求，获取数据，存储于仓库
        // this.$store.dispatch('categoryList')
        this.showTypeNav = this.$route.meta.showTypeNav
    },
    computed:
        mapState({
            categoryList: state => state.home.categoryList
        })

}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                .cur {
                    background-color: skyblue;
                }
            }
        }
        // 过渡动画
        .sort-enter,.sort-leave-to{
            height: 0px;
        }
        .sort-enter-to,.sort-leave{
            height: 461px;
        }
        // 定义动画时间
        .sort-enter-active,.sort-leave-active{
            transition: all .5s linear;
        }
    }
}
</style>