
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import paySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
    // 配置路由
    export default [
        {
            path:'/home',
            component:Home,
            meta:{showFooter:true,showTypeNav:true}
        },
        {
            path:'/center',
            component:Center,
            meta:{showFooter:true,showTypeNav:true},
            children:[
                {
                    path:'myOrder',
                    component:MyOrder,
                },
                {
                    path:'groupOrder',
                    component:GroupOrder,
                },
                {
                    path:'/center',
                    redirect:'/center/myOrder'
                }
            ],
            beforeEnter: (to, from, next) => {
                if(from.path=='/paySuccess'){
                    next()
                }
                else{
                    next(false)
                }
            }
        },
        {
            name:'search',
            path:'/search/:keyword?',
            component:Search,
            meta:{showFooter:true,showTypeNav:false},
            // 路由传递props参数
            // 1.布尔写法
            // props:true
            // 2.对象写法
            // props:{a:1}
            // 3.函数写法
            props:($route)=>{
                return {keyword:$route.params.keyword}
            }
        },
        {
            path:'/register',
            component:Register,
            meta:{showFooter:false,showTypeNav:true}
        },
        {
            path:'/login',
            component:Login,
            meta:{showFooter:false,showTypeNav:true}
        },
        {
            path:'/detail/:id?',
            component:Detail,
            meta:{showFooter:false,showTypeNav:false}
        },
        {
            path:'/addcartsuccess',
            component:AddCartSuccess,
            meta:{showFooter:true,showTypeNav:false}
        },
        {
            path:'/shopcart',
            component:ShopCart,
            meta:{showFooter:true,showTypeNav:false}
        },
        {
            path:'/trade',
            component:Trade,
            meta:{showFooter:true,showTypeNav:false},
            beforeEnter: (to, from, next) => {
                if(from.path=='/shopcart'){
                    next()
                }
                else{
                    next(false)
                }
            }
        },
        {
            path:'/pay',
            component:Pay,
            meta:{showFooter:true,showTypeNav:false},
            beforeEnter: (to, from, next) => {
                if(from.path=='/trade'){
                    next()
                }
                else{
                    next(false)
                }
            }
        },
        {
            path:'/paySuccess',
            component:paySuccess,
            meta:{showFooter:true,showTypeNav:false},
            beforeEnter: (to, from, next) => {
                if(from.path=='/pay'){
                    next()
                }
                else{
                    next(false)
                }
            }
        },
        // 重定向
        {
            path:'*',
            redirect:'/home'
        },
    ]