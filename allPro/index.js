import './style.less'
import template from './view.html'
import moment from 'moment'
import {bigScreen} from '../model.js'
import $ from 'jquery'
import echarts from 'echarts'
import _ from 'lodash'
import attackCount from '../attackCount/index.js'
import attackDisposedCount from '../attackDisposedCount/index.js'
import chinaData from '../../mapData/china.js'
import worldData from '../../mapData/world.js'


export default {
    template,
    props: {
        startTime: {
            type: Number,
            default: function () {
                return moment().subtract(7, 'd').format('X') * 1000
            }
        },
        endTime: {
            type: Number,
            default: function () {
                return moment().format('X') * 1000
            }
        },
        proName: {
           type: String,
            /* default: function () {
             return ''
             }*/
        },
        getMapSliderData: {
            type: Array,
            default: function () {
                return []
            }
        },

        getSliderName: {
            type: String,
            /* default: function () {
             return ""
             }*/
        },
        chinaVals: {//获取父组件的中国地图是否选中状态
            type: Boolean,
            default: function () {
                return false
            }
        },
        missVals: {//获取父组件的导弹图是否选中状态
            type: Boolean,
            default: function () {
                return false
            }
        },
        showOff: {
             type: Boolean,
            /* default: function () {
             return false
             }*/
        },
        intervalTime: {
            type: Number,
        }

    },

    data(){
        let vm = this
        let stime = vm.getDate(7)
        let etime = new Date().valueOf()
        return {
            today: moment().format('YYYY-MM-DD'),
            week: moment().format('dddd'),
            stime,
            etime,
            times: {
                1: {
                    stime: vm.getDate(1),
                    style: 'no-select'
                },
                7: {
                    stime: vm.getDate(7),
                    style: 'yes-select'
                },
                14: {
                    stime: vm.getDate(14),
                    style: 'no-select'
                },
                30: {
                    stime: vm.getDate(30),
                    style: 'no-select'
                }
            },
            proAry: [],
            interTime: 60000,
            charts: null,
            proIndex: 0,
            nextProTimer: null,
            curProName: '',
            carouselCom: 1,
            selectedData: [],
            selectedName: [],
            changeAttack: true,
            outThisMap: false,
            childName: null,
            changeNextPage: null,
            childTrue: true,//子组件获取的数据
            nextChina: 1,//返回中国地图
            startParams: 0,//当轮播完成后回到导弹图
            pinyin: null,
            childShow: this.showOff
        }
    },
    created(){
    },
    methods: {
        getProData(){
            var self = this
            var param = {
                start_time: self.startTime,
                end_time: self.endTime,
                stats_type: '0',
                interval_time: self.intervalTime,
                pro_name: self.selectedData.join(',') || self.proName,
                sub_name: self.selectedName.join(',') || self.getSliderName
            }

            if (this.changeAttack) {
                //显示的是饼图的接口
                bigScreen.getMonitorData(param).then(function (data) {
                        self.proAry = data.data;
                        for (let i = 0; i < self.proAry.length; i++) {
                            if (self.proAry[i].sub_name !== null && self.proAry[i].sub_name !== '') {
                                self.proAry[i].json = require('../../mapData/' + self.proAry[i].name + '.json')
                            }
                        }
                        if (self.proName !== null) {//点击进去的地图
                            self.createPro();
                        } else {
                            self.createSlidePro()
                        }


                }).catch()

            } else {
                //显示的是柱形图的接口
                bigScreen.getDisposeCount(param).then(function (data) {
                        self.proAry = data.data;
                        for (let i = 0; i < self.proAry.length; i++) {
                            if (self.proAry[i].sub_name !== null && self.proAry[i].sub_name !== '') {
                                self.proAry[i].json = require('../../mapData/' + self.proAry[i].name + '.json')//不能用import
                            }
                        }
                        if (self.proName !== null) {//点击进去的地图
                            self.createPro();
                        } else {
                            self.createSlidePro()
                        }


                }).catch()
            }
        },
        goBackChinaMap(){
            var self = this;
            this.outThisMap = true;
            self.$dispatch("changeFlagTwos", self.carouselCom);//返回到中国地图

        },
        changeInfo(){
            this.changeAttack = !this.changeAttack
        },
        createPro(){//点击进来的省份
            let self = this;
            $('#proStl').empty();
            var ids, odiv, divObj, regProName, regProMap;
            for (let i = 0; i < self.proAry.length; i++) {
                if (self.proName == self.proAry[i].name) {
                    ids = self.proAry[i].sub_name;
                    odiv = $("<div class='allPro'  id=" + ids + "  ></div>");
                    $('#proStl').append(odiv);
                    divObj = document.getElementById(ids);
                    regProName = self.proAry[i].name;
                    regProMap = self.proAry[i].json;
                    self.childName = regProName;//根据不同 的省份传递饼图与柱形图的数据
                    echarts.registerMap(regProName, regProMap);// 到省
                    self.charts = echarts.init(divObj);
                    self.curProName = regProName;
                    self.$dispatch('curClickProName', regProName)//将当前播放的省份地图传递给扇形图以便将对应的省份名字进行显示数据
                    //对地图上的标识点的value
                    var dataNew = [], dataNew2 = [], datas = [];
                    for (var j = 0; j < self.proAry[i].detect_data.length; j++) {
                            var cur = self.proAry[i].detect_data[j];
                            // var geoData = cur.lon_lat;
                        var geoData = cur.lon_lat.map((item)=>{
                            return item+0.05
                        });
                            if (geoData) {
                                dataNew.push({
                                    name: cur.detect_name,
                                    value: geoData.concat(cur.oevent_count),
                                    data: cur.event_data
                                });
                            }
                        }
                    var option = {
                        tooltip: {
                            backgroundColor: 'rgb(44,44,46)',
                            trigger: 'item',
                            enterable: true,
                            triggerOn: 'click',
                            formatter: function (result) {//回调函数，
                                var color = ['red', '#f74c1a', 'yellow', 'blueviolet'];//全局设置饼图的颜色
                                if (self.changeAttack) {
                                    if (result.data && result.data.data) {
                                        var attackAry = [];
                                        //提示信息的data数据
                                        for (var i = 0; i < result.data.data.length; i++) {
                                            attackAry.push({
                                                name: result.data.data[i].name,
                                                value: result.data.data[i].value,
                                                itemStyle: {
                                                    normal: {
                                                        color: color[i],
                                                        label: {
                                                            show: true,
                                                            formatter: "{b}\n{c} ({d}%)",
                                                            position: 'top',
                                                            textStyle: {
                                                                fontSize: '12',
                                                                fontWeight: 'bold',
                                                            }
                                                        },
                                                    },
                                                    emphasis: {
                                                        label: {
                                                            show: true,
                                                            formatter: "{b}\n{c} ({d}%)",
                                                            // position: 'center',
                                                            textStyle: {
                                                                fontSize: '12',
                                                                fontWeight: 'bold',
                                                            }
                                                        }
                                                    }
                                                }, labelLine: {
                                                    normal: {
                                                        lineStyle: {
                                                            color: color[i],

                                                        }
                                                    }
                                                }

                                            })
                                        }
                                        let oDiv = $("<div/>");
                                        let oDiv1 = $("<div/>");
                                        oDiv1.css({
                                            width: '350px',
                                            height: '300px',
                                            position: "relative",
                                            zIndex: "9999",
                                            color: "#444"
                                        }).appendTo(oDiv);
                                        oDiv1.append($("<div/>").css({
                                            borderBottom: "1px solid #f1f1f1",
                                            padding: 5,
                                            marginBottom: 5,
                                            color: "#fff",
                                            textAlign: 'left'
                                        }).html(`检测器 : ${result.name}`));
                                        let divPie = $("<div/>").css({
                                            width: '350px',
                                            height: '300px',
                                        }).attr("id", "aabb").appendTo(oDiv1);
                                        let cityOptionPie = {
                                            title: {
                                                text: '告警类型分布',
                                                x: 'center',
                                                y: 'top',
                                                textAlign: 'left',
                                                textStyle: {
                                                    color: '#c6c6c6',
                                                    fontSize: '1.2em'
                                                }
                                            },
                                            /* visualMap: {
                                             show: false,
                                             min: 10,
                                             max: 190,
                                             inRange: {
                                             colorLightness: [0, 1]
                                             }
                                             },*/
                                            textStyle: {
                                                color: '#fff'
                                            },
                                            series: [
                                                {
                                                    name: '告警类型分布',
                                                    type: 'pie',
                                                    radius: [18, 40],
                                                    data: attackAry,
                                                    roseType: 'angle',
                                                }
                                            ]
                                        };
                                        setTimeout(() => {
                                            let cityChartPie = echarts.init($("#aabb")[0]);
                                            cityChartPie.setOption(cityOptionPie)
                                        }, 1)
                                        return oDiv[0].innerHTML
                                    }
                                } else {
                                    if (result.data && result.data.data) {
                                        var ds = [];
                                        for (var i = 0; i < result.data.data.length; i++) {
                                            ds.push({
                                                name: result.data.data[i].name,
                                                data: [parseInt(result.data.data[i].value)]
                                            })
                                        }
                                        let oDiv = $("<div/>");
                                        let oDiv1 = $("<div/>");
                                        oDiv1.css({
                                            width: '250px',
                                            height: '300px',
                                            position: "relative",
                                            zIndex: "9999",
                                            color: "#444",
                                        }).appendTo(oDiv);
                                        oDiv1.append($("<div/>").css({
                                            borderBottom: "1px solid #f1f1f1",
                                            padding: 5,
                                            marginBottom: 5,
                                            color: "#fff",
                                            textAlign: 'left',
                                        }).html(`处置统计:${result.name}`));
                                        let divPie = $("<div/>").css({
                                            width: '250px',
                                            height: '250px',
                                        }).attr("id", "warnDis").appendTo(oDiv1)
                                        setTimeout(() => {
                                            Highcharts.setOptions({//改变柱形图的颜色
                                                colors: ['#ff0000', '#00ff00']
                                            }),
                                                $('#warnDis').highcharts({
                                                    chart: {
                                                        type: 'column',
                                                        backgroundColor: 'rgb(44,44,46)',
                                                    },
                                                    title: {
                                                        text: ''
                                                    },
                                                    subtitle: {
                                                        text: ''
                                                    },
                                                    credits: {
                                                        enabled: false
                                                    },
                                                    legend: {
                                                        itemStyle: {
                                                            'color': '#fff'
                                                            // 'fontSize' : '18px'
                                                        }
                                                    },
                                                    xAxis: {
                                                        categories: [],
                                                        crosshair: true,
                                                        visible: false
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: ''
                                                        },
                                                        visible: false
                                                    },
                                                    tooltip: {
                                                        headerFormat: '<span style="font-size:10px">告警统计</span><table>',
                                                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                                                        footerFormat: '</table>',
                                                        shared: true,
                                                        useHTML: true
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            dataLabels: {
                                                                enabled: true,  //显示数量提示
                                                                color: '#fff',
                                                                /* formatter : function() {
                                                                 a = 35/150*100;    //a为当前柱状图y轴值除以总数然后乘以100
                                                                 return a.toFixed(2) + "%";  //返回百分比
                                                                 }*/
                                                            },
                                                            pointPadding: 0.2,
                                                            borderWidth: 0
                                                        }
                                                    },
                                                    series: ds
                                                });

                                        }, 1)
                                        return oDiv[0].innerHTML
                                    }
                                }

                            }
                        },
                        legend: {},
                        geo: {
                            map: regProName,
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            zoom: 1.2,
                            roam: true,
                            itemStyle: {
                                normal: {
                                    areaColor: 'rgb(5,21,34)',
                                    borderColor: 'rgb(10,102,200)'
                                },
                                emphasis: {
                                    areaColor: '#2a333d'
                                }
                            },
                            layoutCenter: ['50%', '50%'],//让图表 宅dom盒子中间
                            layoutSize: '90%',//图表的大小
                        },
                        title: {
                            text: regProName + '数据总览',
                            x: 'center',
                            y: 'top',
                            textAlign: 'left'
                        },
                        series: [{
                            name: regProName,
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            symbolSize: function (val) {
                                if (val[2] >= 100) {
                                    return 45
                                }
                                if(val[2] >60 && val[2] <100){
                                    return 35
                                }
                                if(val[2]>20 && val[2]<60){
                                    return 15
                                }
                                if (val[2] <= 20) {
                                    return 10
                                }
                                return parseInt(val[2] / 3);
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            // scaleLimit: {min: 0.8, max: 1.9},//缩放
                            showSymbol: true,
                            zlevel: 1,
                            itemStyle: {
                                normal: {
                                    areaColor: 'rgb(5,21,34)',
                                    borderColor: 'rgb(10,102,200)',
                                    shadowBlur: 10,
                                    shadowColor: '#333'

                                },
                                emphasis: {
                                    areaColor: '#2a333d'
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: "#fff"

                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        color: "#fff"

                                    }
                                }
                            },
                            data: dataNew

                        }]

                    };
                    self.charts.setOption(option, true);

                }
            }

        },
        createSlidePro(){//进行轮播的省份
            let self = this;
            $('#proStl').empty();
            var ids, odiv, divObj;
            //选择所有的地图
            if (self.proAry.length > 0) {
                ids = self.proAry[self.proIndex].sub_name;
                odiv = $("<div class='allPro'  id=" + ids + " ></div>");
                $('#proStl').append(odiv);
                divObj = document.getElementById(ids);
                self.charts = echarts.init(divObj);
                echarts.registerMap(self.proAry[self.proIndex].name, self.proAry[self.proIndex].json);// 到省
                self.curProName = self.proAry[self.proIndex].name;
                self.childName = self.curProName;//根据不同 的省份传递饼图与柱形图的数据
                self.$dispatch('curProName', self.curProName)//将当前播放的省份地图传递给扇形图以便将对应的省份名字进行显示数据
                //对地图上的标识点的value
                var dataNew = [];
                    for (var j = 0; j < self.proAry[self.proIndex].detect_data.length; j++) {
                        var cur = self.proAry[self.proIndex].detect_data[j];
                        // var geoData = cur.lon_lat;  源数据
                        var geoData = cur.lon_lat.map((item)=>{ // 由于有一些经纬度的值会覆盖住一些市的名字，因此在源数据上多加0.05
                            return item+0.05
                        });
                        if (geoData) {
                            dataNew.push({
                                name: cur.detect_name,
                                value: geoData.concat(cur.oevent_count),
                                data: cur.event_data
                            })
                        }
                    }
                var option = {
                    tooltip: {
                        backgroundColor: 'rgb(44,44,46)',
                        trigger: 'item',
                        enterable: true,
                        triggerOn: 'click',
                        formatter: function (result) {//回调函数，
                            var color = ['red', '#f74c1a', 'yellow', 'blueviolet'];//全局设置饼图的颜色
                            if (self.changeAttack) {
                                if (result.data && result.data.data) {
                                    var attackAry = [];
                                    //提示信息的data数据
                                    for (var i = 0; i < result.data.data.length; i++) {
                                        attackAry.push({
                                            name: result.data.data[i].name,
                                            value: result.data.data[i].value,
                                            itemStyle: {
                                                normal: {
                                                    color: color[i],
                                                    label: {
                                                        show: true,
                                                        formatter: "{b}\n{c} ({d}%)",
                                                        position: 'top',
                                                        textStyle: {
                                                            fontSize: '12',
                                                            fontWeight: 'bold',
                                                        }
                                                    },
                                                },
                                                emphasis: {
                                                    label: {
                                                        show: true,
                                                        formatter: "{b}\n{c} ({d}%)",
                                                        // position: 'center',
                                                        textStyle: {
                                                            fontSize: '12',
                                                            fontWeight: 'bold',
                                                        }
                                                    }
                                                }
                                            }, labelLine: {
                                                normal: {
                                                    lineStyle: {
                                                        color: color[i],

                                                    }
                                                }
                                            }

                                        })
                                    }
                                    let oDiv = $("<div/>");
                                    let oDiv1 = $("<div/>");
                                    oDiv1.css({
                                        width: '350px',
                                        height: '300px',
                                        position: "relative",
                                        zIndex: "9999",
                                        color: "#444"
                                    }).appendTo(oDiv);
                                    oDiv1.append($("<div/>").css({
                                        borderBottom: "1px solid #f1f1f1",
                                        padding: 5,
                                        marginBottom: 5,
                                        color: "#fff",
                                        textAlign: 'left'
                                    }).html(`检测器 : ${result.name}`));
                                    let divPie = $("<div/>").css({
                                        width: '350px',
                                        height: '300px',
                                    }).attr("id", "aabb").appendTo(oDiv1);
                                    let cityOptionPie = {
                                        title: {
                                            text: '告警类型分布',
                                            x: 'center',
                                            y: 'top',
                                            textAlign: 'left',
                                            textStyle: {
                                                color: '#c6c6c6',
                                                fontSize: '1.2em'
                                            }
                                        },
                                        /* visualMap: {
                                         show: false,
                                         min: 10,
                                         max: 190,
                                         inRange: {
                                         colorLightness: [0, 1]
                                         }
                                         },*/
                                        textStyle: {
                                            color: '#fff'
                                        },
                                        series: [
                                            {
                                                name: '告警类型分布',
                                                type: 'pie',
                                                radius: [18, 40],
                                                data: attackAry,
                                                roseType: 'angle',
                                            }
                                        ]
                                    };
                                    setTimeout(() => {
                                        let cityChartPie = echarts.init($("#aabb")[0]);
                                        cityChartPie.setOption(cityOptionPie)
                                    }, 1)
                                    return oDiv[0].innerHTML
                                }
                            } else {
                                if (result.data && result.data.data) {
                                    var ds = [];
                                    for (var i = 0; i < result.data.data.length; i++) {
                                        ds.push({
                                            name: result.data.data[i].name,
                                            data: [parseInt(result.data.data[i].value)]
                                        })
                                    }
                                    let oDiv = $("<div/>");
                                    let oDiv1 = $("<div/>");
                                    oDiv1.css({
                                        width: '250px',
                                        height: '300px',
                                        position: "relative",
                                        zIndex: "9999",
                                        color: "#444",
                                    }).appendTo(oDiv);
                                    oDiv1.append($("<div/>").css({
                                        borderBottom: "1px solid #f1f1f1",
                                        padding: 5,
                                        marginBottom: 5,
                                        color: "#fff",
                                        textAlign: 'left',
                                    }).html(`处置统计:${result.name}`));
                                    let divPie = $("<div/>").css({
                                        width: '250px',
                                        height: '250px',
                                    }).attr("id", "warnDis").appendTo(oDiv1)
                                    setTimeout(() => {
                                        Highcharts.setOptions({//改变柱形图的颜色
                                            colors: ['#ff0000', '#00ff00']
                                        }),
                                            $('#warnDis').highcharts({
                                                chart: {
                                                    type: 'column',
                                                    backgroundColor: 'rgb(44,44,46)',
                                                },
                                                title: {
                                                    text: ''
                                                },
                                                subtitle: {
                                                    text: ''
                                                },
                                                credits: {
                                                    enabled: false
                                                },
                                                legend: {
                                                    itemStyle: {
                                                        'color': '#fff'
                                                        // 'fontSize' : '18px'
                                                    }
                                                },
                                                xAxis: {
                                                    categories: [],
                                                    crosshair: true,
                                                    visible: false
                                                },
                                                yAxis: {
                                                    min: 0,
                                                    title: {
                                                        text: ''
                                                    },
                                                    visible: false
                                                },
                                                tooltip: {
                                                    headerFormat: '<span style="font-size:10px">告警统计</span><table>',
                                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                                                    footerFormat: '</table>',
                                                    shared: true,
                                                    useHTML: true
                                                },
                                                plotOptions: {
                                                    column: {
                                                        dataLabels: {
                                                            enabled: true,  //显示数量提示
                                                            color: '#fff',
                                                            /* formatter : function() {
                                                             a = 35/150*100;    //a为当前柱状图y轴值除以总数然后乘以100
                                                             return a.toFixed(2) + "%";  //返回百分比
                                                             }*/
                                                        },
                                                        pointPadding: 0.2,
                                                        borderWidth: 0
                                                    }
                                                },
                                                series: ds
                                            });

                                    }, 1)
                                    return oDiv[0].innerHTML
                                }
                            }

                        }
                    },
                    legend: {},
                    title: {
                        text: self.proAry[self.proIndex].name + '数据总览',
                        x: 'center',
                        y: 'top',
                        textAlign: 'left'
                    },
                    geo: {
                        map: self.curProName,
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        zoom: 1.2,
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: 'rgb(5,21,34)',
                                borderColor: 'rgb(10,102,200)'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        },
                        layoutCenter: ['50%', '50%'],//让图表 宅dom盒子中间
                        layoutSize: '90%',//图表的大小

                    },
                    series: [{
                        name: self.curProName,
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        symbolSize: function (val) {
                            if (val[2] >= 100) {
                                return 45
                            }
                            if(val[2] >60 && val[2] <100){
                                return 35
                            }
                            if(val[2]>20 && val[2]<60){
                                return 15
                            }
                            if (val[2] <= 20) {
                                return 10
                            }
                            return parseInt(val[2] / 3);
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        // scaleLimit: {min: 0.8, max: 1.9},//缩放
                        showSymbol: true,
                        itemStyle: {
                            normal: {
                                areaColor: 'rgb(5,21,34)',
                                borderColor: 'rgb(10,102,200)',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: "#fff"

                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    color: "#fff"

                                }
                            }
                        },
                        data: dataNew
                    }]

                };
                self.charts.setOption(option, true);
            }

        },
        getDate (date) {
            let nowDate = new Date()
            nowDate.setDate(nowDate.getDate() - date + 1)
            nowDate = moment(nowDate).format('YYYY-MM-DD')
            return moment(nowDate).format('X') * 1000
        },
        selectTime (key) {
            for (var k in this.times) {
                this.times[k].style = 'no-select'
            }
            this.stime = this.times[key].stime
            this.etime = new Date().valueOf()
            this.timeSelected = key
            this.times[key].style = 'yes-select'
            this.$nextTick(() => {
                this.refresh()
            })
        },
        refresh: function () {
            var vm = this;
            vm.$nextTick(() => {
                vm.getProData();
            })

        },
    },
    watch: {
        selectedData(val){
            if (val) {
                this.selectedData = val
                return
            }
        },
        changeAttack(newVal, oldval){
            if (newVal) {
                this.changeNextPage = newVal;
            }
            this.getProData()//饼图与柱状图切换的时候调用
        },
        childTrue(newVal, oldval){
            this.childTrue = newVal;
        },
        getMapSliderData(newVal, oldval){
            this.getMapSliderData = newVal
        },
        showOff(newVal){
            // if (newVal) {
            //     this.createSlidePro()
            // }
            this.childShow = newVal
        },
        chinaVals(val, oldval){
            this.chinaVals = val
        },
        getSliderName(newval, oldval){
            this.getSliderName = newval
            this.pinyin = newval;
        }

    },
    computed: {
        intervalTime () {
            let time = 1
            switch (this.timeSelected) {
                case '1':
                    time = 1
                    break
                default:
                    time = 7
            }
            return time
        }
    },
    events: {
        "changeAttackFalse": function (changeFalse) {
            this.changeAttack = changeFalse
        },
        "changeAttackTrue": function (changeTrue) {
            var self = this;
            this.childTrue = changeTrue;//这个是从柱形图派发过来的值
            if (self.childTrue) {//判断当柱形图轮播完成后在移除掉当前的地图
                self.changeAttack = true;//在移除当前地图之前改变一下让饼图出现
                if (self.proIndex === self.proAry.length - 1) {
                    this.childTrue = false;
                    if (self.chinaVals == true && self.missVals == false) {
                        this.childTrue = false;
                        self.$dispatch("nextChina", self.nextChina); // 如果当前是中国地图和省份地图，当到结尾的时候，跳转到中国地图
                        return
                    } else if (self.missVals == true) {
                        this.childTrue = false;
                        self.$dispatch("startFn", self.startParams)//当到结尾的时候，跳转到导弹图
                        return
                    } else {
                        self.proIndex = 0
                        return
                    }
                }
                self.proIndex++;
                self.createSlidePro();//再次调用画地图

            }
        }
    },
    ready(){
        var vm = this;
        window.clearTimeout(this.$parent.attackTimer)
        //   -----------从下拉列表里面把选择的值传过来  start-----
        for (var i = 0; i < vm.getMapSliderData.length; i++) {
            var cur = vm.getMapSliderData[i];
            vm.selectedData.push(cur.text);
            vm.selectedName.push(cur.subName);
        }
        ; //-----------------从下拉列表里面把选择的值传过来  end-------------

        vm.$nextTick(() => {
            vm.getProData();
        })
        this.interval = setInterval(this.refresh, this.interTime);
        this.$on('refresh', function (name) {
            if (name === this.name || !name) {
                clearInterval(vm.interval);
                vm.refresh();
                vm.interval = setInterval(vm.refresh, vm.interTime)
            }
        })
        var resizeTimer = null;
        window.onresize = function () {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                clearInterval(vm.interval);
                vm.refresh();
                vm.charts.resize();
                vm.interval = setInterval(vm.refresh, vm.interTime)
            }, 10);
        }
    },
    components: {
        attackCount,
        attackDisposedCount
    },
    destroyed() {  // add 8.14 zff  在v-if进行切换的时候清除定时器

    }
}

