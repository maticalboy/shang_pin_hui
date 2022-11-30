import { reqAddOrUpdateShopCar, reqGetDetail } from "@/api"
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{

    },
    uuid_token:getUUID()
}
const actions = {
    // 获取商品详情
    async getDetail({ commit }, id) {
        let result = await reqGetDetail(id)
        // alert(id)
        if(result.code==200)
        commit('GETDETAIL', result.data)
    },
    // 将产品添加到购物车
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // console.log(skuId,skuNum)
        let result = await reqAddOrUpdateShopCar(skuId,skuNum)
        if(result.code==200){
            return "success"
        }else{
            return Promise.reject(new Error("failed"))
        }
    }
}
const mutations = {
    GETDETAIL(state, data) {
        state.goodInfo=data
        // console.log()
    },
}
const getters = {
    // 路径导航简化数据
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    // 产品信息数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }


}
export default {
    state,
    actions,
    mutations,
    getters,
}