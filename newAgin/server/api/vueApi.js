var fs=require('fs');
let express =require('express');
let path=require('path');
let http=require('http');
let url=require('url');
//我们的增删改查 操作的都是books.json文件
function readVue(callback) {
  fs.readFile(path.resolve(__dirname +'/aa.json'),'utf8',function (err,data) {
    if(err || data.length === 0) data = '[]';
    callback(JSON.parse(data));
  })
}

function writeVue(data,callback) {
  fs.writeFile(path.resolve(__dirname+'/vuedata.json'),JSON.stringify(data),callback)
}

console.log(path.resolve(__dirname+'/vuedata.json'),'5555555')
module.exports={
  readVue,writeVue
}
