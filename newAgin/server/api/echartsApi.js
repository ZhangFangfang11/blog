/**
 * Created by L-zhangfangfang on 2017/11/14.
 */
var fs=require('fs');
var express=require('express');
var path=require('path');
function readEchart(callback) {
  fs.readFile(path.resolve(__dirname+'/echartsdata.json'),'utf8',function (err,data) {
    if(err|| data.length ===0){
      data='[]'
    }
    callback(JSON.parse(data));
  })
}
function writeEchart(data,callback){
  fs.writeFile(path.resolve(__dirname+'/echartsdata.json'),JSON.stringify(data),callback)
}
module.exports={
  readEchart,
  writeEchart
}
