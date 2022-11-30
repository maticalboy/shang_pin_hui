// 配置路由
import Vue from "vue";
import VueRoute from 'vue-router'
// 引入store
import store from '../store'
// 使用插件
Vue.use(VueRoute)
import routes from '@/router/routes'
import { clearToken } from "@/utils/token";
// 先把VueRoute上的push/replace先保存一致
let push = VueRoute.prototype.push
let replace = VueRoute.prototype.replace
// 重写push/replace
VueRoute.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // apply和call区别
        // call和apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组
        push.call(this, location, resolve, reject)
    } else {
        push.call(this, location, () => { }, () => { })
    }
}
VueRoute.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // apply和call区别
        // call和apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组
        replace.call(this, location, resolve, reject)
    } else {
        replace.call(this, location, () => { }, () => { })
    }
}
// 配置路由
let router = new VueRoute({
    // 配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
// 全局前置路由守卫
router.beforeEach(async (to, from, next) => {
    // next();
    // 获取用户信息
    let userInfo = store.state.users.userInfo
    // 获取登入令牌
    let token = store.state.users.token
    // 已登入
    if (token) {
        // 不能前往登入页面
        if (to.path == '/login') {
            next('/home')
        } 
        // 去其他页面，刷新的话用户信息失去
        else {
            if (userInfo.name) {
                next()
            }
            else {
                try {
                    // 获取用户信息
                    await store.dispatch("autoLogin")
                    next()
                } catch (error) {
                    // token失效 清除token 退出登入
                    store.dispatch("logOut")
                    next("/login")
                    // alert(error.message)
                }
            }
        }
    } 
    // 未登入
    else {
        // 不能去交易相关的  支付相关 订单相关的页面
        if(to.path.indexOf('/trade')!=-1||to.path.indexOf('/pay')!=-1||to.path.indexOf('/center')!=-1)
        next('/login?redirect='+to.path)
        else
        next()
    }
    // console.log(token)
})
export default router