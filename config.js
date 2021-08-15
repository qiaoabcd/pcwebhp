module.exports = {
	dataName: 'test.txt', 					// 数据文件名
	threadNum: 10, 									// 线程数量,
	filterStatusCode: [404,500], 		// 需要过滤的状态码
	
	fullPage: false, 								// 截取整屏页面(有滚动条那种网页)
	browserInterface: false, 				// 是否启用浏览器界面
	screenshotDelay: 500, 					// 延迟多少毫秒秒截图，有些网页渲染的慢

	// 以下配置不建议修改
	// 图片在保存时以地址为文件名保存,但是文件名不能包含斜挎引号,不然会出错(不要使用 /\:*?"<>| 尽量使用英文字母)
	slashReplace: '@', 							// 斜杠替换字符
	mhReplace: '#', 								// 冒号替换字符 
	ignoreHTTPSErrors: true, 				// 是否忽略https错误，不安全的证书网页需要开启这个才能截图到
	openPageTimeout: 0, 						// 打开网页超时时间(单位毫秒) 0为一直等待到网页响应完成，建议是0，不然会漏掉一些响应时间久的网站
	// browserWidth: 300,						// 浏览器宽度
	// browserHeight: 600,   				// 浏览器高度
}
