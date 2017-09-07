<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selecttype2===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selecttype2===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selecttype2===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <!-- 只选有评价的评论 -->
    <div @click="toggleContent($event)" class="switch" :class="{'on':onlyContent2}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
   export default {
  data () {
    return {
      selecttype2: this.selecttype,
      onlyContent2:this.onlyContent
    }
  },
  computed:{
    positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
  },
  props:{
    ratings:{
      type:Array,
      default(){
        return []
      }
    },
    selecttype:{
      type:Number
    },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
  },
  methods:{
    select(type, event) {
        if (!event._constructed) {
          return;
        }        
        this.selecttype2=type;
        this.$emit('select', type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContent2=!this.onlyContent2;
        this.$emit('toggle', this.onlyContent2);
      }
  }

}
</script>

<style scoped>
 .rating-type{
  padding: 18px 0;
  margin: 0 18px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  font-size: 0;
 }

 .block{
  display: inline-block;
  padding: 8px 12px;
  margin-right: 8px;
  border-radius: 1px;
  color: rgb(77,85,93);
  font-size: 12px;
 } 
.active{
color: #fff;
}

.count{
margin-left: 2px;
font-size: 8px;
}
.positive{
  background: rgba(0, 160, 220, 0.2);
}
.positive.active{
background: rgb(0, 160, 220);
} 
.negative{
background: rgba(77, 85, 93, 0.2);
}
.negative.active{
background: rgb(77, 85, 93)  ;    
}

/*选中是否有内容*/
.switch{
padding: 12px 18px;
line-height: 24px;
border-bottom: 1px solid rgba(7, 17, 27, 0.1);
color: rgb(147, 153, 159);
font-size: 0 ;
}

.icon-check_circle{
display: inline-block;
vertical-align: top;
margin-right: 4px;
font-size: 24px;
color: rgb(147, 153, 159);
}
.on .icon-check_circle{
color: #00c850;
}
.text{
  display: inline-block;
vertical-align: top;
font-size: 12px;
}

</style>
