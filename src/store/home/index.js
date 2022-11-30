// home模块的小仓库

import { reqCategoryList, reqGetBannerList,reqGetFloorList } from "@/api";

// state:仓库存储数据的地方
const state={
    categoryList:[],
    bannerList:[],
    floorList:[]
}
// mutations:修改state的唯一手段
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList=floorList
    }
}
// action:处理action，可以书写自己的业务逻辑，处理异步处理
const actions={
    // 通过api里的函数调用发送请求
    async categoryList({commit}){
        let result=await reqCategoryList()
        console.log(result)
        if(result.code===200){
            // 提交数据
            commit('CATEGORYLIST',result.data)
        }
    },
    async bannerList({commit}){
        let result=await reqGetBannerList()
        console.log(result)
        if(result.code===200){
            // 提交数据
            commit('BANNERLIST',result.data)
        }
    },
    async floorList({commit}){
        let result=await reqGetFloorList()
        console.log(result)
        if(result.code===200){
            // 提交数据
            commit('FLOORLIST',result.data)
        }
    }
}
// getters:计算属性
const getters={}
// 对外暴露
export default{
    // ...
    state,
    mutations,
    actions,
    getters
}