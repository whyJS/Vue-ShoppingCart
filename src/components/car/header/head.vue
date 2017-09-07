<template>
  <div id="head">
    <div class="content">
    	<div class="content-picture">
    		<img :src="seller.avatar" alt="" width="64" height="64">
    	</div>
    	<div class="content-details">
    		<div class="details-title">
    			<span class="brand"></span>
    			<span class="name">{{seller.name}}</span>
    		</div>
    		<div class="details-terrace">
    			{{seller.description}}/{{seller.deliveryTime}}分钟送达
    		</div>
    		<div v-if="seller.supports" class="details-price">
    			<span class="icon" :class="classMAP[seller.supports[0].type]"></span>
    			<span>{{seller.supports[0].description}}</span>
    		</div>
    	</div>
    	<!-- 多少活动 -->
    	<div class="count" @click="showWin">
    		<span v-if="seller.supports" class="count-num">{{seller.supports.length}}个</span>
    		<span class="count-pic icon-keyboard_arrow_right"></span>
    	</div>
    </div>
    <div class="notice">
    <span class="notice-img"></span>{{seller.bulletin}}<span class="notice-s2 icon-keyboard_arrow_right"></span>
    </div>
    <!-- 背景图片 -->
    <div class="background">
    	<img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <!-- 活动详情弹窗 stack-footer布局-->
    <transition name="win">
    <div class="win" v-show="winShow">
    	<div class="winTop clearfix">
    		<div class="winTopmain">
    			<!-- 大标题 -->
    			<h1 class="winName">{{seller.name}}</h1>
    			<!-- 星级评价 -->
    			<Star class="star" :size="48" :score="seller.score"></Star>
    			<!-- 小标题 -->
    			<div class="title">
    				<div class="line"></div>
    				<div class="text">优惠信息</div>
    				<div class="line"></div>
    			</div>
    			<!-- 活动列表 -->
    			<ul v-if="seller.supports" class="supports">
    				<li v-for="(val,index) in seller.supports">
    					<span class="supports-ico" :class="classMAP[val.type]"></span>
    					<span>{{val.description}}</span>
    				</li>
    			</ul>

    			<!-- 商家公告 -->
    			<div class="title">
    				<div class="line"></div>
    				<div class="text">商家公告</div>
    				<div class="line"></div>
    			</div>
    			<!-- 公告内容 -->
    			<div class="matter">
    				<p>{{seller.bulletin}}</p>
    			</div>
    		</div>
    	</div>
    	<div class="winClose">
    		<img src="./close.png" height="32" width="32" alt="" @click="xclic">
    	</div>    	
    </div>
    </transition>
  </div>
</template>

<script>
import Star from '../../star/star.vue'
export default {
  data () {
    return {
     classMAP:['decrese','discount','special','invoice','guarantee'],
     winShow:false
    }
  },
  props:['seller'],
  computed:{
  },
  methods:{
  	showWin(){
  		this.winShow=true;
  	},
  	xclic(){
  		this.winShow=false;
  	}
  },
  components:{
  	Star
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#head{
	background-color: rgba(7,17,27,0.5);
	position: relative;
}
.content{
	color: #fff;
	padding: 24px 12px 18px 24px;
	font-size: 0px;
	position: relative;
}
.content-picture{
	display: inline-block;
	vertical-align: top;
	
}
.content-picture img{
	border-radius: 2px;
}
.content-details{
	display: inline-block;
	font-size: 14px;
	margin-left: 16px;
}

.details-title{
	margin: 2px 0px 8px 0px;
}
.brand{
	display: inline-block;
	width: 30px;
	height: 18px;
	background-image: url(brand@2x.png);
	background-size: 30px 18px;
	background-repeat: no-repeat;
	vertical-align: top;
}
@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){	
	.brand{
       background-image: url(brand@3x.png);
	}
}
.name{
	font-size: 16px;
	font-weight: bold;
	color: rgb(255,255,255);
	line-height: 18px;
	display: inline-block;
	margin-left: 6px;
}
.details-terrace{
	font-size: 12px;
	font-weight: 200;
	color: rgb(255,255,255);
	line-height: 12px;
	margin-bottom: 10px;
}
.details-price{
	font-size: 10px;
	font-weight: 200;
	color: rgb(255,255,255);
	line-height: 12px;
}

/*优惠小图标*/
.icon{
	display: inline-block;
	width: 12px;
	height:12px;
	vertical-align: top;
	margin-right: 4px;
	background-size: 12px 12px;
	background-repeat:no-repeat;
}

.decrese{
	background-image:url(decrease_1@2x.png); 
}
.discount{
	background-image:url(discount_1@2x.png); 
}
.guarantee{
	background-image:url(guarantee_1@2x.png); 
}
.invoice{
	background-image:url(invoice_1@2x.png); 
}
.special{
	background-image:url(special_1@2x.png); 
}
@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
.decrese{
	background-image:url(decrease_1@3x.png); 
	}
.discount{
	background-image:url(discount_1@3x.png); 
	}
.guarantee{
	background-image:url(guarantee_1@3x.png); 
	}
.invoice{
	background-image:url(invoice_1@3x.png); 
	}
.special{
	background-image:url(special_1@3x.png); 
	}
}

/*活动数目*/
.count{
	position: absolute;
	padding:0px 8px 0px 12px;
	border:0px solid #fff;
	height: 24px;
	right: 12px;
	bottom: 18px;
	border-radius: 12px;
	background-color: rgba(0,0,0,0.2);
}
.count-num{
	font-size: 10px;
	font-weight: 200;
	color: rgb(255,255,255);
	line-height: 24px;
}
.count-pic{
	font-size: 12px;
	font-weight: 200;
	display: inline-block;
	margin-left: 2px;
	line-height: 24px;
	color: rgb(255,255,255);
	vertical-align: top;
}

/*底部公告*/
.notice{
	position: relative;
	height: 28px;
	padding: 10px 22px 0px 12px;
	box-sizing: border-box;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	background-color: rgba(7,17,27,0.2);
	font-size: 10px;
	font-weight: 200;
	color: rgb(255,255,255);
	line-height: 12px;
	vertical-align: top;
}
.notice-img{
	display: inline-block;
	width: 22px;
	height:12px;
	background-image: url(bulletin@2x.png);
	background-size: 22px 12px;
	background-repeat:no-repeat;
	padding-left: 4px;
	position: relative;
	top: -2px;
}
@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){	
	.notice-img{
       background-image: url(bulletin@3x.png);
	}
}

.notice-s1{
	font-size: 10px;
	font-weight: 200;
	color: rgb(255,255,255);
	line-height: 12px;
	display:block;
	vertical-align: top;
}
.notice-s2{
	position: absolute;
	right: 12px;
	color: rgb(255,255,255);
	line-height: 12px;
	top: 10px;
}

/*背景图片*/
.background{
	position: absolute;
	top: 0px;
	left: 0px;
	width:100%;
	height: 100%;
	z-index: -1;
	filter: blur(10px);
}
/*活动详情弹窗开始*/

/*动画开始*/
.win-enter-active{
  transition: all 0.5s
}
.win-leave-active {
  transition: opacity 0.5s
}
.win-enter, .win-leave-active {
  opacity:0;
}
/*动画结束*/
.win{
	position: fixed;
	top: 0px;left: 0px;
	width: 100%;
	height: 100%;
	overflow: auto;
	background: rgba(7,17,27,0.8);
	min-height: 100%;
	z-index: 100;
}
/*sticky footer 布局*/
.clearfix{
	display: inline-block;
}
.clearfix:after{
	display: block;
	content: '.';
	height: 0px;
	line-height: 0px;
	clear: both;
	visibility: hidden;
}
.winTop{
	min-height: 100%;
	width: 100%;
}
.winTopmain{
	margin-top: 64px;
	padding-bottom: 64px;
}
.winClose{
	position: relative;
	width: 32px;
	height: 32px;
	margin:-64px auto 0 auto;
	clear: both;
}

/*内容*/
.winName{
	font-size: 16px;
	font-weight: 700;
	color: rgb(255,255,255);
	line-height: 16px;
	text-align: center;
}
/*五角星*/
.star{
	margin-top: 18px;
	padding: 2px 0px;
	text-align: center;
}
/*小标题*/
.title{
	display: flex;
	width: 80%;
	margin:28px auto 24px auto;	
}
.title .line{
	flex: 1;
	border-bottom: 1px solid rgba(255,255,255,0.2);
	position: relative;
	top: -6px;

}
.title .text{
	font-size: 14px;
	color: #fff;
	font-weight: 700;
	padding: 0 12px;
}

/*活动列表*/
.supports{
	width: 80%;
	margin:28px auto 24px auto;
}
.supports li{
	margin-bottom: 12px;
	font-size: 12px;
	font-weight: 200;
	color: rgb(255,255,255);
	line-height: 12px;
}
.supports-ico{
	display: inline-block;
	width: 16px;
	height: 16px;
	background-size: 16px 16px;
	background-repeat: no-repeat;
	margin: 0px 6px 0px 12px;
	vertical-align: top;
}
/*公告内容*/
.matter{
	width: 80%;
	margin:28px auto 24px auto;	
}
.matter p{
	font-size: 12px;
	font-weight: 200;
	color: rgb(255,255,255);
	line-height: 24px;
}
/*活动详情弹窗结束*/
</style>
