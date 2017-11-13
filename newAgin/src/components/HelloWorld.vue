<template>
  <div class="hello">
    <div id="box">
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import echarts from 'echarts'
  import bmap from 'echarts/extension/bmap/bmap.js'
  import rawData from '../assets/js/data.json'

  export default {
    name: 'HelloWorld',
    data () {
      return {

      }
    },
    methods: {
      aa(){
        var myChart = echarts.init(document.getElementById('box'));
        var lines = rawData.track.slice(0, rawData.track.length - 1).map(function (seg, idx) {
          return [{
            coord: seg.coord,
            value: seg.elevation
          }, {
            coord: rawData.track[idx + 1].coord
          }];
        });
        var waypointsData = rawData.waypoints.map(function (item) {
          return {
            name: item.name,
            value: item.coord.concat([item.elevation])
          };
        });
        myChart.setOption({
          animation: false,
          bmap: {
            center: [120.14266322374, 30.235018034923],
            zoom: 14,
            roam: true
          },
          tooltip: {
            trigger: 'axis'
          },
          visualMap: {
            top: 'top',
            min: 0,
            max: 500,
            text: ['海拔 500 米', '海拔 0 米'],
            seriesIndex: [0, 4],
            inRange: {
              color: ['#42810f', '#c9c367', '#b07a17', '#a23a05']
            }
          },
          grid: [{
            right: 10,
            height: 140,
            width: '50%',
            bottom: 10,
          }, {
            show: true,
            right: 0,
            height: 170,
            width: '53%',
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)'
          }],
          xAxis: {
            type: 'category',
            show: false,
            inverse: true,
            data: rawData.track.map(function (seg) {
              return seg.coord.join(',');
            })
          },
          yAxis: {
            position: 'right',
            splitLine: {
              show: false
            },
            axisLabel: {
              inside: true,
              formatter: '{value} m',
              textStyle: {
                color: '#ddd'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              inside: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            max: 500,
            splitNumber: 2
          },
          series: [{
            type: 'lines',
            coordinateSystem: 'bmap',
            data: lines,
            tooltip: {
              show: false
            },
            lineStyle: {
              normal: {
                width: 6,
                opacity: 1,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 3
              },
              emphasis: {
                color: '#f6fd40'
              }
            },
            animationDelay: function (idx) {
              return idx * 20;
            }
          }, {
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbolSize: [10, 5],
            symbolOffset: [7, 0],
            silent: true,
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: 'red',
                borderWidth: 1,
                borderColor: '#fff'
              }
            },
            data: waypointsData
          }, {
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbol: 'path://M54.227,12.611c-0.338-0.336-0.736-0.505-1.196-0.505c-0.229,0-0.712,0.188-1.446,0.559  c-0.735,0.372-1.515,0.786-2.336,1.248c-0.823,0.459-1.797,0.875-2.921,1.247c-1.123,0.371-2.163,0.559-3.12,0.559  c-0.884,0-1.664-0.168-2.336-0.505c-2.229-1.044-4.168-1.823-5.814-2.337c-1.646-0.513-3.416-0.771-5.311-0.771  c-3.272,0-6.999,1.064-11.177,3.188c-0.862,0.43-1.48,0.763-1.88,1.007l-0.397-2.911c0.897-0.779,1.476-1.914,1.476-3.195  c0-2.347-1.902-4.249-4.249-4.249c-2.347,0-4.249,1.902-4.249,4.249c0,1.531,0.818,2.862,2.032,3.61l5.74,42.09  c0.171,1.253,1.243,2.162,2.474,2.162c0.112,0,0.226-0.007,0.341-0.022c1.368-0.188,2.326-1.447,2.139-2.815L19.69,38.303  c4.186-2.077,7.807-3.124,10.853-3.124c1.293,0,2.554,0.193,3.783,0.583c1.23,0.391,2.253,0.815,3.067,1.274  c0.814,0.46,1.775,0.886,2.88,1.274c1.107,0.39,2.2,0.585,3.279,0.585c2.726,0,5.991-1.027,9.796-3.08  c0.478-0.248,0.828-0.492,1.049-0.731c0.221-0.239,0.332-0.579,0.332-1.021V13.806C54.729,13.347,54.562,12.948,54.227,12.611z',
            symbolSize: 30,
            symbolOffset: [15, -15],
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: 'red',
                borderWidth: 1,
                borderColor: '#fff'
              }
            },
            label: {
              normal: {
                textStyle: {
                  fontWeight: 'bold',
                  color: '#111'
                },
                show: true,
                position: 'right',
                formatter: '{b}'
              }
            },
            data: waypointsData
          }, {
            type: 'scatter',
            name: 'marker',
            coordinateSystem: 'bmap',
            symbolSize: 100,
            symbolOffset: [0, -50],
            itemStyle: {
              normal: {
                color: '#555',
                borderColor: '#111',
                borderWidth: 5
              }
            },
            tooltip: {
              show: false
            },
            symbol: 'path://M21.9,15c0,0-8.7,9.9-9.5,11c-0.9,1.1-2.3,0.3-2.3,0.3  s-8.8-9.7-9.8-11.4C-0.7,13.3,1.2,13,1.2,13H6V1c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1v12h4.7C23.1,13,21.9,15,21.9,15z',
            data: []
          }, {
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            areaStyle: {
              normal: {}
            },
            z: 9999,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                animation: false
              },
              transitionDuration: 0,
              formatter: function (param) {
                return param[0].value;
              },
              position: function (pt) {
                return [pt[0], '10%'];
              }
            },
            areaStyle: {
              normal: {}
            },
            data: rawData.track.map(function (seg) {
              return seg.elevation;
            })
          }]
        });

        myChart.on('showtip', function (param) {
          if (param.seriesIndex === 4) {
            myChart.setOption({
              series: [{
                name: 'marker',
                animation: false,
                data: [rawData.track[param.dataIndex].coord]
              }]
            });
          }
        });

      }
    },
    mounted(){

      this.aa()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  #box {
    background-color: pink;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 600px;
    height: 600px;
  }
  .anchorBL img{
    display: none;
  }
.BMap_noprint span{
  font-size: 0;
}
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
