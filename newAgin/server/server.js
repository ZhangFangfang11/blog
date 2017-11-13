
let express =require('express');
let http=require('http');
let url=require('url');
let fs=require('fs');
let app=express();
var bodyParser = require('body-parser')  //express必须要进行的配置
app.use(bodyParser.urlencoded({ extended: true }))  //
app.use(bodyParser.json());

//我们对书的增删改查 操作的都是books.json文件
function readBooks(callback) {
  fs.readFile('./c3data.json','utf8',function (err,data) {
    if(err || data.length === 0) data = '[]';
    callback(JSON.parse(data));
  })
}

function read(callback) {
  fs.readFile('./echartsdata.json','utf8',function (err,data) {
    if(err || data.length === 0) data = '[]';
    callback(JSON.parse(data));
  })
}

function writeBooks(data,callback) {
  fs.writeFile('./c3data.json',JSON.stringify(data),callback)
}

app.get('/asa',(req,res)=>{
  readBooks((data) => {
  // console.log(res.json(data),'dsssssssssssss')
  //   res.send(data)
    res.send('8888888')
    console.log('9999999999')
  })
})
app.get('/aaa',(req,res)=>{
  console.log('sy')
  read((sy)=>{
    console.log('yyyy')
    res.send(sy)
  })

})

app.listen(4000,()=>{
console.log('this is 4000 part')
})
