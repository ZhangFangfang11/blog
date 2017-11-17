var express =require('express');
var http=require('http');
var url=require('url');
var moment = require('moment');
let app=express();
let vueApi=require('./api/vueApi.js');
let c3Api=require('./api/c3Api.js');
let jsApi=require('./api/jsApi.js');
let htmlApi=require('./api/htmlApi.js');
let highApi=require('./api/highApi.js');
let echartApi=require('./api/echartsApi.js');
let lyApi=require('./api/lyApi.js');
var bodyParser = require('body-parser')  ////默认情况下Express并不知道该如何处理该请求体，因此我们需要增加bodyParser中间件，用于分析
//application/x-www-form-urlencoded和application/json
//请求体，并把变量存入req.body。我们可以像下面的样子来“使用”中间件[这个保证POST能取到请求参数的值]：
app.use(bodyParser.urlencoded({ extended: true }))  //
app.use(bodyParser.json());
app.listen(3000,()=>{
  console.log('this is 3000 part')
})

//vue
app.get('/api/vuep',(req,res)=>{
  var {pathname,query}=url.parse(req.url,true);
  let params=query.id;
  if(params){
    vueApi.readVue((data)=>{
      var vus=data.find(item=>item.id==params);
      res.send(vus)
    })
  }else{
    vueApi.readVue((sk)=>{
      res.send(sk)
    })
  }

})

//css3
app.get('/api/c3p',(req,res)=>{
  var {pathname,query}=url.parse(req.url,true);
  var cid=query.id;
  if(cid){
    c3Api.readC3(data=>{
      var cdata=data.find(item=>item.id==cid);
      res.send(cdata)
    })
  }else{
    c3Api.readC3((result)=>{
      res.send(result)
    })
  }

})
//js
app.get('/api/jsp',(req,res)=>{
  var {pathname,query}=url.parse(req.url,true);
  let jid=query.id;
  if(jid){
    jsApi.readjs(data=>{
      var jdata=data.find(item=>item.id==jid)
      res.send(jdata)
    })
  }else{
    jsApi.readjs((result)=>{
      res.send(result)
    })
  }

})
//html
app.get('/api/htmlp',(req,res)=>{
  var {pathname,query}=url.parse(req.url,true);
  let hid=query.id;
  if(hid){
    htmlApi.readHtml(data=>{
      var hdata=data.find(item=>item.id==hid)
      res.send(hdata)
    })
  }else{
    htmlApi.readHtml((result)=>{
      res.send(result)
    })
  }

})
//highcharts
app.get('/api/highp',(req,res)=>{
  var {pathname,query}=url.parse(req.url,true);
  let hiid=query.id;
  if(hiid){
    highApi.readHigh(data=>{
      var d=data.find(item=>item.id==hiid)
      res.send(d)
    })
  }else{
    highApi.readHigh(bb=>{
      res.send(bb)
    })
  }

})

//echarts
app.get('/api/ep',(req,res)=>{
  var {pathname,query}=url.parse(req.url,true);
  let eid=query.id;
  if(eid){
    echartApi.readEchart(data=>{
      var edata=data.find(item=>item.id==eid)
      res.send(edata)
    })
  }else{
    echartApi.readEchart((result)=>{
      res.send(result)
    })
  }

})

//添加留言板信息
app.post('/api/lyp',(req,res)=>{
var ly=req.body;
    lyApi.readLy(function (lyAry) {
      ly.id = lyAry.length && lyAry[lyAry.length-1].id?lyAry[lyAry.length-1].id+1:1;
      lyAry.push(ly);
      lyApi.writeLy(lyAry,function () {
        //一般 添加成功后 返回添加的那一项
        res.end(JSON.stringify(ly));

      })
    })

})
app.get('/api/lyp',(req,res)=>{
  lyApi.readLy(result=>{
    res.send(result)
  })
})
