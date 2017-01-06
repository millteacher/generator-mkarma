//向json中写入依赖项

var mfs=require(require.resolve("./fs_factory"));
var fs_= mfs();

exports.writeDep=function  (filepath,content,asArray) {

	//curContent代表package.json数据转换的对象,添加一个属性代表json中添加一个项
	var curContent=fs_.fs.readJSON(filepath);
	if(!asArray){//不是类数组对象的可能性大，所以放前面，提高性能一丢丢
		getContentSingle(content,curContent);
	}else{
		//如果是数组要求,每一个元素都有key
		content.forEach(function  (item,index,arr) {
			getContentSingle(item,curContent);
		});
	}
	
	/*这一片代码没有灵活性,为统一课堂代码作为注释,下一个版本将删除
	curContent.devDependencies={};
	content.forEach(function  (item,index,arr) {
		var key=Object.keys(item)[0];
		curContent.devDependencies[key]=item[key];
	});*/


	
	fs_.fs.writeJSON(filepath, curContent);
}
//私有方法,为配置文件加入内容
function getContentSingle (content,curContent) {
	var key=Object.keys(content)[0];
	if(!key){
		throw "写入的依赖项必须有key";
	}
	if(!curContent[key]){
		curContent[key]=content[key];
	}else{//Es6语法请确保你的nodejs>6.*.*
		Object.assign(curContent[key],content[key]);
	}
}


