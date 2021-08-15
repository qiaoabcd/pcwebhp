// 输出文件夹初始化，创建images目录跟截图成功失败保存的txt文件
const fse = require('fs-extra');
const fs = require('fs');
module.exports = function(outputPath) {
	// 创建img目录跟，
	fse.mkdirs(outputPath + '/images', function(err) {
		if(err) throw '出现异常'
	});
	// 创建截图成功的txt
	fse.ensureFile(`${outputPath}/succeedScreenshot.txt`, function (err) { 
	   if(err) throw '创建succeedScreenshot.txt异常'
		 fs.appendFile(`${outputPath}/succeedScreenshot.txt`, '这是已经截图的：', function(){});
	})
	// 创建截图失败的txt
	fse.ensureFile(`${outputPath}/failScreenshot.txt`, function (err) {
	   if(err) throw '创建failScreenshot.txt异常'
		 fs.appendFile(`${outputPath}/failScreenshot.txt`, '这是没有截图的：', function(){});
	})
	
}