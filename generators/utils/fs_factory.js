var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var ejs = require('ejs');

var store = memFs.create();
var sfs = editor.create(store);

var msf={};
 msf.fs={};
 msf.ejs={};

//封装util也就是工具类，之后我们的逻辑就直接依赖自己的模块
module.exports=function  () {
	msf.fs.write=function  (filepath, contents,callback) {
		var result= sfs.write(filepath, contents);
		sfs.commit(callback||function  () {
			console.log("write done");
		});
	};

	msf.fs.writeJSON=function(filepath, contents) {
		var result= sfs.writeJSON(filepath, contents);
		sfs.commit(function  () {console.log("writeJSON done");});
	};
	//实现对sfs模块有选择性的克隆,其中两个写方法，因为要代入自己的逻辑，所以在这里进行排除
	for (var i in sfs) {
		if(i!='writeJSON'&&i!='write')
		msf.fs[i]=sfs[i];
	};

	//加入ejs的渲染功能
	msf.ejs.render=ejs.render;

	return msf;
}