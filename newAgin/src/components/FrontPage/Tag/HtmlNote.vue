<template>
  <div>
    <my-solt v-for="(item,index) in tagAry" :key="index">
      <div slot="header" class="tt">
        <router-link :to="{name:'Htmlchild',params:{id:item.id}}">{{item.tagTitle}}</router-link>
        <span>时间 ： {{item.tagTime}}</span>
      </div>
      <div slot="conMain" class="tc">
        {{item.tagJian}}
      </div>
    </my-solt>
  </div>
</template>

<script>
  import mySolt from '../solts.vue'
  export default {
    components: {
      mySolt
    },
    data(){
      return {
        tagAry: []
      }
    },
    created(){
        this.$http.get('/api/htmlp').then(res=>{
            this.tagAry=res.data
        })
    }
  }
</script>

<style>
  .tt {
    position: relative;
  }
  .tc{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .tt > span {
    position: absolute;
    top: 0;
    right: 13px;
  }
</style>
