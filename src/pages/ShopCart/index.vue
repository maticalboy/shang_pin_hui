<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="p in cartInfoList" :key="p.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="p.isChecked == 1"
              @click="changeChecked(p.skuId,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="p.imgUrl">
            <div class="item-msg">{{ p.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ p.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="upDateCartPrice(p.skuId, -1)">-</a>
            <input autocomplete="off" type="text" :value="p.skuNum" minnum="1" class="itxt">
            <a class="plus" @click="upDateCartPrice(p.skuId, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ p.skuNum * p.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(p.skuId)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length!=0" @click="allCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          
          <!-- <a class="sum-btn" @click="$router.push('/trade')">结算</a> -->
          <router-link class="sum-btn"  to="/trade"> 结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 引入节流
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted() {
    this.$store.dispatch("getCartList")
  },
  computed: {
    ...mapGetters({
      cartInfoList: "cartInfoList"
    }),
    // 计算总价
    totalPrice() {
      return this.cartInfoList.reduce((pre, cur) => {
        console.log(pre,  cur.skuNum * cur.skuPrice)
        if (cur.isChecked) {
          return pre + cur.skuNum * cur.skuPrice
        }
        else{
          return pre
        }
      }, 0)
    },
    // 检查全沟
    isAllChecked() {
      console.log("检查全沟")
      return this.cartInfoList.every(item => {
        return item.isChecked == 1
      })

    },
  },
  methods: {
    // 获取购物车数据
    getData() {
      this.$store.dispatch("getCartList")
    },
    // 更新价格
    upDateCartPrice:
      // 节流，防止用户点击过快
      throttle(function (id, price) {
        if (this.cartInfoList[0].skuNum + price <= 0) {
          // alert("点击过快零八")/
          return
        }
        this.$store.dispatch("addOrUpdateShopCart", { skuId: id, skuNum: price })

        this.getData()

      }, 2000),
    // 删除商品
    deleteCart: throttle(async function (skuId) {
      try {
        await this.$store.dispatch("deleteCart", skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }),
    // 更改商品状态
    changeChecked: throttle(async function (skuId,event) {
      try {
        let checked=event.target.checked?1:0
        console.log(skuId, checked,"dandian")
        await this.$store.dispatch("upDateChecked",{skuId,checked})
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }, 1000),
    // 删除所有选中的商品
    async deleteAllChecked() {
      try {
        // 派发action
        await this.$store.dispatch("deleteAllCartChecked")
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 全选按钮点击
    async allCheck(event) {
      try {
        let checked = event.target.checked ? 1 : 0
        await this.$store.dispatch("upDateCartChecked", checked)
        this.getData()
      } catch (error) {
        alert(error.message+"allcheck")
      }

    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }



        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>