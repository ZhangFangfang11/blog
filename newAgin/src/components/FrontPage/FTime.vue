<template>
  <div>
    <!--日历-->
    <div class="box" id="clock">
      <!-- 原点 -->
      <div class="origin"></div>
      <!-- 时钟数 -->
      <div class="dot_box">
        <div class="dot">6</div>
        <div class="dot">5</div>
        <div class="dot">4</div>
        <div class="dot">3</div>
        <div class="dot">2</div>
        <div class="dot">1</div>
        <div class="dot">12</div>
        <div class="dot">11</div>
        <div class="dot">10</div>
        <div class="dot">9</div>
        <div class="dot">8</div>
        <div class="dot">7</div>
      </div>
      <!-- 时、分、秒针 -->
      <div class="clock_line hour_line" id="hour_line"></div>
      <div class="clock_line minute_line" id="minute_line"></div>
      <div class="clock_line second_line" id="second_line"></div>
      <!-- 日期 -->
      <div class="date_info" id="date_info"></div>
      <!-- 时间 -->
      <div class="time_info">
        <div class="time" id="hour_time"></div>
        <div class="time" id="minute_time"></div>
        <div class="time" id="second_time"></div>
      </div>
    </div>
  </div>
</template>

<script>
  let $ = require('jquery')
  export default {
    components: {},
    methods: {},
    mounted(){
      $(function () {
        var clock = document.getElementById("clock");

        function initNumXY() {
          // 1、12个数字的位置设置
//          var radius = 160;//大圆半价
          var radius = 110;//大圆半价
          var dot_num = 360 / $(".dot").length;//每个div对应的弧度数
          //每一个dot对应的弧度;
          var ahd = dot_num * Math.PI / 180;
          $(".dot").each(function (index, el) {
            $(this).css({
//              "left": 180 + Math.sin((ahd * index)) * radius,
//              "top": 180 + Math.cos((ahd * index)) * radius
              "left": 140 + Math.sin((ahd * index)) * radius,
              "top": 150 + Math.cos((ahd * index)) * radius
            });
//            console.log( $(this).index.css({
//              "left": 180 + Math.sin((ahd * index)) * radius,
//              "top": 180 + Math.cos((ahd * index)) * radius
//            }))
          });
          // 2、刻钟设置
          for (var i = 0; i < 60; i++) {
            clock.innerHTML += "<div class='clock-scale'> " +
              "<div class='scale-hidden'></div>" +
              "<div class='scale-show'></div>" +
              "</div>";
          }
          var scale = document.getElementsByClassName("clock-scale");
          for (var i = 0; i < scale.length; i++) {
            scale[i].style.transform = "rotate(" + (i * 6 - 90) + "deg)";
          }
        }

        initNumXY();//调用上面的函数
        //获取时钟id
        var hour_line = document.getElementById("hour_line"),
          minute_line = document.getElementById("minute_line"),
          second_line = document.getElementById("second_line"),
          date_info = document.getElementById("date_info"),//获取date_info
          hour_time = document.getElementById("hour_time"),// 获去时间id
          minute_time = document.getElementById("minute_time"),
          second_time = document.getElementById("second_time");
        //3、设置动态时间
        function setTime() {
          var nowdate = new Date();
          //获取年月日时分秒
          var year = nowdate.getFullYear(),
            month = nowdate.getMonth() + 1,
            day = nowdate.getDay(),
            hours = nowdate.getHours(),
            minutes = nowdate.getMinutes(),
            seconds = nowdate.getSeconds(),
            date = nowdate.getDate();
          if (date < 10) {
            date = '0' + date
          }
          var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
          // 获取日期id
          date_info.innerHTML = year + "年" + month + "月" + date + "日   " + weekday[day];
          hour_time.innerHTML = hours >= 10 ? hours : "0" + hours;
          minute_time.innerHTML = minutes >= 10 ? minutes : "0" + minutes;
          second_time.innerHTML = seconds >= 10 ? seconds : "0" + seconds;

          //时分秒针设置
          var hour_rotate = (hours * 30 - 90) + (Math.floor(minutes / 12) * 6);
          hour_line.style.transform = 'rotate(' + hour_rotate + 'deg)';
          minute_line.style.transform = 'rotate(' + (minutes * 6 - 90) + 'deg)';
          second_line.style.transform = 'rotate(' + (seconds * 6 - 90) + 'deg)';
        }

        // setTime();
        setInterval(setTime, 1000);


      });
    }
  }
</script>

<style >
  #clock {
    width: 300px;
    height: 300px;
    margin: 30px auto;
    border-radius: 50%;
    box-shadow: 0px 0px 20px 3px #444 inset;
    position: relative;
  }

  /*原点*/
  .origin {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff0000;
    top: 143px;
    left: 150px;
  }

  /* 指针 */
  .clock_line {
    position: absolute;
    z-index: 20;
  }

  .hour_line {
    width: 80px;
    height: 4px;
    top: 149px;
    left: 157px;
    background-color: #000;
    border-radius: 2px;
    transform-origin: 0 50%;
    box-shadow: 1px -3px 8px 3px #aaa;
  }

  .minute_line {
    width: 100px;
    height: 2px;
    /* top: 199px;
     left: 190px;*/
    top: 149px;
    left: 147px;
    background-color: #000;
    transform-origin: 7.692% 50%;
    box-shadow: 1px -3px 8px 1px #aaa;
  }

  .second_line {
    width: 130px;
    /*width: 170px;*/
    height: 1px;
    /* top: 199.5px;
     left: 180px;*/
    top: 159px;
    left: 150px;
    background-color: #f60;
    transform-origin: 11.765% 50%;
    box-shadow: 1px -3px 7px 1px #bbb;
  }

  .dot_box {
    width: inherit;
    height: inherit;
    /*background-color: red;*/
  }

  /*时钟数*/
  .dot {
    width: 10px;
    height: 10px;
    line-height: 10px;
    text-align: center;
    font-size: 22px;
    position: absolute;

  }

  .clock-scale {
    width: 195px;
    height: 2px;
    transform-origin: 30% 50%;
    /*transform-origin: 0% 50%;*/
    z-index: 999;
    position: absolute;
    top: 149px;
    left: 92px;
    /*background: red;*/
  }

  .scale-show {
    width: 12px;
    height: 2px;
    background-color: #555;
    float: left;
  }

  .scale-hidden {
    width: 183px;
    height: 2px;
    float: left;
  }

  /*日期*/
  .date_info {
    width: 171px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    position: absolute;
    top: 173px;
    left: 72px;
    z-index: 11;
    color: #555;
    font-weight: bold;
  }

  .time_info {
    width: 110px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    position: absolute;
    top: 202px;
    left: 103px;
    z-index: 11;
    color: #555;
    background: #253e3e;
  }
  .time {
    width: 35px;
    height: 35px;
    float: left;
    color: #fff;
    font-size: 22px;
  }
  #minute_time {
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
  }
</style>
