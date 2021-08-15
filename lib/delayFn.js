// 延迟执行函数
module.exports = function(time) {
	return new Promise((yes, no)=>{
		setTimeout(function(){
			yes()
		}, time)
	})
}