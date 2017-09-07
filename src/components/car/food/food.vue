<template>
<transition name="move">
  <div id="food" v-show="showFlag" ref="food">
  <div class="wrapper">

    	<div class="food-content">
         <div class="img-header">
           <img :src="food.image" alt="">
           <div  class="img-icon" @click="hide">
             <span class="icon-arrow_lift"></span>
           </div>
         </div>
         <div class="content">
           <h1 class="title">{{food.name}}</h1>
           <div class="detail">
             <span class="detail-s1">月售{{food.sellCount}}份</span>
              <span class="detail-s2">好评率{{food.rating}}%</span>
           </div>
            <div class="food-price">
              <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              <div class="carbtn">
                <!-- <carbtn :food="food"></carbtn> -->
              </div>
            </div>
         </div>
         <div class="carcontent-wrapper" v-show="food.count>0">
           <carbtn :food="food"></carbtn>
         </div>
         <div @click="addfood(food,$event)" class="buy" v-show="!food.count || food.count===0">
           加入购物车
         </div>
      </div>
        <!-- 分割块 -->
      <div class="split"></div>
      <!-- 商品介绍 -->
      <div class="info" v-show="food.info">
        <h1>商品信息</h1>
        <p>{{food.info}}</p>
      </div>
       <!-- 分割块 -->
      <div class="split"></div>
      <!-- 商品评价 -->
      <div class="rating">
        <h1 class="rating-title">商品评价</h1>
        <ratingselect @select="selectx" @toggle="togglex" :selecttype="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
        <!-- 商品评价列表 -->
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item border-1px" v-show="needshow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
          
      </div>
  </div>
     
  </div>
  </transition>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
import BScroll from 'better-scroll';
import carbtn from '../carbtn/carbtn.vue'
 import Vue from 'vue'
 import ratingselect from '../ratingselect/ratingselect.vue'
 import {formatDate} from '../../../assets/js/data.js'
export default {
  data () {
    return {
      showFlag:false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  props:{
    food:{
      type:Object
    }
  },
  methods:{
    show(){
      this.showFlag=true;
      // this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.food, {
          scrollY: true,
          click: true          
        });
      } else {
        this.scroll.refresh();
      }
    });
    },
     hide(){
      this.showFlag=false;
    },
    addfood(food,event){
      if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
    },
    selectx(xx){//子组件给父组件传值，通过$emit,父组件注册事件
      this.selectType = xx;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
    },
     togglex(xx){//子组件给父组件传值，通过$emit,父组件注册事件
      this.onlyContent=xx;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
    },
        needshow(type,text){
      if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
    }

  },
  components:{
    carbtn,
    ratingselect
  },
  filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
  computed:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#food{
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 48px;
  z-index: 30;
  background: #fff;
  width: 100%;
}
.move-enter-active,.move-leave-active{
  transition: all .2s
}
.move-enter,.move-leave-to{
  transform: translateX(100%);
 /* opacity: 0;*/
}
.food-content{
  font-size: 0;
   position: relative;
}
 .img-header {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
 }
 .img-header img{
  position: absolute;
  top: 0;
  left: 0px;
  width: 100%;
  height: 100%;
 } 
 .img-icon{
position: absolute;
top: 10px;
left: 0;
 }  
 .icon-arrow_lift{
  display: block;
  padding: 10px;
  font-size: 20px;
  color: #fff;
 }



 .content{
  padding: 18px;

 }
 .content h1{
  line-height: 14px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(7,17,27);
 }
 .detail{
  margin-bottom: 18px;line-height: 10px;
  font-size: 0;
  height: 10px;
 }
 .detail-s1,.detail-s2{
  font-size: 10px;
  color: rgb(157,153,159);
 }
 .detail-s1{
  margin-right: 12px;
 }
 .now{
  font-weight: 700;
  line-height: 24px;
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240,20,20);
}
.old{
  font-weight: 700;
  line-height: 24px;
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147,153,159);
}

/*加入购物车样式*/
.carcontent-wrapper{
  position: absolute;
  right: 18px;
  bottom: 12px;
}
.buy{
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 10;
  line-height: 22px;
  height: 24px;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 10px;
  border-radius: 12px;
  background: rgb(0,160,220);
  color: #fff;
}
/*分割线*/
.split{
  width: 100%;
  height: 16px;
  border-top: 1px solid rgb(7,17,27,0.1);
  border-bottom: 1px solid rgb(7,17,27,0.1);
  background: #f3f5f7;
}
/*商品信息*/
.info{
  padding:18px;
}
.info h1{
  line-height: 14px;
  margin-bottom: 6px;font-size: 14px;
  color: #07111b;
}
.info p{
 line-height: 24px;
  margin-bottom: 6px;font-size: 12px;
  color: rgb(77,85,93);
  padding: 0 8px;
}

/*商品评价*/
.rating{
  padding-top: 18px;
}
.rating .rating-title{
  line-height: 14px;
  margin-left: 18px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
/*商品评价列表*/
.rating-wrapper{
padding: 0 18px;
}

.rating-item{
position: relative;
padding: 16px 0;
border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}


.user{
position: absolute;
right: 0;
top: 16px;
line-height: 12px;
font-size: 0 ;
}

.name{
display: inline-block;
margin-right: 6px;
vertical-align: top;
font-size: 10px;
color: rgb(147, 153, 159);
}

.avatar{

border-radius: 50%
}
.time{
margin-bottom: 6px;
line-height: 12px;
font-size: 10px;
color: rgb(147, 153, 159);
}

.text{
line-height: 16px;
font-size: 12px;
color: rgb(7, 17, 27);
}

.icon-thumb_up, .icon-thumb_down{
 margin-right: 4px;
line-height: 16px;
font-size: 12px;
}

.icon-thumb_up{

color: rgb(0, 160, 220)
}
.icon-thumb_down{
color: rgb(147, 153, 159)
}

.no-rating{
padding: 16px 0;
font-size: 12px;
color: rgb(147, 153, 159);
}
         
</style>
