var fs=require('fs');
var path=require('path');
function readLy(callback) {
  fs.readFile(path.resolve(__dirname+'/lydata.json'),'utf8',function (err,data) {
    if(err || data.length===0) data='[]'
    callback(JSON.parse(data))
  })
}
function writeLy(data,callback){
  fs.writeFile(path.resolve(__dirname+'/lydata.json'),JSON.stringify(data),callback)
}
module.exports={
  readLy,
  writeLy
}
