import Vue from "vue";
import Vuex from 'vuex'
// 使用
Vue.use(Vuex)
// 引入小的仓库
import home from "./home";
import search from "./search";
import detail from './detail'
import cartList from './cartList'
import users from "./users";
import trade from './trade'
// 对外暴露Store类的一个实例
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        cartList,
        users,
        trade,
    }
    
})