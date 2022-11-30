<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view>
      
    </router-view>
    <!-- 在home search显示 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
        // 通知Vuex发送请求，获取数据，存储于仓库
        this.$store.dispatch('categoryList')
        
    },
}
</script>

<style>
</style>
