// config.js配置校验
const config = require('../config.js');
const defaultConfig = require('../default_config/defaultConfig.js');
const fs = require('fs');


module.exports = function() {
	// filterStatusCode
	if(!Array.isArray(config.filterStatusCode)) {
		throw 'filterStatusCode必须是一个数组'
	}
	
	// openPageTimeout
	if(typeof config.openPageTimeout != 'number') {
		throw '配置文件出错， openPageTimeout必须是number类型'
	}
	
	// dataName
	try{
		fs.statSync(defaultConfig.dataPath + config.dataName)
	}catch{
		let errStr = `配置文件出错，找不到${config.dataName}文件`
		throw errStr;
	}
	
	//browserInterface
	if(typeof config.browserInterface != 'boolean'){
		throw "配置文件出错，browserInterface应该是个布尔型数据";
	}
	
	//ignoreHTTPSErrors
	if(typeof config.ignoreHTTPSErrors != 'boolean'){
		throw "配置文件出错，ignoreHTTPSErrors应该是个布尔型数据";
	}
	
	// threadNum
	if(typeof config.threadNum != 'number' || parseInt(config.threadNum) != config.threadNum){
		throw "配置文件出错，threadNum应该是个整数数值";
	}
	if(config.threadNum <= 0) {
		throw "配置文件出错， threadNum最少是1";
	}
	
	// fullPage
	if(typeof config.fullPage != 'boolean'){
		throw "配置文件出错，fullPage应该是个布尔型数据";
	}
	
	// screenshotDelay
	if(typeof config.screenshotDelay != 'number' || parseInt(config.screenshotDelay) != config.screenshotDelay){
		throw "配置文件出错，screenshotDelay应该是个整数数值";
	}
	
	// slashReplace
	let slashReplaceCannotArr = ['/', '\\', ':', '*', '?', '"', '<', '>', '|']
	if(typeof config.slashReplace != 'string'){
		throw "配置文件出错，slashReplace应该是个字符串";
	}
	if(config.slashReplace.length == 0 || config.slashReplace.indexOf(' ') != -1) {
		throw "配置文件出错，slashReplace不能为空";
	}
	for(let i=0; i<slashReplaceCannotArr.length; i++) {
		if(config.slashReplace.indexOf(slashReplaceCannotArr[i]) != -1) {
			let errStr = "配置文件出错，slashReplace不能是" + slashReplaceCannotArr[i];
			throw errStr;
		}
	}
	
	// mhReplace
	if(typeof config.mhReplace != 'string'){
		throw "配置文件出错，mhReplace应该是个字符串";
	}
	if(config.mhReplace.length == 0 || config.mhReplace.indexOf(' ') != -1) {
		throw "配置文件出错，mhReplace不能为空";
	}
	for(let i=0; i<slashReplaceCannotArr.length; i++) {
		if(config.mhReplace.indexOf(slashReplaceCannotArr[i]) != -1) {
			let errStr = "配置文件出错，mhReplace不能是" + slashReplaceCannotArr[i];
			throw errStr;
		}
	}
	
}