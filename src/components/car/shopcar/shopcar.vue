<template>
  <div id="shopcar">
    <div class="content" @click="togglelist()">
      <!-- 购物车左侧区块 -->
      <div class="content-left">
      <!-- 购物车图标 -->
        <div class="logo-wrapper">
          <div class="logo" :class="{'logo2':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'icon2':totalCount>0}"></span>
          </div>
          <!-- 小红点 -->
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <!-- 价格 -->
        <div class="price" :class="{'price2':totalPrice>0}">
          ￥{{totalPrice}}
        </div>
        <!-- 配送价 -->
        <div class="delivery-cost">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <!-- 购物车右侧区块 -->
      <div class="content-right">
        <div class="pay" :class="{'pay2':this.totalPrice >= this.minPrice}">
          {{payDes}}
        </div>
      </div>
    </div>

    <!-- 购物车小球 -->
<!--     <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
    </div> -->
    <div class="shopcar-list" v-show="listshow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="listConent">
        <ul >
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="carbtn">
              <carbtn :food="food"></carbtn>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="list-mask" v-show="listshow" @click="close()"></div>
  </div>
</template>

<script>
// 引入加减号组件
import carbtn from '../carbtn/carbtn.vue'
// 引入better-scroll滚动插件
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      // balls:[
      //   {
      //     show:false
      //   },
      //   {
      //     show:false
      //   },
      //   {
      //     show:false
      //   },
      //   {
      //     show:false
      //   },
      //   {
      //     show:false
      //   }
      // ]
      list:true
    }
  },
  props:{
    deliveryPrice:{
      type:Number
    },
    minPrice:{
      type:Number
    },
    // 用于计算传到购物车上的商品总价等数据
    selectFoods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  computed:{
    totalPrice(){//总价
      let total=0;
      this.selectFoods.forEach((food)=>{
        total+=food.price*food.count;
      })
      return total;
    },
    totalCount(){//总数量
      let total=0;
      this.selectFoods.forEach((food)=>{
        total+=food.count;
      })
      return total;
    },
    payDes(){//起送
      if(this.totalPrice===0){
        return `￥${this.minPrice}起送`
      }else if(this.totalPrice < this.minPrice){
        return `还差${this.minPrice-this.totalPrice}起送`
      }else{
        return `去结算`
      }
    },

    //折叠页
    listshow(){
      if(!this.totalCount){
        this.list=true;
        return false;
      }
      let aa=!this.list;
      if(aa){
        this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
        });
      }
    
      return aa;
    }
  },
  components:{
    carbtn
  },
  methods:{
   //清空
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    close(){
      this.list=!this.list;
    },
    togglelist(){
      if(!this.totalCount){
        return ;
      }
      this.list=!this.list;
    },
    _initScroll(){
      if(!this.scoll){
        this.scoll=new BScroll(this.$refs.listConent,{
        scrollY: true,
        click: true
        });
      }else{
        this.scoll.refresh()
      }
      
    },
    _calculateHeight(){
     
    }
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shopcar-list{
  position: absolute;
  left: 0px;
  bottom: 0px;
  z-index: -1;
  width: 100%;
}
.shopcar-list .list-header{
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.shopcar-list .list-header .title{
  float: left;
  font-size: 14px;
  color: rgb(7, 17, 27)
}
.shopcar-list .list-header .empty{
  float: right;
  font-size: 12px;
  color: rgb(0, 160, 220)
}
.list-content{
  padding: 0 18px;
  max-height: 217px;
  overflow: hidden;
  background: #fff;
  margin-bottom: 46px;
  box-sizing: border-box;
}

/********/
.food{
  position: relative;
  padding: 12px 0;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.food .name{
  line-height: 24px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.food .price{
  position: absolute;
  right: 90px;
  bottom: 12px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(240, 20, 20);
}
.food .carbtn{
  position: absolute;
  right: 0;
  bottom: 6px;
}

/*背景*/
  .list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    opacity: 1;
    background: rgba(7, 17, 27, 0.6);
  }
    

/*小球运动动画*/
/*.ball{

}*/
/*.fade-enter-active{
transition: all .5s ease;
  
}
.fade-leave-active{
transition: all .5s ease; 
} 
.fade-enter,.fade-leave-active{
  opacity: 0;
  transform: translate3d(24px, 0, 0)
}*/


#shopcar{
	position: fixed;
	bottom: 0px;
  left: 0px;
  z-index: 50;
  width: 100%;
  height: 48px;
  background: #000;
}
/*内容区块*/
.content{
  display: flex;
  background: #141d27;
  height: 48px;
}
/*左侧区块*/
.content-left{
  flex: 1;
}
.logo-wrapper{
  display: inline-block;
  position: relative;
  top: -10px;
  margin:0 12px;
  padding: 6px;
  width: 56px;
  height: 56px;
  box-sizing: border-box;
  border-radius: 50%;
  vertical-align: top;
  background: #141d27;
}
.logo{
  width: 100%;
  height: 100%;
  background: #2b343c;
  border-radius: 50%;
  text-align: center;
}
.logo2{
  background: rgb(0,160,220);
}
.icon-shopping_cart{
  font-size: 24px;
  color: #80858a;
  line-height: 44px;
}
.icon2{
  color: rgb(255,255,255)
}
/*数量小红点*/
.num{
  position: absolute;
  top: 0px;
  right: 0px;
  width: 24px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 16px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: rgb(240,20,20);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
}

/*价格*/
.price{
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  line-height: 24px;
  box-sizing: border-box;
  padding-right: 12px;
  border-right: 1px solid rgba(255,255,255,0.1);
  font-size: 16px;
  font-weight: 700;
  color: rgba(255,255,255,0.4);

}
.price2{
  color: #fff;
}
/*配送价*/
.delivery-cost{
  display: inline-block;
  vertical-align: top;
  margin:12px 0 0 12px;
  line-height: 24px;
  color: rgba(255,255,255,0.4);
  font-size: 10px;
}
/*右侧区块*/
.content-right{
  flex: 0 0 105px;
  width: 105px;
}
/*.content-right2{

}*/
.pay{
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  font-weight: 700;
  background: #2b333b;
}
.pay2{
  color: #fff;
   background: #00b43c;
}
</style>
