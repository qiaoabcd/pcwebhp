使用方法：
1、安装Node.js v12.20.0或更高版本
	Node.js v12.20.0下载地址http://mirrors.nju.edu.cn/nodejs/v12.20.0/node-v12.20.0-x64.msi
	window7系统安装不了太高版本的nodejs，所以window7用户建议安装v12.20.0
	
2、在cmd到脚本根目录下执行npm install
	 嫌npm 安装慢的自行百度淘宝配置淘宝镜像或者
	 
	 没有出现下载Chromium浏览器的再执行一次npm install
	 Downloading Chromium r901912 - 172.2 Mb [====================] 99% 0.0s
	 
3、config.js 文件为配置文件，配置好dataName数据文件路径后
	 cmd到脚本根目录执行node main
	 
4、在运行脚本的时候发现过长时间不动直接回车一下即可（用鼠标点击cmd窗口可能会发生这种情况）

5、数据文件的格式为txt，一个地址为一行

6、结果在output(输出文件夹)，以目标文件名加开始执行的时间为文件夹名
	保存的截图以网页地址命名，但是 : / 是不能作为文件名的，所以默认分别用 # @ 替换了