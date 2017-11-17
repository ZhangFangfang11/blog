/**
 * Created by L-zhangfangfang on 2017/11/14.
 */

var fs=require('fs');
var path=require('path');
var express=require('express');
readjs=(callback)=>{
  fs.readFile(path.resolve(__dirname+'/jsdata.json'),'utf8',(err,data)=>{
    if(err || data.length===0) data='[]';
    callback(JSON.parse(data))
  })
}

writejs=(data,callback)=>{
  fs.writeFile(path.resolve(__dirname+'/jsdata.json'),JSON.stringify(data),callback)
}
module.exports={
  readjs,
  writejs
}
