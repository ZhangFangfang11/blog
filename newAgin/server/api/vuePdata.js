/**
 * Created by L-zhangfangfang on 2017/11/14.
 */
var express=require('express');
var fs=require('fs');
var path=require('path');
function readVue(callback) {
  fs.readFile(path.resolve(__dirname +'/vuedata.json'),'utf8',function (err,data) {
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
