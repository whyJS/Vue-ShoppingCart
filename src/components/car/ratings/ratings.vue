<template>
  <div class="ratings" ref="ratings">
	   <div class="ratings-content">
       <div class="over-view">
         <div class="over-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
         </div>
         <div class="over-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
         </div>
       </div>
       <!-- 分割块 -->
      <div class="split"></div>
      <!-- 评价列表 -->
      <ratingselect @select="selectx" @toggle="togglex" :ratings="ratings" :selecttype="selectType" :onlyContent="onlyContent"></ratingselect>
              <!-- 商品评价列表 -->
          <div class="rating-wrapper">
            <ul>
              <li class="rating-item" v-for="rating in ratings" v-show="needshow(rating.rateType, rating.text)">
                  <div class="avatar">
                    <img width="28" height="28" :src="rating.avatar">
                  </div>
                  <div class="content">
                    <h1 class="name">{{rating.username}}</h1>
                  <div class="star-wrapper">
                    <star class="star" :size="24" :score="rating.score"></star>
                    <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                  </div>
                  <p class="text">{{rating.text}}</p>
                  <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                    <span class="icon-thumb_up"></span>
                    <span class="item" v-for="item in rating.recommend">{{item}}</span>
                  </div>
                  <div class="time">
                  {{rating.rateTime | formatDate}}
                  </div>
                  </div>
              </li>
            </ul>
            <div class="no-rating">暂无评价</div>
          </div>
     </div>
     
  </div>
</template>

<script>
const ERR_OK=0;
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
import star from '../../star/star.vue'
// 引入评价列表按钮组件
 import ratingselect from '../ratingselect/ratingselect.vue'
 // 引入better-scroll
 import BScroll from 'better-scroll'
 import {formatDate} from '../../../assets/js/data.js'
export default {
  data () {
    return {
      ratings: [],
      selectType:ALL,
      onlyContent: true
    }
  },
  components:{
    star,
    ratingselect
  },
  props:{
    seller:{
      type:Object
    }
  },
  computed:{

  },
  methods:{
    needshow(type,text){
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
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
    }
  },
  created(){
    this.$http.get('/api/ratings')
        .then((res) => {
        if(ERR_OK===0){
          this.ratings=res.data.ratings;
          // 添加到dom中在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
           this.$nextTick(() => {
             this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      })
      .catch(function(err) {
          console.log(err); // 从后台获取数据出现问题
    });
  },
  filters:{
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*分割线*/
.split{
  width: 100%;
  height: 16px;
  border-top: 1px solid rgb(7,17,27,0.1);
  border-bottom: 1px solid rgb(7,17,27,0.1);
  background: #f3f5f7;
}


.ratings{
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
}
.ratings .over-view{
  display: flex;
  padding: 18px 0;

}
/*左侧样式*/
.ratings .over-view .over-left{
  flex: 0 0 137px;
  padding: 6px 0;
  width: 137px;
  border-right: 1px solid rgba(7, 17, 27, 0.1);
  text-align: center;
}
.ratings .over-view .over-left .score{
  margin-bottom: 8px;
  line-height: 12px;
  font-size: 24px;
  color: rgb(255, 153, 0);
}
.ratings .over-view .over-left .title{
  margin-bottom: 8px;
  line-height: 12px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}
.ratings .over-view .over-left .rank{
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
/*右侧样式*/
.over-right{
  flex:1;
  padding: 6px 0 6px 24px;
}
.score-wrapper{
  margin-bottom: 8px;
  font-size: 0;
}
.score-wrapper .title{
   display: inline-block;
  line-height: 18px;
  vertical-align: top;
  font-size: 12px;
  color: rgb(7, 17, 27);
}
.score-wrapper .score{
  display: inline-block;
  line-height: 18px;
  vertical-align: top;
  font-size: 12px;
  color: rgb(255, 153, 0);
}
#star{
  display: inline-block;
  margin: 0 12px 0 0;
  vertical-align: top;
}
.delivery-wrapper{
  font-size: 0;
}
.delivery-wrapper .title{
  line-height: 18px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}
.delivery{
  margin-left: 12px;
  font-size: 12px;
  color: rgb(147, 153, 159); 
}
/*列表样式*/
.rating-wrapper{
padding: 0 18px
}

.rating-item{
display: flex;
padding: 18px 0;
border-bottom: 1px solid rgba(7, 17, 27, 0.1); 
}

.avatar{
flex: 0 0 28px;
width: 28px;
margin-right: 12px;
}

.avatar img{

border-radius: 50%;
}
.content{
position: relative;
flex: 1;
}

.name{
margin-bottom: 4px;
line-height: 12px;
font-size: 10px;
color: rgb(7, 17, 27);
}

.star-wrapper{
margin-bottom: 6px;
font-size: 0;
}

/*.star{
display: inline-block;
margin-right: 6px;
vertical-align: top;
}*/

.delivery{
display: inline-block;
vertical-align: top;
line-height: 12px;
font-size: 10px;
color: rgb(147, 153, 159);
}

.text{
margin-bottom: 8px;
line-height: 18px;
color: rgb(7, 17, 27);
font-size: 12px;
}

.recommend{
line-height: 16px;
font-size: 0;
}

.icon-thumb_up, .item{
display: inline-block;
margin: 0 8px 4px 0;
font-size: 9px;
}

.icon-thumb_up{

color: rgb(0, 160, 220)
}
.item{
padding: 0 6px;
border: 1px solid rgba(7, 17, 27, 0.1);
border-radius: 1px;
color: rgb(147, 153, 159);
background: #fff;
}

.time{
position: absolute;
top: 0;
right: 0;
line-height: 12px;
font-size: 10px;
color: rgb(147, 153, 159);
}

</style>
