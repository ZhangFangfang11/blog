/**
 * Created by L-zhangfangfang on 2017/11/14.
 */

var fs=require('fs');
var path=require('path');
var express=require('express');
readHtml=(callback)=>{
  fs.readFile(path.resolve(__dirname+'/htmldata.json'),'utf8',(err,data)=>{
    if(err || data.length===0) data='[]';
    callback(JSON.parse(data))
  })
}

writeHtml=(data,callback)=>{
  fs.writeFile(path.resolve(__dirname+'/htmldata.json'),JSON.stringify(data),callback)
}
module.exports={
  readHtml,
  writeHtml
}
