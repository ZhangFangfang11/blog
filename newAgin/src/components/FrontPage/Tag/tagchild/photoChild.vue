<template>
  <div class="main clearfix photo">
    <h5 class="photos">
      返回  &gt; &gt;
      <router-link to="/photo">
       {{pdata.Pname}}
      </router-link>
    </h5>

    <div class="clearfix">
      <photo-slot v-for="(i,index) in pdata.Plist" :key="index" @click="changeBig($event)">
        <div slot="coverImg">
          <img :src="i.PlistUrl" >
        </div>
        <div slot="coverTitle">
          {{i.PlistName}}
        </div>
      </photo-slot>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import photoSlot from '@/components/FrontPage/photoSlot.vue'
  export default {
    components: {photoSlot},
    data(){
      return {
        id: '',
        change:false,
        pdata: {
          Plist: [],
          Pname: ''
        }
      }
    },
    created(){
      this.id = this.$route.params.id;
      this.$http.get('/api/papi?id=' + this.id).then(res => {
        this.pdata = res.data
        console.log(res)
      })

    },
    methods:{
      changeBig($event){
          this.change=!this.change

        if(this.change){

        }else{
          $event.target.parentNode.parentNode.parentNode.style.width='400px';
          $event.target.parentNode.parentNode.parentNode.style.height='300px';
//          $event.target.parentNode.parentNode.parentNode.style.position='fixed';
//          $event.target.parentNode.parentNode.parentNode.style.bottom='3%';
        }
        $event.target.parentNode.parentNode.parentNode.style.width='400px';
        $event.target.parentNode.parentNode.parentNode.style.height='300px';
        console.log($event.target);
      }
    }
  }
</script>

<style>
  .photo {
    padding: 0 20px;
    box-sizing: border-box;
  }
  .photos {
    font-size: 20px;
    color: #7ec9e3;
    text-align: left;
    margin: 0 0 20px -20px;

  }
  .photos >a{
    color:#0da5da;
  }
 .bigImg{
    width:400px;
    height:300px;

  }
</style>
