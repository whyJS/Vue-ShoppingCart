import Vue from 'vue'
import Router from 'vue-router'
import Car from '@/components/car/car.vue'

import goods from '@/components/car/goods/goods.vue'
import ratings from '@/components/car/ratings/ratings.vue'
import seller from '@/components/car/seller/seller.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/car',
      name: 'Car',
      component: Car,
      children:[
      {
         path:'/car/goods',
         name: 'goods',
         component: goods,
      },
      {
         path:'/car/seller',
         name: 'seller',
         component: seller,
      },
      {
         path:'/car/ratings',
         name: 'ratings',
         component: ratings,
      },{
      	path:'/car/',
      	 redirect: {
          name:'goods'
         }
      }
      ]
    },
    {
      path: '/',
      redirect: {
        name:'Car'
      }
    }
  ]
})
