/**
 * Created by mac 
 */
let host = window.location.hostname;
let apiUrl = "http://127.0.0.1:30651/api/"
let socketUrl = "http://127.0.0.1:30651"



const formatDate = (timeStamp, type = 'Y-M-D', auto = false) => {
    let time = (timeStamp + '').length === 10 ? new Date(parseInt(timeStamp) * 1000) : new Date(parseInt(timeStamp));
    let _year = time.getFullYear();
    let _month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
    let _date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    let _hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    let _minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    let _secconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    let formatTime = '';
    let distinctTime = new Date().getTime() - time.getTime();

    if (auto) {
        if (distinctTime <= (1 * 60 * 1000)) {
            // console.log('一分钟以内，以秒数计算');
            let _s = Math.floor((distinctTime / 1000) % 60);
            formatTime = _s + '秒前';
        } else if (distinctTime <= (1 * 3600 * 1000)) {
            // console.log('一小时以内,以分钟计算');
            let _m = Math.floor((distinctTime / (60 * 1000)) % 60);
            formatTime = _m + '分钟前';
        } else if (distinctTime <= (24 * 3600 * 1000)) {
            // console.log('一天以内，以小时计算');
            let _h = Math.floor((distinctTime / (60 * 60 * 1000)) % 24);
            formatTime = _h + '小时前';
        } else if (distinctTime <= (30 * 24 * 3600 * 1000)) {
            let _d = Math.floor((distinctTime / (24 * 60 * 60 * 1000)) % 30);
            formatTime = _d + '天前';
            // console.log('30天以内,以天数计算');
        } else {
            // 30天以外只显示年月日
            formatTime = _year + '-' + _month + '-' + _date;
        }
    } else {
        switch (type) {
            case 'Y-M-D H:I:S':
                formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes + ':' + _secconds;
                break;
            case 'Y-M-D H:I:S zh':
                formatTime = _year + '年' + _month + '月' + _date + '日  ' + _hours + ':' + _minutes + ':' + _secconds;
                break;
            case 'Y-M-D H:I':
                formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes;
                break;
            case 'Y-M-D H':
                formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours;
                break;
            case 'Y-M-D':
                formatTime = _year + '-' + _month + '-' + _date;
                break;
            case 'Y-M-D zh':
                formatTime = _year + '年' + _month + '月' + _date + '日';
                break;
            case 'Y-M':
                formatTime = _year + '-' + _month;
                break;
            case 'M-D':
                formatTime = _month + '-' + _date;
                break;
            case 'Y':
                formatTime = _year;
                break;
            case 'M':
                formatTime = _month;
                break;
            case 'D':
                formatTime = _date;
                break;
            case 'H':
                formatTime = _hours;
                break;
            case 'I':
                formatTime = _minutes;
                break;
            case 'S':
                formatTime = _secconds;
                break;
            default:
                formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes + ':' + _secconds;
                break;
        }
    }
    // 返回格式化的日期字符串
    return formatTime;
}

const flatten = (ary) => {
	return ary.reduce((pre, cur) => {
		return pre.concat(Array.isArray(cur.children) ? flatten(cur.children) : {path: cur.path, name:cur.name, status: cur.status, id: cur.id});
	}, [])
}

const clearObj = (obj) => {
    const empty = {}
    for (const key in obj) {
        empty[key] = ''
    }
    Object.assign(obj, empty)
}

/**
 * 判断终端以及浏览器
 * userAgent string User-Agent信息
 */
const readUserAgent = ua => {
    let data = {
        terminal: '',
        browser: '',
        terminalType: {}
    }
    data.terminalType = {
        trident: ua.indexOf('Trident') > -1, // IE内核
        presto: ua.indexOf('Presto') > -1, // opera内核
        webKit: ua.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1, // 火狐内核
        mobile: !!ua.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1, // android终端
        iPhone: ua.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: ua.indexOf('iPad') > -1, // 是否iPad
        webApp: ua.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
        weixin: ua.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
        qq: ua.match(/\sQQ/i) === ' qq' // 是否QQ
    }
    if (
        data.terminalType.ios ||
        data.terminalType.iPhone ||
        data.terminalType.iPad
    ) {
        data.terminal = '苹果'
    } else if (data.terminalType.android) {
        data.terminal = '安卓'
    } else {
        data.terminal = 'PC'
    }
    if (/msie/i.test(ua) && !/opera/.test(ua)) {
        data.browser = 'IE'
    } else if (/firefox/i.test(ua)) {
        data.browser = 'Firefox'
    } else if (/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua)) {
        data.browser = 'Chrome'
    } else if (/opera/i.test(ua)) {
        data.browser = 'Opera'
    } else if (/iPad/i.test(ua)) {
        data.browser = 'iPad'
    } else if (
        /webkit/i.test(ua) &&
        !(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua))
    ) {
        data.browser = 'Safari'
    } else {
        data.browser = '未知'
    }
    return data
}

// 格式化文件大小 单位：B、KB、MB、GB
const renderSize = value => {
    if (null == value || value == '') {
        return "0 B"
    }
    var unitArr = new Array("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
    var index = 0
    var srcsize = parseFloat(value)
    index = Math.floor(Math.log(srcsize) / Math.log(1024))
    var size = srcsize / Math.pow(1024, index)
    size = size.toFixed(2)
    if (unitArr[index]) {
        return size + unitArr[index]
    }
    return '文件太大'
}

/**
 *
 * 获取参数
 * @param name
 * @returns {*}
 * @constructor
 */
const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

const chinaNum = (num) => {
    var china = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
    var arr = new Array();
    for (let i in num) {
        arr[i] = china[num[i]]
    }
    return arr.join("")
}

const formatNum = (num) => {
    num = parseInt(num)
    if (num > 9999) {
        num = num / 10000 + '万'
    }
    return num
}

const deepClone = (obj) => {
    var _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone;
}

const DegreeConvertBack = (value) => { ///<summary>度分秒转换成为度</summary>
    var du, fen, miao;
    var du = value.split("°")[0];
    var fen = value.split("°")[1].split("′")[0];
    var miao = value.split("°")[1].split("′")[1].split('″')[0];
    let r = (Math.abs(fen) / 60 + Math.abs(miao) / 3600) == 0 ? '.0' : (Math.abs(fen) / 60 + Math.abs(miao) / 3600)
    return Math.abs(du) + r;
}

const checkLatlng = (val, type = 'lat') => {
    val = val.replace('度', '°')
    val = val.replace(/分|`|'/, '′')
    val = val.replace(/秒|"/, '″')
    console.log(val)
    let reg;
    if (type == 'lat') {
        reg = /^((\d|[1-8]\d)[\D](\d|[0-5]\d)[\D](\d|[0-5]\d)(\.\d{1,2})?[\D]?$)|(90[\D]0[\D]0[\D]?$)/
    } else {
        reg = /^((\d|[1-9]\d|1[0-7]\d)[\D](\d|[0-5]\d)[\D](\d|[0-5]\d)(\.\d{1,2})?[\D]?$)|(180[\D]0[\D]0[\D]?$)/
    }
    if (reg.test(val)) {
        return DegreeConvertBack(val)
    } else {
        return false
    }
}

const sum = (arr) => {
    var s = 0;
    for (var i = arr.length - 1; i >= 0; i--) {
        s += arr[i];
    }
    return s;
}

const arrSortByKey = (array, key, order) => {
  return array.sort(function (a, b) {
    let value1 = a[property], value2 = b[property]
    if (desc) {  //升序
      return value1 - value2
    } else {                 //降序
      return value2 - value1
    }
  })
}

const sortObj = (obj) => {
    var arr = [];
            for (var i in obj) {
                arr.push([obj[i],i]);
            };
            arr.reverse();
            var len = arr.length;
            var obj = {};
            for (var i = 0; i < len; i++) {
                obj[arr[i][1]] = arr[i][0];
            }
            return obj;
}

export default {
    formatDate: formatDate,
    renderSize: renderSize,
    readUserAgent: readUserAgent,
    getQueryString: getQueryString,
    chinaNum: chinaNum,
    apiUrl: apiUrl,
    socketUrl: socketUrl,
    formatNum: formatNum,
    deepClone: deepClone,
    DegreeConvertBack: DegreeConvertBack,
    checkLatlng: checkLatlng,
    sum: sum,
    arrSortByKey,
    sortObj,
    flatten,
    clearObj
}
