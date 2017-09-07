<template>
  <div id="carbtn">
  	<transition name="fade">
    <div class="decrease icon-remove_circle_outline" v-show="food.count" @click.stop="deccount($event)"></div>
    </transition>
    <div class="count" v-show="food.count">{{food.count}}</div>
    <div class="add icon-add_circle" @click.stop="addcount($event)"></div>
  </div>
</template>

<script>
 import Vue from 'vue';
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
  	food:{
  		type:Object
  	}
  },
  methods:{
  	addcount(event){//添加商品
  		console.log('aa')
  		// if (!event._constructed) {
    //       return;
    //     }
  		if(!this.food.count){
  			Vue.set(this.food,'count',1)
  		}else{
  			this.food.count++;
  		}
  	},
  	deccount(event){//j减少商品
  		if (!event._constructed) {
          return;
        }
  		if(this.food.count){
  			this.food.count--
  		}
  	}
  },
  created(){
  	// console.log(this.food)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#carbtn{

}
#carbtn .decrease{
	display: inline-block;
	padding: 6px;
	line-height: 24px;
	font-size: 24px;
	vertical-align: middle;
}
.icon-remove_circle_outline{
color: rgb(0,160,220);
}
#carbtn .count{
	display: inline-block;
	line-height: 24px;
	font-size: 10px;
	color: rgb(147,153,159);
	width: 12px;
	text-align:center;
	vertical-align: top;
	padding-top: 6px;
}
.icon-add_circle{
color: rgb(0,160,220);

}
#carbtn .add{
	display: inline-block;
	line-height: 24px;
	font-size: 24px;
	padding: 6px;
	vertical-align: top;
}
/*小球出现动画*/
.fade-enter-active{
transition: all .5s ease;
  
}
.fade-leave-active{
transition: all .5s ease;	
} 
.fade-enter,.fade-leave-active{
	opacity: 0;
	transform: translate3d(24px, 0, 0)
}

</style>
