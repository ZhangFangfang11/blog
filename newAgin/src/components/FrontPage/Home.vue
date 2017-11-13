<template>
  <div class="clearfix main contents">
    <div class="L">
      <div class="avatarBox">
        <div class="avatar"></div>
        <div class="box">
          <i class="arrowW"></i>
          <i class="arrow"></i>
          <p class="gy"> 人生的磨难是很多的，所以我们不可对于每一件轻微的伤害都过于敏感。在生活磨难面前，精神上的坚强和无动于衷是我们抵抗罪恶和人生意外的最好武器。
            —— 洛克</p>
        </div>
        <div class="share">
          <a href="javascript:;" title="人人车"></a>
          <a href="javascript:;" title="人人车"></a>
          <a href="javascript:;" title="人人车"></a>
          <a href="javascript:;" title="人人车"></a>
          <a href="javascript:;" title="人人车"></a>
          <a href="javascript:;" title="人人车"></a>
          <a href="javascript:;" title="人人车"></a>
        </div>
      </div>
    </div>
    <div class="R">
      <Fbanner />
    </div>
  </div>
</template>

<script>
  import Fbanner from './FBanner.vue'
  export default {
    components: {
      Fbanner
    }
  }
</script>

<style>
  .contents {
    margin-top: 60px;
  }

  .L {
    float: left;

  }

  .L .avatar {
    width: 220px;
    height: 100px;
    padding: 60px;
    border: 5px solid #fff;
    -webkit-border-radius: 49%;
    -moz-border-radius: 49%;
    border-radius: 49%;
    background: url("../../assets/img/03.jpg") no-repeat center;
    transition: all .5s;
  }

  .L .avatar:hover {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }

  .L .box {
    position: relative;
    top: 5px;
    left: 0;
    width: 350px;
    height: 200px;
    padding: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 5px solid #fff;
    background-color: #88b7d5;
    margin-bottom: 20px;

  }

  .L .box .gy {
    text-indent: 32px;
    text-align: left;
    line-height: 20px;
    font-size: 16px;
    color: #fff;
  }

  .L .box .arrow, .L .box .arrowW {
    position: absolute;
    top: -25px;
    right: 50%;
    width: 0;
    height: 0;
    border: 25px solid;
    border-color: #fff transparent transparent #fff;

    transform: rotate(45deg);
  }

  .L .box .arrow {
    border: 18px solid;
    top: -18px;
    right: 52%;
    border-color: #88b7d5 transparent transparent #88b7d5;
  }

  .L .share > a {
    display: inline-block;
    width: 32px;
    height: 32px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-left: 5px;
    border: 2px solid #ccc;
    background: url("../../assets/img/is_32.png") no-repeat -4px -80px;
  }

  .L .share > a:nth-child(2) {
    background-position: -4px -200px;
  }

  .L .share > a:nth-child(3) {
    background-position: -4px -120px;
  }

  .L .share > a:nth-child(4) {
    background-position: -4px -160px;
  }

  .L .share > a:nth-child(5) {
    background-position: -4px -280px;
  }

  .L .share > a:nth-child(6) {
    background-position: -4px -240px;
  }

  .L .share > a:nth-child(7) {
    background-position: -4px 0;
  }

  .R {
    float: right;
    /*background-color: yellow;*/
    width:800px;
    height:600px;
  }
</style>
