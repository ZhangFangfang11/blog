<template>
  <div class="allB main">
    <div class="Htitle">
      <h1><a href="javascript:;">小菜瓜</a></h1>
      <p class="yan">你曾说过不分离 要一直一直在一起　现在我想问问你 是否只是童言无忌 今夕何夕 青草离离 明月夜送君千里 等来年 秋风起.......</p>
    </div>
    <ul class="list clearfix">
      <li>
        <router-link to="/"  class="one">首页</router-link>
      </li>
      <li >
        <router-link to="/about" class="two">关于</router-link>
      </li>
      <li >
        <router-link to="/photo" class="three">相册</router-link>
      </li>
      <li >
        <router-link to="/note" class="four">日志</router-link>
      </li>
      <li >
        <router-link to="/liuyan" class="five">留言板</router-link>
      </li>
    </ul>
    <!--日历-->
    <calendar class="calendarS"/>
  </div>
</template>

<script>
import calendar from './FTime.vue'
    export default {
        components: {calendar}
    }
</script>

<style>
  .allB{
    position: relative;
    margin:60px auto;
  }
  .calendarS{
    position: absolute;
    top:-55px;
    right:-190px;

  }

  h1{
    text-align: left;
  }
h1 a{
  font-size:40px ;
  font-family: 'Arizonia', cursive;
  font-weight:900;
  text-decoration: none;
  color: #333;
}
  .yan{
    margin-top:10px;
    font:18px "微软雅黑" ;
    text-shadow: 2px 2px 1px rgba(0,0,0,.8) ;
    color: #fff;
  }
  .list {
    position: relative;
    margin-top: 60px;
    list-style: none;
    padding: 0 10%;
    box-sizing: border-box;
  }
  .list li {
    float: left;
    position: relative;
  }
  .list li>a{
    position: relative;
    top: 0;
    display: block;
    margin:0 auto;
    text-align: center;
    width:150px;
    height: 150px;
    padding:10px;
    line-height:150px;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    -webkit-transition: all .3s;
    -moz-transition: all .3s ;
    -ms-transition: all .3s ;
    -o-transition: all .3s ;
    transition: all .3s ;
    color:#fffefe;
    font-size:30px;
    font-family: 'Arizonia', cursive;
    text-shadow: 2px 2px 3px  #443939;

  }
  .list li>a.one{
    border:10px solid #549e89;
    background-color:#51c9a7;
  }
  .list li>a.two{
    border:10px solid #e499b0;
    background-color:#e67b9c;
    left:-45px;
  }
  .list li>a.three{
    border:10px solid #a2cfde;
    background-color:#7ec9e3;
    left:-95px;
  }
  .list li>a.four{
    border:10px solid #dcc999;
    background-color:#f0cd78;
    left:-142px;
  }
  .list li>a.five{
    border:10px solid #d8abcd;
    background-color:#dd91cb;
    left:-185px;
  }

  .list li>a:hover{
    transform: scale(1.2) ;
    -webkit-transform: scale(1.2);	/* Safari 和 Chrome */
    -moz-transform: scale(1.2);
    z-index:2;
  }

</style>
