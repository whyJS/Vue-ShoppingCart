<template>
<div>
	<div id="goods">
	    <!-- 左侧菜单栏 -->
	    <div class="left" ref="leftWrapper">
	    	<ul>
	    		<li v-for="(val,index) in goods" class="item" :class="{'opt':currentIndex===index,'opt2':currentIndex===index+1}" @click="selectMenu(index,$event)">
	    			<span class="text">
	    				<span v-show="val.type>0" :class="classMAP[val.type]" class="icon"></span>{{val.name}}
	    			</span>
	    		</li>
	    	</ul>
	    </div>
	    <!-- 右侧商品栏 -->
	    <div class="right" ref="rightWrapper">
	    	<ul>
	    		<li v-for="(val,index) in goods" class="food food-list-hook">
	    			<h1 class="food-title">{{val.name}}</h1>
	    			<ul>
	    				<li @click="select(food,$event)" v-for="(food,inde) in val.foods" class="food-item">
	    					<div class="food-icon">
	    						<img width="57" height="57" :src="food.icon" alt="">
	    					</div>
	    					<div class="food-content">
	    						<h2>{{food.name}}</h2>
	    						<p>{{food.description}}</p>
	    						<div class="con-div">
	    							<span>月售{{food.sellCount}}份</span>
	    							<span>好评率{{food.rating}}%</span>
	    						</div>
	    						<div class="food-price">
	    							<span class="now">￥{{food.price}}</span>
	    							<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
	    							<div class="carbtn">
	    								<carbtn :food="food"></carbtn>
	    							</div>
	    						</div>
	    							<!-- 加减 -->
	    						
	    					</div>
	    				</li>
	    			</ul>
	    		</li>
	    	</ul>
	    </div>
	</div>
	<!-- 商品详情页 -->
	<food :food="selectfood" ref="food"></food>
	<!-- 购物车 -->  
	<shopCar :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopCar>

</div>
 
</template>

<script>
const ERR_OK=0;
// 引入better-scroll滚动插件
import BScroll from 'better-scroll'
// 引入购物车组件
import shopCar from '../shopcar/shopcar.vue'
// 引入加减号组件
import carbtn from '../carbtn/carbtn.vue'
// 引入商品详情页组件
import food from '../food/food.vue'
export default {
  data () {
    return {
    	classMAP:['decrese','discount','special','invoice','guarantee'],
    	goods: [],
    	listHeight:[],
    	scrollY:0,
    	selectfood: {}
    }
  },
  props:{
  	seller:{
  		type:Object
  	}
  },
  computed:{
 	currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      // 选中的商品
      selectFoods(){
      	let foods=[];
      	if(this.goods){
      		this.goods.forEach((good)=>{
      		good.foods.forEach((food)=>{
      			if(food.count){
      				foods.push(food)
      			}
      		})
      	})
      	}
      	
      	return foods;
      }
  },
  methods:{
  	//选种商品
  	select(food,e){
		if (!event._constructed) {
          return;
        };
        this.selectfood=food;
        this.$refs.food.show();
                console.log('a1')
  	},
  	selectMenu(index,event){//选中左侧一级菜单
  		if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.rightWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.rightSrcoll.scrollToElement(el, 100);

  	},
  	_initScroll(){
	  	this.leftSrcoll=new BScroll(this.$refs.leftWrapper,{
		    scrollY: true,
		    click: true
		});
		this.rightSrcoll=new BScroll(this.$refs.rightWrapper,{
		    scrollY: true,
		    click: true,
		    probeType:3
		});
		this.rightSrcoll.on('scroll',(pos)=>{
			this.scrollY=Math.abs(Math.round(pos.y));
			// this.leftSrcoll.scrollToElement(this.currentIndex*80, 100);
		})
  	},
  	_calculateHeight(){
  		let foodList = this.$refs.rightWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);//右侧商品的高度
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
  	}
  },
  components:{
  	shopCar,
  	carbtn,
  	food
  },
  created:function(){
  	    this.$http.get('/api/goods')
        .then((res) => {
        if(ERR_OK===0){
          this.goods=res.data.goods;
          // 添加到dom中在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
           this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      })
      .catch(function(err) {
          console.log(err); // 从后台获取数据出现问题
	  });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#goods{
position: absolute;
top: 174px;
bottom: 46px;
width: 100%;
overflow: hidden;
display: flex;
z-index: 0;
}
/*左侧菜单栏*/
#goods .left{
flex: 0 0 80px;
width: 80px;
background: #f3f5f7;
/*overflow: auto;*/
}
#goods .left .item{
display: table;
line-height: 14px;
padding:0 12px 0 12px;
}
#goods .left .item .text{
display: inline-block;
height: 54px;
width: 56px;
font-size: 12px;
color: rgb(7,17,27);
font-weight: 200;
line-height: 14px;
display: table-cell;
vertical-align: middle;
border-bottom: 1px solid rgba(7,17,27,0.1);
text-align: center;
}
#goods .left .item:last-child  .text{
	border-bottom: 0px solid rgba(7,17,27,0.1);
}
/*左侧菜单栏选中样式*/
.opt{
	background: #fff;
}
#goods .left .opt .text{
	border-bottom: 0px solid rgba(7,17,27,0.1);
}
#goods .left .opt2 .text{
	border-bottom: 0px solid rgba(7,17,27,0.1);
}
/*优惠小图标*/
#goods .left .item .text .icon{
	display: inline-block;
	width: 12px;
	height:12px;
	vertical-align: top;
	margin-right: 4px;
	background-size: 12px 12px;
	background-repeat:no-repeat;
	vertical-align: middle;
}

.decrese{
	background-image:url(decrease_3@2x.png); 
}
.discount{
	background-image:url(discount_3@2x.png); 
}
.guarantee{
	background-image:url(guarantee_3@2x.png); 
}
.invoice{
	background-image:url(invoice_3@2x.png); 
}
.special{
	background-image:url(special_3@2x.png); 
}
@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
.decrese{
	background-image:url(decrease_3@3x.png); 
	}
.discount{
	background-image:url(discount_3@3x.png); 
	}
.guarantee{
	background-image:url(guarantee_3@3x.png); 
	}
.invoice{
	background-image:url(invoice_3@3x.png); 
	}
.special{
	background-image:url(special_3@3x.png); 
	}
}
/*右侧商品栏*/
#goods .right{
flex: 1;
/*overflow: auto;	*/
/*position: relative;*/
}
#goods .right .food .food-title{
	padding-left: 14px;
	height: 26px;
	line-height: 26px;
	border-left: 2px solid #d9dde1;
	color: rgb(147,153,159);
	font-size: 12px;
	background: #f3f5f7;
}
.food-item{
	display: flex;
	padding: 18px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.food .food-item:last-child{
	border-bottom: 0px solid rgba(7,17,27,0.1);
	margin-bottom: 0px;
}
.food-item .food-icon{
	flex: 0 0 57px;
	margin-right: 10px;
}
.food-item .food-content{
	flex: 1;
	position: relative;
}
.food-content h2{
	margin:2px 0 8px 0;
	font-size: 14px;
	color: rgb(7,17,27);
	font-weight: 200;
	line-height: 14px;
}
.food-content p{
	margin:8px 0 8px 0;
	font-size: 10px;
	color: rgb(147,153,159);
	font-weight: 200;
	line-height: 10px;
}

/*月售*/
.con-div span:first-child{
	display: inline-block;
	margin-right: 12px;
	font-size: 10px;
	color: rgb(147,153,159);
	font-weight: 400;
	line-height: 10px;
}
.con-div span:last-child{
	display: inline-block;
	margin-right: 12px;
	font-size: 10px;
	color: rgb(147,153,159);
	font-weight: 400;
	line-height: 10px;
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
/*加减按钮*/
.carbtn{
	position: absolute;
	right: 0px;
	bottom:-6px;
}
</style>
