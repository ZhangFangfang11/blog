<template>
  <div>
    <div id="aboutBox" class="main"></div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import echarts from 'echarts';
  export default {
    components: {},
    data(){
      return {}
    },
    methods: {
      aboutFn(){
        var myChart = echarts.init(document.getElementById('aboutBox'));
        myChart.showLoading();
        let d;
        var setData = (function () {
          var option = {
            title: {
              text: '最近上映电影',
              left: '50%',
              textAlign: 'center'
            },
            grid: {//canvas盒子的里面内容的位置
              left: 0,
              right: 20,
              bottom: 150,
              top: 30
            },
            tooltip: {
              formatter: function (params) {
                if (params.componentSubType == 'pictorialBar') {
                  return '电影：' + params.name + '</br> 豆瓣评分：' + (params.value * 1 + 10).toFixed(1);
                }
              }
            },
            xAxis: {
              data: []
            },
            yAxis: {
              splitLine: {
                show: false
              },
              axisLine: {
                show: false
              }
            },
            series: [{
              type: 'bar',
              barWidth: 1,
              data: [],
              animationDelay: function (idx) {
                return idx * 100;
              }
            }, {
              type: 'pictorialBar',
              symbolPosition: 'end',
              symbolRotate: 165,
              symbolOffset: ['20%', '100%'],
              data: [],
              animationDelay: function (idx) {
                return idx * 100 + 500;
              }
            }, {
              type: 'graph',
              data: [{
                x: 0,
                y: 0,
                symbolSize: 0
              }, {
                name: 'btn',
                x: -20,
                y: 9,
                symbolSize: 20
              }],
              itemStyle: {
                normal: {
                  color: 'transparent',
                  borderWidth: 1,
                  borderColor: '#555'
                }
              }
            }]
          };
          var mark = 1;
          return function () {
            var pics = [];

            for (var i = 0; i < d.subjects.length; i++) {
              pics.push({
                value: ((d.subjects[i].rating.average || 0.1) - 10).toFixed(1),
                symbol: 'image://' + d.subjects[i].images.small,
                symbolSize: ['50', '75'],
                name: d.subjects[i].title
              })

            }
            if (mark % 2 == 0) {
              pics.sort(function (a, b) {
                  console.log((mark / 2 | 0) % 2 == 0 ? (b.value - a.value) : (a.value - b.value),'sssss')
                return (mark / 2 | 0) % 2 == 0 ? (b.value - a.value) : (a.value - b.value)
              })
            }
            option.series[0].data = pics;
            option.series[1].data = pics;
            myChart.hideLoading();
            myChart.setOption(option);
            mark++;
          }
        })();
        $.ajax({
          type: "GET",
          url: "http://api.douban.com/v2/movie/in_theaters",
          dataType: "jsonp",
          success: function (data) {
            d = data;
            console.log(d)
            setData();
          }
        });
        myChart.on('click', function (params) {
          if (params.name == 'btn') {
            setData();
          }
        })
      }
    },
    created(){

    },
    mounted(){
      this.aboutFn()
    }
  }
</script>

<style>
  #aboutBox {
    height: 610px;

  }
</style>
