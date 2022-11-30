import Vue from 'vue'
import App from './App.vue'
// 三级联动--全局组件
import TypeNav from '@/components/TypeNav'
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
// 引入路由
import router from '@/router'
Vue.config.productionTip = false
// 引入仓库
import store from '@/store'
// 测试
// import {reqCategoryList} from '@/api'
// reqCategoryList()
// 引入mockServe.js
import '@/mock/mockServe.js'
// 引入轮播图插件
import 'swiper/css/swiper.css'
// 轮播图 ---全局组件
import carouseList from '@/components/CarouselList'
// 注册全局轮播图组件
Vue.component(carouseList.name,carouseList)
// 分页器 ---全局组件
import Pagination from '@/components/Pagination'
// 注册全局分页器组件
Vue.component(Pagination.name,Pagination)
// 统一接口api文件夹里的全部请求函数
import * as API from '@/api'
import { Button, Select,MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 表单插件
import './plugs/validator.js'
new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册store
  store,
  // 配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
}).$mount('#app')
