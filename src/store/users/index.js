import { reqAutoLogin, reqBack, reqGetCode, reqLogin, reqRegister } from "@/api"
import { clearToken, getToken, setToken } from "@/utils/token"

// 登入和注册模块
const state = {
    code: '',
    token:getToken(),//用户token
    userInfo:{

    },//用户信息
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return "success"
        }
        else {
            return Promise.reject(new Error("failed by getCode"))
        }
    },
    // 注册
    async register({ commit }, user) {
        let result = await reqRegister(user)
        // console.log(result)
        if (result.code == 200) {
            // commit("REGISTER",result.data)

            return "success"
        }
        else {
            return Promise.reject(new Error("failed by register"))
        }
    },
    // 登入
    async login({ commit }, user) {
        let result = await reqLogin(user)
        // console.log(result, user)
        if (result.code == 200) {
            commit("LOGIN", result.data.token)
            setToken(result.data.token)
            return "success"
        }
        else {
            return Promise.reject(new Error("failed by login"))
        }
    },
    // 自动登入
    async autoLogin({ commit }) {
        let result = await reqAutoLogin()
        // console.log(result)
        if (result.code == 200) {
            commit("AUTOLOGIN",result.data)
            return "success"
        }
        else {
            return Promise.reject(new Error("failed by autoLogin"))
        }
    },
    async logOut({commit}){
        let result = await reqBack()
        // console.log(result)
        if (result.code == 200) {
            commit("LOGINOUT")
            return "success"
        }
        else {
            return Promise.reject(new Error("failed by LoginOut"))
        }
    }
}
const mutations = {
    GETCODE(state, data) {
        state.code = data
    },
    LOGIN(state, token) {
        state.token = token
    },
    AUTOLOGIN(state,data){
        state.userInfo = data
    },
    LOGINOUT(state){
        state.token=''
        state.userInfo={}
        clearToken()
    }
}
const getters = {

}
export default {
    state,
    actions,
    mutations,
    getters,

}