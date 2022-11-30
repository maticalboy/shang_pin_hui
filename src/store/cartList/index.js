import { reqDeleteCart, reqGetShopCar, reqUpdateChecked } from "@/api"

const state = {
    cartList: [
        {
            cartInfoList: [

            ]
        }
    ]
}
const actions = {
    // 获取购物车的列表
    async getCartList({ commit }) {
        let result = await reqGetShopCar()
        // console.log(result,"666")
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除商品
    async deleteCart({ commit }, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code == 200) {
            return "success"
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    // 更新商品选中状态
    async upDateChecked({commit},{skuId, checked}) {
        console.log(skuId,checked,"78788")
        let result = await reqUpdateChecked(skuId,checked)
        
        if (result.code == 200) {
            return "success"
        } else {
            return Promise.reject(new Error("failedbyupdata"))
        }
    },
    // 删除全部勾选的商品
    deleteAllCartChecked({dispatch,getters}){
        let PromiseAll=[]
        getters.cartInfoList.forEach(item => {
            if(item.isChecked==true){
                let promise= dispatch("deleteCart",item.skuId)
                PromiseAll.push(promise)
            }
        });
        // 只有全部成功才成功
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    upDateCartChecked({dispatch,getters},checked){
        // console.log(checked)
        let PromiseAll=[]
        getters.cartInfoList.forEach(item=>{
            console.log(item.skuId,checked,"every")
            let promise=  dispatch("upDateChecked",{skuId:item.skuId,checked})
            PromiseAll.push(promise)
        })
        // 只有全部成功才成功
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, data) {
        // console.log("数据已经更改，",data)
        state.cartList = data
    }
}
const getters = {
    // 之前的数据结构不好，更新一下
    cartInfoList(state) {
        if (state.cartList[0])
            return state.cartList[0].cartInfoList || []
        else
            return []
    }
}
export default {
    state,
    actions,
    mutations,
    getters,
}