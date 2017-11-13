<template>
  <div class="note main clearfix">
    <div class="noteL">
      <div class="gonggao">
        <h3>公告</h3>
        <table style="padding: 10px;box-sizing: border-box;font-size: 14px;line-height: 18px">
          <tr>
            <td>昵称：</td>
            <td>小菜瓜</td>
          </tr>
          <tr>
            <td>园龄：</td>
            <td> 1年</td>
          </tr>
          <tr>
            <td>粉丝：</td>
            <td> 52</td>
          </tr>
          <tr>
            <td>关注：</td>
            <td> 52</td>
          </tr>
          <tr>
            <td><a href="javascript:;">+加关注</a></td>

          </tr>
        </table>
      </div>
      <!--标签-->
      <ul class="tag">
        <li>
          <h3>我的标签</h3>
        </li>
        <!--/note/vnote-->
        <li>
          <router-link to="/note/vnote">VUE</router-link>
        </li>
        <li>
          <router-link to="/note/jsnote">Javascript</router-link>
        </li>
        <li>
          <router-link to="/note/cnote">CSS3</router-link>
        </li>
        <li>
          <router-link to="/note/hnote">HTML5</router-link>
        </li>
        <li>
          <router-link to="/note/echart">Echarts</router-link>
        </li>
        <li>
          <router-link to="/note/highchart">Highcharts</router-link>
        </li>
      </ul>
    </div>
    <div class="noteR">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  export default {
    components: {

    },
    data(){
        return {

        }
    }
  }
</script>

<style>
  .noteL {
    float: left;
    width: 200px;
    height: 100%;
  }
  .noteL .gonggao, .noteL .tag {
    border: 1px solid #555;
    background: #fff;
    text-align: left;
    margin-bottom: 20px;

  }
  .noteL .gonggao > h3, .noteL .tag > li > h3 {
    padding: 2px 10px;
    text-align: left;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #f0cd78;
    border-bottom: 1px solid #555;
    font-family: 'Arizonia', cursive;
  }
  .noteL .tag li {
    padding: 5px 0;
  }
  .noteL .tag li:nth-child(1) {
    padding: 0;
  }
  .noteL .tag li > a {
    color: #000;
    font-size: 14px;
    line-height: 16px;
    display: inline-block;
    width:100%;
  }
  .noteL .tag li > a.active{
    color: blue;
  }

  .noteR {
    float: right;
    width:980px;
    height:500px;
    overflow-y: auto;

  }
</style>
