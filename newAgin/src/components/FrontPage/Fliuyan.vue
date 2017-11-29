<template>
  <div>

    <div class="lybox" :class="['animated',{'flipInY':show,'rotateOut':!show}]">
      <div class="hd">
        <img src="../../assets/img/hd.png"/>
      </div>
      <div class="Lhd">
        <img src="../../assets/img/hd.png"/>
      </div>
      <el-form ref="form" label-width="100px" label-position="right">
        <el-form-item label="名字">
          <el-input v-model="ly.person"></el-input>
        </el-form-item>

        <el-form-item label="你的邮箱">
          <el-input v-model="ly.perEmail"></el-input>
        </el-form-item>
        <el-form-item label="留言内容">
          <el-input type="textarea" v-model="ly.lyc" :autosize="{ minRows: 2, maxRows: 6}"
                    style="width: 300px;"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onsubmit">发表</el-button>
        </el-form-item>
      </el-form>
    </div>


    <!--留言记录-->
    <div class="main ly" v-show="!show" :class="['animated',{'fadeIn':!show}]">
      <p>留言： {{people.length + '  条'}}   {{aa}}</p>
      <ul>
        <li class="lylist" v-for="per in people">
          <h4 class="sayperson">
            <a href="#" :title="per.perEmail">{{per.person}} </a> 说：
          </h4>
          <div class="lycontent">{{per.lyc}}</div>
          <span>{{per.perTime}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  var moment = require('moment');
  export default {
    components: {},
    data(){
      return {
        show: true,
        ly: {
          person: '',
          perEmail: '',
          lyc: '',
          perTime:moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        },
        aa:null,
        people: []
      }
    },
    methods: {
      onsubmit(){
        this.show = !this.show;
         this.$http.post('/api/lyp',this.ly).then(()=>{
            this.$http.get('/api/lyp').then(result=>{
                this.people=result.data
            })
         })
      }
    },
    created(){

    },
    mounted () {
//      this.$on("ly-type", function (a) {
//        this.aa=b
//      });
    },

  }
</script>

<style>
  .lybox {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 5%;
    margin: auto;
    width: 600px;
    height: 500px;
    background: #fff;
    box-shadow: 0px 0px 45px 2px #020202 inset;
    text-align: center;
    border: 15px solid #dd91cb;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    overflow-y: auto;
  }

  .sayperson > a {
    color: #333;
  }

  .hd, .Lhd {
    position: absolute;
    width: 70px;
    height: 70px;

  }

  .hd {
    top: 4%;
    left: 3%;
  }

  .Lhd {
    bottom: 4%;
    right: 3%;
  }

  .hd > img, .Lhd> img {
    width: 100%;
    height: 100%;
    border: 0;
    vertical-align: middle;
  }

  .el-form {
    padding: 80px;
    text-align: center;
    box-sizing: border-box;
  }

  .el-input {
    width: 300px;
  }

  .el-button {

  }

  .ly p {
    font-size: 20px;
    text-align: left;
    text-indent: 40px;
    border-bottom: 1px solid #c3c1c1;
    margin-bottom: 10px;
  }

  .ly .lylist {
    margin-bottom: 10px;
    position: relative;
    top: 0;
    left: 0;
    padding: 20px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

  }

  .ly .lylist > span {
    position: absolute;
    display: block;
    bottom: 0;
    right: 0;
  }

  .ly .sayperson {
    text-align: left;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;

  }

  .lycontent {
    text-align: left;
    font-size: 16px;
    line-height: 20px;

  }
</style>
