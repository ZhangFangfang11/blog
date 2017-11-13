<template>
    <div class="neirong">

          <el-container>
              <el-header style="height: 40px">
              <slot name="header"></slot>
              </el-header>
           <el-main>
             <slot name="conMain"></slot>
           </el-main>

          </el-container>

    </div>
</template>

<script>

    export default {
        components: {},
      props:{
        tagAry:{
            type:Array
        }
      }
    }
</script>

<style>
  .el-header{
    position: relative;
    background-color:#f0cd78;
    color: #333;
    text-align: left;
    line-height:40px;
  }
  .el-header>a{
    color: #333;
  }
  .el-header>span{
    position: absolute;
    top:0;
    right:13px;

  }
  .el-main{
    background-color: #fff;
    color: #333;
    text-align: left;
    text-indent: 32px;
    font-size:16px;
    line-height:32px;
    padding:15px;
  }
  .neirong {
    margin-bottom:25px;
  }
</style>
