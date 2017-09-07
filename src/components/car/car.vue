<template>
  <div id="car">
    <heads :seller='seller'></heads>
    <div class="tab">
      <div class="tab-item">
       <router-link to="/car/goods" tag="div">商品</router-link>
      </div>
      <div class="tab-item">
       <router-link to="/car/ratings" tag="div">评价</router-link>
       </div>
      <div class="tab-item">
       <router-link to="/car/seller" tag="div">商家</router-link>
       </div>
    </div>
     <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import heads from './header/head.vue'
// 引入url公用函数
import {urlParse} from '../../assets/js/url.js'
const ERR_OK=0;
export default {
  name: 'car',
  data () {
    return {
      'seller':{
        id:(()=>{
          let queryParam=urlParse();
          return queryParam.id
        })
      }
    }
  },
  components:{
    heads
  },
  created: function () {
    this.$http.get('/api/seller?id='+ this.seller.id).then((res) => {
        if(ERR_OK===0){
          // this.seller=res.data.seller;
           this.seller = Object.assign({}, this.seller, res.data.seller);
          console.log(this.seller)
          
        }
      })
      .catch(function(err) {
          console.log(err); // 从数据库获取数据出现问题
});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: rgba(7,17,27,0.1);
}
.tab-item{
  flex:1;
  text-align: center;
}
.tab-item div{
  display: block;
  color:rgb(77,85,93);
  font-size: 14px;
}
.tab-item div.router-link-active{
  color: rgb(240,20,20);
}
</style>
