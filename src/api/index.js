// 所有的api接口进行统一的管理
import requests from "./request.js";
import mockAjax from './mockAjax.js'

// 三级联动的接口
// /api/product/getBaseCategoryList   get   无参数
export const reqCategoryList = () => {
    // 发请求 返回结果是Promise
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get',
    })
}

// 获取首页banner（Home 首页轮播图）
export const reqGetBannerList = () => {
    return mockAjax({
        url: '/banners',
        method: 'get'
    })
}
// 获取floor组建的数据
export const reqGetFloorList = () => {
    return mockAjax({
        url: '/floors',
        method: 'get'
    })
}
// 获取search模块数据
export const reqGetSearchInfo = (params) => {
    // 发请求 返回结果是Promise
    return requests({
        url: '/list',
        method: 'post',
        data: params,
    })
}
// 获取商品详情的接口
export const reqGetDetail = (id) => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/item/${id}`,
        method: 'get',
    })
}
// 将产品添加到购物车中
export const reqAddOrUpdateShopCar = (skuId, skuNum) => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post',
    })
}
// 获取购物车列表
export const reqGetShopCar = () => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/cart/cartList`,
        method: 'get',
    })
}
// 删除购物车的商品
export const reqDeleteCart = (skuId) => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete',
    })
}
// 更新商品的选中状态
export const reqUpdateChecked = (skuId, isChecked) => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get',
    })
}

// 获取注册验证码
export const reqGetCode = (phone) => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get',
    })
}

// 提交注册
export const reqRegister = (data) => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/user/passport/register`,
        method: 'post',
        data,
    })
}
// 登入
export const reqLogin = (data) => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/user/passport/login`,
        method: 'post',
        data,
    })
}
// 自动登入
export const reqAutoLogin = () => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/user/passport/auth/getUserInfo`,
        method: 'get',
    })
}
// 推出登入
export const reqBack = () => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/user/passport/logout`,
        method: 'get',
    })
}
// 获取用户地址信息
export const reqGetAddress = () => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/user/userAddress/auth/findUserAddressList`,
        method: 'get',
    })
}
// 获取商品清单
export const reqGetGoodList = () => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/order/auth/trade`,
        method: 'get',
    })
}
// 传递订单
export const reqSubmitOrder = (tradeNo, data) => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/order/auth/submitOrder/?tradeNo=${tradeNo}`,
        method: 'post',
        data
    })
}
// 获取订单支付信息
export const reqPayment = (orderId) => {
    // 发请求 返回结果是Promise
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get',
    })
}
// 获取支付订单状态
export const reqGetPayStatus=(orderId)=>{
    // 发请求 返回结果是Promise
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get',
    })
}
// 获取订单列表
export const reqGetOrderList=(page,limit)=>{
    // 发请求 返回结果是Promise
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get',
    })
}