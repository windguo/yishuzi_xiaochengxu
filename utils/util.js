const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function checkIsLogin() {
	if (!wx.getStorageSync('storageLoginedUsernames')) {
		wx.redirectTo({
			url: '/pages/login/login'
		});
	}
}

function extract_chinese_length(txt) {
	var reg = /[\u4e00-\u9fa5]/g;
	var names = txt.match(reg);
	let t;
	if (names != null) {
		t = names.join("");
		return t.length;
	} else {
		return 0;
	}

}

function extract_chinese(txt) {
	var reg = /[\u4e00-\u9fa5]/g;
	var names = txt.match(reg);
	let t;
	if (names != null) {
		t = names.join("");
		return t;
	} else {
		return txt;
	}
};


module.exports = {
  formatTime: formatTime,
	checkIsLogin: checkIsLogin,
	extract_chinese: extract_chinese,
	extract_chinese_length: extract_chinese_length
}
