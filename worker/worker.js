// 工作线程1
const {
	Worker,
	parentPort,
	workerData 
} = require('worker_threads');

const fs = require('fs'); 
const config = require('../config.js'); 
const puppeteer = require('puppeteer');
const delayFn = require('../lib/delayFn.js');

(async () => {
	
	const dataArr = workerData.thisWorkerData;
	
	const browser = await puppeteer.launch({
		headless: !config.BrowserInterface, // 打开chromium浏览器   
		ignoreHTTPSErrors: config.ignoreHTTPSErrors, 
		args: [
			// 使页面权限限制在沙盒之内
			'--no-sandbox',
			'--disable-setuid-sandbox',
			// `--window-size=${config.browserWidth},${config.browserHeight}`
		]
	});
	const page = await browser.newPage();
	// 监听对话框
	page.on('dialog', async dialog => {
		await dialog.dismiss(); // 关闭alert
	});
	function recursion(i = 0) {
		if (!(i < dataArr.length)) return;
		let fileName = dataArr[i].replace(/[/]/g, config.slashReplace).replace(/[:]/g, config.mhReplace);
		(async () => {
			// console.log('当前目标', dataArr[i]);
			try {
				let openPageResult = await page.goto(dataArr[i], {
					timeout: config.openPageTimeout
				})

				// 过滤状态码
				for (let j = 0; j < config.filterStatusCode.length; j++) {
					if (config.filterStatusCode[j] == openPageResult.status()) {
						recall();
						return;
					}
				}
				// 延迟多少毫秒截图
				await delayFn(config.screenshotDelay);
				// 页面打开成功保存截图
				await page.screenshot({
					path: `${workerData.outputPath}/images/${fileName}.png`,
				});
				
				parentPort.postMessage({ // 向主线程发送截图成功消息
					type: 'succeedScreenshot',
					data: dataArr[i]
				})
				recall();

			} catch (err) {
				parentPort.postMessage({ // 向主线程发送截图失败消息
					type: 'failScreenshot',
					data: dataArr[i]
				})
				recall();
			}
		})()

		// 重新调用
		function recall() {
			// 给主线程发送消息
			if (i >= dataArr.length - 1) {
				// 完成
				parentPort.postMessage({ // 向主线程发送完成通知数据
					type: 'yes',
				})
				browser.close();
				return;
			}else{
				parentPort.postMessage({ // 向主线程发送进度加1通知数据
					type: 'progress'
				})
			}
			recursion(i = i + 1);
		}
	}
	
	recursion();

})();
