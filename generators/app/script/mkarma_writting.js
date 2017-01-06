
var wd=require(require.resolve("../../utils/write_dep"));
module.exports=function  (yo,chalk) {
	yo.spawnCommandSync('cnpm',['init']);

	//当前依赖项的版本 `是es6的多行文本写法`
	var devDependent=`[{"devDependencies": {
		"jasmine-core": "^2.5.2",
		"karma": "^1.3.0",
		"karma-jasmine": "^1.1.0",
		"karma-coverage": "^1.1.1",
		"bowersLauncher": "^2.0.0"
	}},{
		"keywords": [
		    "karma",
		    "test"
		]
	}]

	`;
	var bowersLauncher="karma-".concat(yo.props.bowers,"-lanucher");
	devDependent=devDependent.replace("bowersLauncher",bowersLauncher);
	devDependent=JSON.parse(devDependent);


	//安装依赖项

	var result=yo.spawnCommandSync('cnpm',[
		'i','jasmine-core','karma',
		'karma-jasmine','karma-coverage',
		bowersLauncher,'--save-dev']);
	if(yo.props.needCli){
		yo.spawnCommandSync('cnpm',['i','karma-cli','-g']);
	}
	yo.spawnCommandSync('karma',['init']);
	//如果依赖项安装失败,则将依赖项写入package.json。让用户自行 npm install
	//如果要测试安装失败的效果,可将上面的依赖项改错一个名字
	if(result.status!=0){
		yo.log(chalk.blue("安装依赖的过程中出现问题,请自行运行npm install"));
		wd.writeDep(yo.destinationPath('package.json'),devDependent,true);
	}
}