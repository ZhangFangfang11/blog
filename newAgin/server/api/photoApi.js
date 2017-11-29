/**
 *
 * Created by L-zhangfangfang on 2017/11/20.
 */

var fs=require('fs')
var path=require('path')
 function readPhoto(callback){
  fs.readFile(path.resolve(__dirname+'/photoApi.json'),'utf8',function (err,data) {
    if(err || data.length===0) data='[]';
    callback(JSON.parse(data))
  })
 }
function writePhoto(data,callback){
   fs.writeFile(path.resolve(__dirname+'/photoApi.json'),JSON.stringify(data),callback)
}
module.exports={
  readPhoto,
  writePhoto
}
