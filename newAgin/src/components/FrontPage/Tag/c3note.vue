<template>
  <div>
    <my-slot  v-for="(item,index) in tagAry" :key="index">
      <div slot="header" class="tt"  >
        <router-link :to="{name:'c3child',params:{id:item.id}}">{{item.tagTitle}}</router-link>
        <span>时间 :{{item.tagTime}}</span>
      </div>
      <div slot="conMain"  class="tc">
        {{item.tagJian}}
      </div>
    </my-slot>
  </div>
</template>

<script>
  import $ from 'jquery'
  import mySlot from '../solts.vue'
  export default {
    components: {
      mySlot
    },
    data(){
      return {
        tagAry:[]
      }
    },
    created(){
      this.$http.get('/api/c3p').then(res=>{
        this.tagAry=res.data
      })
    }
  }
</script>

<style>
  .tt {
    position: relative;
  }
  .tt > span {
    position: absolute;
    top: 0;
    right: 13px;
  }
  .tc{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>
