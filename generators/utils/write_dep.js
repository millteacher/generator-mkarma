//向package.json中写入依赖项

var mfs=require(require.resolve("./fs_factory"));
console.info(mfs);
var fs_= mfs();

exports.writeDep=function  (filepath,content) {

	
	var curContent=fs_.fs.readJSON(filepath);
	if(!Array.isArray(content)){
		throw "必须传入数组";
	}
	//curContent代表package.json数据转换的对象,添加一个属性代表json中添加一个项
	curContent.devDependencies={};
	content.forEach(function  (item,index,arr) {
		var key=Object.keys(item)[0];
		curContent.devDependencies[key]=item[key];
	});
	
	fs_.fs.writeJSON(filepath, curContent);
}


