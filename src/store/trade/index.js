import { reqGetAddress, reqGetGoodList } from "@/api"

const state={
    addressInfo:[

    ],
    orderList:[
        
    ],
    tradeNo:''
}
const actions={
    // 获取用户的地址信息
    async getUserAddress({commit}){
        let result=await reqGetAddress()
        if (result.code == 200) {
            commit("GETADDRESS", result.data)
            return "success"
        }
        else {
            return Promise.reject(new Error("failed by Address"))
        }
    },
    // 获取商品列表数据
    async getOrder({commit}){
        let result=await reqGetGoodList()
        if (result.code == 200) {
            commit("GETORDER", result.data)
            return "success"
        }
        else {
            return Promise.reject(new Error("failed by Address"))
        }
    }
}
const mutations={
    GETADDRESS(state,data){
        state.addressInfo=data
    },
    GETORDER(state,data){
        state.orderList=data.detailArrayList
        state.tradeNo=data.tradeNo
    }
}
const getters={

}
export default{
    state,
    actions,
    mutations,
    getters,
}