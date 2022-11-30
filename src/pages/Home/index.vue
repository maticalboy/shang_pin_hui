<template>
  <div>
    <Header></Header>
    <!-- 三级联动--全局组件 -->
    <TypeNav></TypeNav>
    <!-- 轮播图 -->
    <ListContainer></ListContainer>
    <!-- 推荐栏 -->
    <Recommend></Recommend>
    <!-- 热卖排行 -->
    <Rank></Rank>
    <!-- 我的喜欢 -->
    <Like></Like>
    <!-- 楼层 -->
    <Floor v-for="p in floorList" :key="p.id" :floorList="p"></Floor>
    <!-- 图标 -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: mapState({
    floorList: state => state.home.floorList
  }),
  methods: {

  },
  async mounted() {
    this.$store.dispatch('floorList')
    // try {
    //   // 获取用户信息在首页展示
    //   await this.$store.dispatch("autoLogin")
    //   this.$router.push({
    //     path: '/home'
    //   })
    // } catch (error) {
    //   alert(error.message)
    // }

  }
}
</script>

<style>

</style>