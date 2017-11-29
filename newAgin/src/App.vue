<template>
  <div id="app">
    <!--头部导航-->
    <Fheader />
    <router-view/>
    <Ffooter />
  </div>
</template>

<script>
  import Fheader from '@/components/FrontPage/Fheader'
  import Ffooter   from '@/components/FrontPage/Ffooter'

export default {
  name: 'app',
  components:{
    Fheader,
    Ffooter
  }
}
</script>

<style>
#app {
  position: absolute;
  top:0;
  left: 0;
  width:100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:rgb(227,227,229) url("./assets/img/bg.jpg")no-repeat 90% 20%;

}
body,html{
  font-family: 'Arizonia', cursive;
  background-color: rgb(227,227,229);
}
  .main{
    width:1200px;
    min-width:1200px;
    margin:0 auto;
  }

  .clearfix:after{
    display: block;
    content: '';
    height:0;
    clear: both;
  }
</style>
