'use strict';

const urls = {
  wifi: 'https://drcom.szu.edu.cn/a70.htm', // SZU_WLAN
  nth: 'http://172.30.255.2/0.htm', // 校园网有线连接 || SZU_CTC&CMCC
}
const keys = {
  wifi: '123456',
  nth: '%B5%C7%A1%A1%C2%BC', // “登  录”的gbk转ascii编码
}

// 对象转键值对字符串
function serialize(obj) {
  const strArr = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      strArr.push(`${key}=${obj[key]}`);
    }
  }
  return strArr.join('&');
}

function connectTo(type, callback) {
  // 创建 XMLHttpRequest 对象
  const request = new XMLHttpRequest();
  request.open('POST', urls[type], true);

  // 设置请求头
  request.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded'
  );

  // 请求体
  const postBody = serialize({
    DDDDD: localStorage.getItem('cid'),
    upass: localStorage.getItem('password'),
    '0MKKey': keys[type],
    v6ip: '',
  });

  // 是否已连接
  let isConnected = false

  // 发送请求
  request.send(postBody);
  request.onreadystatechange = () => {
    if (isConnected) {
      return;
    }
    if (request.status !== 200) {
      console.error(request.status);
      callback(false, request.status);
    } else if (
      request.readyState === 4 &&
      request.status === 200
    ) {
      const response = request.responseText
      const msg = response.match(/msga='(.*)'/)
      if (response.includes('信息返回窗') && msg) {
        callback(false);
      } else if (
        (response.includes('信息返回窗') && !msg) ||
        response.includes('登录成功窗')
      ) {
        callback(true);
        isConnected = true;
      }
    }
  };
}
