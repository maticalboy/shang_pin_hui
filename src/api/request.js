// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nProgress from "nprogress";
// 引入进度条样式，如果不引入那就没有效果
import "nprogress/nprogress.css";
// 引入仓库
import store from '@/store'
// 1.利用axios的方法创建一个实例
const requests = axios.create({
    // 配置对象
    baseURL: '/api',
    // 代表请求的超时时间
    timeout: 5000,

})

// 请求拦截器：再发送请求前可以检测到
requests.interceptors.request.use((config) => {
    if(store.state.detail.uuid_token){
        config.headers.userTempId=store.state.detail.uuid_token
    }
    if(store.state.users.token){
        config.headers.token=store.state.users.token
    }
    // start进度条开始
    nProgress.start();
    // config:配置对象，对象里面有一个属性，headers请求头
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // done进度条结束
    nProgress.done();
    // 成功的回调函数：服务器响应数据回来
    return res.data
}, (error) => {
    alert("error")
    // 相应失败的回调函数
    return Promise.reject(new Error('faile'))
})



//对外暴露
export default requests