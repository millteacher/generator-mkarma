var memFs = require('mem-fs');
var editor = require('mem-fs-editor');

var store = memFs.create();
var fs = editor.create(store);

var msf={};
msf.fs=fs;

//封装util也就是工具类，之后我们的逻辑就直接依赖自己的模块
module.exports=function  () {
	msf.fs.write=function  (filepath, contents,callback) {
		var result= fs.write(filepath, contents);
		fs.commit(callback||function  () {
			console.log("write done");
		});
	};
	msf.fs.writeJSON=function  (filepath, contents, replacer , space) {
		var result= fs.writeJSON(filepath, contents, replacer , space);
		fs.commit(function  () {console.log("writeJSON done");});
	};
	return msf;
}