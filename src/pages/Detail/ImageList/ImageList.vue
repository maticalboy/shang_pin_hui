<template>
  <div class="swiper-container" ref="skuImgList">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="p,index in skuImgList" :key="p.id">
        <img :class="{active:currentIndex==index}" @click="change(index)" :src="p.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <!-- <div class="swiper-pagination"></div> -->

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: "ImageList",
  props: ["skuImgList"],
  data(){
    return {
      currentIndex:0,
    }
  },
  methods:{
    // 修改响应式数据数据
    change(index){
      this.currentIndex=index
      // 给兄弟送索引值，展示大图
      this.$bus.$emit('zoom',index)
    }
  },
  watch: {
    skuImgList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs["skuImgList"], {
            //direction: 'vertical', // 垂直切换选项
            // loop: true, // 循环模式选项
            slidesPerView: 3,//3个一组
            slidesPerGroup: 1,//每次移动多少
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,//设置小原店面可以切换
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
            },
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>