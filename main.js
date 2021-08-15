// 主线程
const {
	Worker,
} = require('worker_threads');
const fs = require('fs');
const config = require('./config.js');
const defaultConfig = require('./default_config/defaultConfig.js');
const configVerify = require('./lib/configVerify.js');
const getDate = require('./lib/getDate.js');
const outputInit = require('./lib/outputInit.js');

// 校验配置
configVerify();

(async () => {
	let workerYesNum = 0; // 当前完成工作的线程数量
	let yesWorkNum = 0; // 当前完成的任务总数

	// 同步读取文件内容并将数据转换为数组格式
	const dataArr = fs.readFileSync(defaultConfig.dataPath + config.dataName).toString().split("\r\n");
	let outputPath = `${defaultConfig.outputPath}${config.dataName}-${getDate()}`;
	outputInit(outputPath); // 初始化输出文件

	if (dataArr.length <= config.threadNum) {
		config.threadNum = dataArr.length
	}

	let threadWorkload = Math.floor(dataArr.length / config.threadNum);
	let workerObj = {};
	for (let i = 0; i < config.threadNum; i++) {
		let thisWorkerData;
		if (i == config.threadNum - 1) {
			thisWorkerData = dataArr.slice(i * threadWorkload);
		} else {
			thisWorkerData = dataArr.slice(i * threadWorkload, i * threadWorkload + threadWorkload);
		}
		workerObj['worker' + i] = new Worker('./worker/worker.js', {
			workerData: {
				"thisWorkerData": thisWorkerData,
				"thread": i,
				"outputPath": outputPath
			},
		});

		workerObj['worker' + i].on('message', workerMsg);
		workerObj['worker' + i].on('error', function() {
			console.log('有工作线程出错了')
		});
	}

	// 工作线程发来消息
	function workerMsg(obj) {
		if (obj.type == 'yes') {
			workerYesNum++;
			if (workerYesNum == config.threadNum) {
				console.log('完成！！！');
			}
		}

		if (obj.type == 'progress') {
			yesWorkNum++;
			console.clear();
			console.log('当前进度：', 100 / (dataArr.length / yesWorkNum), '%')
		}

		if (obj.type == 'succeedScreenshot') {
			fs.appendFile(`${outputPath}/succeedScreenshot.txt`, '\r\n' + obj.data, function() {});
		}

		if (obj.type == 'failScreenshot') {
			fs.appendFile(`${outputPath}/failScreenshot.txt`, '\r\n' + obj.data, function() {});
		}
	}

})()
