let express =require('express');
let http=require('http');
let url=require('url');
let fs=require('fs');
let app=express();
let vueApi=require('./api/vuePdata.js');
let c3Api=require('./api/c3Api.js')
var bodyParser = require('body-parser')  //express必须要进行的配置
app.use(bodyParser.urlencoded({ extended: true }))  //
app.use(bodyParser.json());
//vue
app.get('/api/vuep',(req,res)=>{
  vueApi.readVue((sk)=>{
    console.log(sk,'88')
    res.send(sk)
  })


})
app.get('/api/c3p',(req,res)=>{
  c3Api.readC3((result)=>{
    res.send(result)
  })
// res.json('ok')
})
app.listen(3000,()=>{
console.log('this is 3000 part')
})
