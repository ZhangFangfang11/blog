<template>
  <div>
    <my-slot>
      <div slot="header" class="tt"  >
        <router-link to="">{{tag.tagTitle}}</router-link>
        <span>时间 : {{tag.tagTime}}</span>
      </div>
      <div slot="conMain"  >
        {{tag.tagContent}}
      </div>
    </my-slot>
    <div class="fb" ><router-link to="/liuyan" >我要留言</router-link></div>
  </div>
</template>

<script>
  import mySlot from '@/components/FrontPage/solts.vue'
  export default {
    components: { mySlot},
    data(){
      return{
        tag:{
          tagName:'',
          tagTitle:'',
          tagContent:'',
          tagTime:'',
        },
        id:'',
      }
    },
    created(){
      this.id=this.$route.params.id;
      this.$http.get('/api/highp?id='+this.id).then(res=>{
        this.tag=res.data
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
  .fb{
    position: relative;
    top: 0;
    left: 0;
  }
  .fb>a{
    position: absolute;
    top: 0;
    right:10px;
    color: blue;

  }
</style>
