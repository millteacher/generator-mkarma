module.exports=function  (yo) {
	yo.spawnCommandSync('npm',['init']);
	var bowersLanucher='karma-'+yo.props.bowers+'-lanucher';
	yo.spawnCommandSync('cnpm',[
		'i','jasmine-core','karma',
		'karma-jasmine','karma-coverage',
		bowersLanucher,'--save-dev']);
	if(yo.props.needCli){
		yo.spawnCommandSync('cnpm',['i','karma-cli','-g']);
	}
	yo.spawnCommandSync('karma',['init']);
}