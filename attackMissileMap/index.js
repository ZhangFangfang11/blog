import './style.less'
import template from './view.html'
import moment from 'moment'
import {bigScreen} from '../model.js'
import $ from 'jquery'
import echarts from 'echarts'
import _ from 'lodash'
import http from '../../../../commons/http'
import chinaData from '../../mapData/china.js'
import worldData from '../../mapData/world.js'
import {warnTypeMap, warnColorMap} from '../../configMap.js'
var nameMap = {
    'Afghanistan':'阿富汗',
    'Singapore':'新加坡',
    'Angola':'安哥拉',
    'Albania':'阿尔巴尼亚',
    'United Arab Emirates':'阿联酋',
    'Argentina':'阿根廷',
    'Armenia':'亚美尼亚',
    // 'French Southern and Antarctic Lands':'法属南半球和南极领地',
    'Fr. S. Antarctic Lands':'法属南半球和南极领地',
    'Australia':'澳大利亚',
    'Austria':'奥地利',
    'Azerbaijan':'阿塞拜疆',
    'Burundi':'布隆迪',
    'Belgium':'比利时',
    'Benin':'贝宁',
    'Burkina Faso':'布基纳法索',
    'Bangladesh':'孟加拉国',
    'Bulgaria':'保加利亚',
    'The Bahamas':'巴哈马',
    // 'Bosnia and Herzegovina':'波斯尼亚和黑塞哥维那',
    'Bosnia and Herz.':'波斯尼亚和黑塞哥维那',
    'Malta':'马尔他',
    'Belarus':'白俄罗斯',
    'Belize':'伯利兹',
    'Bermuda':'百慕大',
    'Bolivia':'玻利维亚',
    'Brazil':'巴西',
    'Brunei':'文莱',
    'Bhutan':'不丹',
    'Botswana':'博茨瓦纳',
    'Central African Rep.':'中非共和国',
    'Canada':'加拿大',
    'Switzerland':'瑞士',
    'Chile':'智利',
    'China':'中国',
    'Ivory Coast':'象牙海岸',
    'Cameroon':'喀麦隆',
    'Congo':'刚果民主共和国',
    'Dem. Rep. Congo':'刚果共和国',
    'Colombia':'哥伦比亚',
    'Costa Rica':'哥斯达黎加',
    'Saint Helena':'圣赫勒拿',
    'Cuba':'古巴',
    'Northern Cyprus':'北塞浦路斯',
    'Cyprus':'塞浦路斯',
    'Czech Republic':'捷克共和国',
    'Germany':'德国',
    'Djibouti':'吉布提',
    'Denmark':'丹麦',
    'Dominican Republic':'多明尼加共和国',
    'Algeria':'阿尔及利亚',
    'Ecuador':'厄瓜多尔',
    'Egypt':'埃及',
    'Eritrea':'厄立特里亚',
    'Spain':'西班牙',
    'Estonia':'爱沙尼亚',
    'Ethiopia':'埃塞俄比亚',
    'Finland':'芬兰',
    'Fiji':'斐',
    'Falkland Is.':'福克兰群岛',
    'France':'法国',
    'Gabon':'加蓬',
    'United Kingdom':'英国',
    'Georgia':'格鲁吉亚',
    'Ghana':'加纳',
    'Guinea':'几内亚',
    'Gambia':'冈比亚',
    'Guinea Bissau':'几内亚比绍',
    'Eq. Guinea':'赤道几内亚',
    'Greece':'希腊',
    'Greenland':'格陵兰',
    'Guatemala':'危地马拉',
    'French Guiana':'法属圭亚那',
    'Guyana':'圭亚那',
    'Honduras':'洪都拉斯',
    'Croatia':'克罗地亚',
    'Haiti':'海地',
    'Hungary':'匈牙利',
    'Indonesia':'印尼',
    'India':'印度',
    'Ireland':'爱尔兰',
    'Iran':'伊朗',
    'Iraq':'伊拉克',
    'Iceland':'冰岛',
    'Israel':'以色列',
    'Italy':'意大利',
    'Jamaica':'牙买加',
    'Jordan':'约旦',
    'Japan':'日本',
    'Kazakhstan':'哈萨克斯坦',
    'Kenya':'肯尼亚',
    'Kyrgyzstan':'吉尔吉斯斯坦',
    'Cambodia':'柬埔寨',
    'Korea':'韩国',
    'St. Vin. and Gren.':'',
    "S. Geo. and S. Sandw. Is.":'',
    "CuraÃ§ao":'',
   "SÃ£o TomÃ© and Principe":'',
    'Palau':'帕劳群岛',
    'N. Mariana Is.':'马里亚纳',
    'Guam':'关岛',
    'Micronesia':'密克罗尼西亚',
    'Solomon Is.':'所罗门群岛',
    'Heard I. and McDonald Is.':'赫德岛和麦克唐纳岛',
    'Siachen Glacier':'锡亚琴冰川',
    'N. Cyprus':'北赛普勒斯土耳其共和国',
    'Palestine':'巴勒斯坦',
    'Seychelles':'非洲塞舌尔群岛',
    'Br. Indian Ocean Ter.':'印度洋',
    'Comoros':'科摩罗',
    'Mauritius':'毛里求斯',
    'Tonga':'汤加',
    'Niue':'纽埃岛',
    'American Samoa':'美属萨摩亚',
    'Samoa':'萨摩亚',
    'Kiribati':'基里巴斯',
    'Fr. Polynesia':'玻里尼西亚',
    'Bahamas':' 巴哈马群岛',
    'Cayman Is.':'开曼群岛',
    'Turks and Caicos Is.':'特克斯和凯科斯群岛',
    'Dominican Rep.':'多米尼加代表',
    'U.S. Virgin Is.':'维珍',
    'Antigua and Barb.':'安提瓜和巴布达',
    'Montserrat':'蒙特塞拉特',
    'Dominica':'多米尼加岛',
    'Saint Lucia':'圣卢西亚岛',
    'Barbados':'巴巴多斯',
    'Grenada':'格林纳达',
    'Aland':'奥兰',
    'Faeroe Is.':'法罗群岛',
    'St. Pierre and Miquelon':'圣皮埃尔和密克隆群岛',
    'Isle of Man':'曼岛',
    'Jersey':'泽西岛',
    'Czech Rep.':'捷克共和国',
    'Liechtenstein':'列支敦士登',
    'Andorra':'安道尔',
    // 'South Korea':'韩国',
    'Kosovo':'科索沃',
    'Kuwait':'科威特',
    'Lao PDR':'老挝',
    'Lebanon':'黎巴嫩',
    'Liberia':'利比里亚',
    'Libya':'利比亚',
    'Sri Lanka':'斯里兰卡',
    'Lesotho':'莱索托',
    'Lithuania':'立陶宛',
    'Luxembourg':'卢森堡',
    'Latvia':'拉脱维亚',
    'Morocco':'摩洛哥',
    'Moldova':'摩尔多瓦',
    'Madagascar':'马达加斯加',
    'Mexico':'墨西哥',
    'Macedonia':'马其顿',
    'Mali':'马里',
    'Myanmar':'缅甸',
    'Montenegro':'黑山',
    'Mongolia':'蒙古',
    'Mozambique':'莫桑比克',
    'Mauritania':'毛里塔尼亚',
    'Malawi':'马拉维',
    'Malaysia':'马来西亚',
    'Namibia':'纳米比亚',
    'New Caledonia':'新喀里多尼亚',
    'Niger':'尼日尔',
    'Nigeria':'尼日利亚',
    'Nicaragua':'尼加拉瓜',
    'Netherlands':'荷兰',
    'Norway':'挪威',
    'Nepal':'尼泊尔',
    'New Zealand':'新西兰',
    'Oman':'阿曼',
    'Pakistan':'巴基斯坦',
    'Panama':'巴拿马',
    'Peru':'秘鲁',
    'Philippines':'菲律宾',
    'Papua New Guinea':'巴布亚新几内亚',
    'Poland':'波兰',
    'Puerto Rico':'波多黎各',
    'Cape Verde':'佛得角',
    'Guinea-Bissau':'几内亚比绍',
    "CÃ´te d'Ivoire":'科特迪瓦',
    // 'North Korea':'北朝鲜',
    // 'Korea':'朝鲜',
    'Portugal':'葡萄牙',
    'Paraguay':'巴拉圭',
    'Qatar':'卡塔尔',
    'Romania':'罗马尼亚',
    // 'Russia':'俄罗斯',
    'Rwanda':'卢旺达',
    'W. Sahara':'西撒哈拉',
    'Saudi Arabia':'沙特阿拉伯',
    'Bahrain':'巴林',
    'Sudan':'苏丹',
    'S. Sudan':'南苏丹',
    'Senegal':'塞内加尔',
    'Solomon Islands':'所罗门群岛',
    'Sierra Leone':'塞拉利昂',
    'El Salvador':'萨尔瓦多',
    'Somaliland':'索马里兰',
    'Somalia':'索马里',
    'Serbia':'塞尔维亚',
    'Suriname':'苏里南',
    'Slovakia':'斯洛伐克',
    'Slovenia':'斯洛文尼亚',
    'Sweden':'瑞典',
    'Swaziland':'斯威士兰',
    'Syria':'叙利亚',
    'Chad':'乍得',
    'Togo':'多哥',
    'Thailand':'泰国',
    'Tajikistan':'塔吉克斯坦',
    'Turkmenistan':'土库曼斯坦',
    'Timor-Leste':'东帝汶',
    'Trinidad and Tobago':'特里尼达和多巴哥',
    'Tunisia':'突尼斯',
    'Turkey':'土耳其',
    'Tanzania':'坦桑尼亚',
    'Uganda':'乌干达',
    'Ukraine':'乌克兰',
    'Uruguay':'乌拉圭',
    // 'United States of America':'美国',
    'Uzbekistan':'乌兹别克斯坦',
    'Venezuela':'委内瑞拉',
    'Vietnam':'越南',
    'Vanuatu':'瓦努阿图',
    'West Bank':'西岸',
    'Yemen':'也门',
    'South Africa':'南非',
    'Zambia':'赞比亚',
    'Zimbabwe':'津巴布韦'
};

let missleData = {
    "木马攻击": [
        [
            {
                name: '北京',
                lon_lat: [116.4551, 40.2539]
            },
            {
                name: '上海',
                lon_lat: [121.4648, 31.2891],
                value: 95
            }
        ],
        [
            {
                name: '北京',
                lon_lat: [116.4551, 40.2539]
            },
            {
                name: '大连',
                lon_lat: [122.2229, 39.4409],
                value: 25
            }
        ],
    ],
    "漏洞利用": [
        [
            {
                name: '北京',
                lon_lat: [116.4551, 40.2539]
            },
            {
                name: '韶关',
                lon_lat: [113.7964, 24.7028],
                value: 15
            }
        ],
        [
            {
                name: '北京',
                lon_lat: [116.4551, 40.2539]
            },
            {
                name: '哈尔滨',
                lon_lat: [127.9688, 45.368],
                value: 95
            }
        ],
    ]
}
// var color = ['rgb(1,168,252)', 'yellow',  'rgb(219,67,199)', 'blue','rgb(252,6,75)'];
var color = ['rgb(254,226,0)', 'rgb(189,91,254)','rgb(0,224,2)','rgb(253,133,30)','rgb(0,210,255)','rgb(132, 128, 255)','rgb(252,6,75)','rgb(28,101,249)','rgb(1,188,191)','rgb(125,144,246)','rgb(163,106,0)','rgb(146,163,90)','rgb(219,67,199)','rgb(194, 11, 120)','rgb(153, 220, 13)',];
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
        getMapSliderData: {
            type: Array,
            default: function () {
                return []
            }
        },
        chinaVals: {
            type: Boolean,
            default: function () {
                return false
            }
        },
        flag: {
            type: Boolean,
        },
        intervalTime: {
            type: Number,
        },
        missile: {
            type: Boolean,
        },


    },
    data: function () {
        let vm = this
        let stime = vm.getDate(7)
        let etime = new Date().valueOf()
        return {
            interval: '',
            interTime: 60000,
            typeBarData: {
                key: [],
                data: []
            },
            timeSelected: 7,
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
            mapData: [],
            Chart: {},
            proData: [],//add 7.26 zff
            LegendTimer: null, //add 7.26 zff
            index: 0,  //add 7.26 zff
            mapIndex: 0,//add 7.26 zff
            attackMapTimer: null,//add 7.26 zff
            selectedProName: null,//add 7.26 zff
            missle_data: {},
            // missle_data: missle_data,
            nextChina: 1,
            nextPro: 2,
            timeT: 12000,
        }
    },
    watch: {
        getMapSliderData(val){
            this.getMapSliderData = val
        },
        chinaVals(val){
            this.chinaVals = val;
        },
        flag(newVal, oldVal){
            this.Chart.resize();
        },
    },
    methods: {
        getMissileMap(){
            var self = this;
            var param = {
                start_time: this.startTime,
                end_time: this.endTime,
                interval_time: this.intervalTime,
            }
            bigScreen.getMissileData(param).then(res => {
                self.missle_data = res.data;
                self.missileMap();
            }).catch()
            // self.missileMap();
        },
        //迁移图
        missileMap(){
            var self = this
            self.Chart = echarts.init(document.getElementById('attack-missile-map'));
            var series = [];
            var legendData = [];
            var missle_key = Object.keys(self.missle_data);
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = dataItem[0].lon_lat;
                    var toCoord = dataItem[1].lon_lat;
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[0].name,
                            toName: dataItem[1].name,
                            coords: [fromCoord, toCoord]
                        });
                    }
                }
                return res;
            };
            for (var i = 0; i < missle_key.length; i++) {
                series.push(
                    {
                    name: missle_key[i],
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        symbol: 'arrow',
                        show: true,
                        period:2,
                        trailLength: 0.1,
                        symbolSize: 7
                    },
                    lineStyle: {
                        normal: {
                            width: 0,
                            curveness: 0.2
                        }
                    },
                    data: convertData(self.missle_data[missle_key[i]])
                },
                )
                //----------------------
                let datas=[]
                self.missle_data[missle_key[i]].forEach(item=>{
                    item.forEach(i=>{
                        if(i.value){
                            datas.push({
                                name:i.name,
                                value:i.lon_lat
                            })


                        }

                    })
                })
                series.push({
                    name: "",
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: datas,
                    symbolSize:10,
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            position: 'bottom',
//                        show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color:'red',
                            shadowBlur: 2,
                            shadowColor: '#fff'
                        }
                    },
                    zlevel: 1

                })

                //---------------------
                legendData.push({
                    name: missle_key[i],
                    textStyle: {
                        color: color[i]
                    },
                    icon: 'circle'//改变图例的形状 小圆点
                })
            }
        self.option = {
                backgroundColor: '#000',
                title: {
                    text: '攻击态势',
                    subtext: '',
                    left: 'center',
                    textStyle: {
                        color: '#2a333d'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (result) {
                        return result.name
                    }

                },
                color: color,
                legend: {
                    orient: 'vertical',
                    bottom: '25%',
                    left: 'left',
                    itemGap: 20,
                    data: legendData
                },
                geo: {
                    map:'world',
                    nameMap: nameMap,//中英文对应
                    label: {
                        normal: {
                            // show: true,
                            show: false,
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
                    layoutCenter: ['50%', '50%'],
                    layoutSize: '100%',
                    regions: [
                        {
                            name: 'Russia',
                            label: {
                                normal: {
                                    formatter: function (params) {
                                        return '俄罗斯'
                                    },
                                    textStyle: {
                                        color: '#fff',
                                    }

                                },
                                emphasis:{
                                    show:true,
                                    formatter: function (params) {
                                        return '俄罗斯'
                                    },
                                }
                            }

                        },
                        {
                            name: 'United States of America',

                            label: {
                                normal: {
                                    formatter: function (params) {
                                        return '美国'
                                    },
                                    show: false,

                                    textStyle: {
                                        color: '#fff',
                                    }

                                },
                                emphasis:{
                                    show:true,
                                    formatter: function (params) {
                                        return '美国'
                                    },
                                }
                            }

                        }
                    ],
                },
                series: series,

            };
            self.Chart.setOption(self.option);
            //添加动画效果
            $('#attack-missile-map').addClass('animated  bounceInRight')
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
            var vm = this
            vm.typeBarData.key = []
            vm.typeBarData.data = []
            vm.typeBarData.ids = []
            vm.$nextTick(() => {
                vm.getMissileMap()
            })
        }
    },
    computed: {},
    ready: function () {
        var vm = this
        vm.$nextTick(() => {
            vm.getMissileMap();
        })
        var resizeTimer = null;
        this.$on('refresh', function (name) {
            if (name === this.name || !name) {
                clearInterval(vm.interval);
                vm.refresh();
                vm.interval = setInterval(vm.refresh, vm.interTime)
            }
        })
        window.onresize = function () {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                clearInterval(vm.interval);
                vm.refresh();
                vm.Chart.resize();
                vm.interval = setInterval(vm.refresh, vm.interTime)
            }, 10);
        }

    },
    components: {}
}



