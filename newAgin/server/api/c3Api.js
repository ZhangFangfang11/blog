var fs=require('fs');
let express =require('express');
let path=require('path');
// let http=require('http');
// let url=require('url');
//我们对书的增删改查 操作的都是books.json文件
function readC3(callback) {
  fs.readFile(path.resolve(__dirname +'/c3data.json'),'utf8',function (err,data) {
    if(err || data.length === 0) data = '[]';
    callback(JSON.parse(data));
  })
}

function writeC3(data,callback) {
  fs.writeFile(path.resolve(__dirname+'/c3data.json'),JSON.stringify(data),callback)
}
console.log(path.resolve(__dirname+'/c3data.json'),'name')
module.exports={
  readC3,writeC3
}
