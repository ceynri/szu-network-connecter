'use strict';

/*
** TODO：此处需要填充用户个人信息
*/
const accountData = {
  id: '', // 填写你的卡号
  password: '', // 填写你的密码
}

const urls = {
  wifi: 'https://drcom.szu.edu.cn/a70.htm', // SZU_WLAN
  nth: 'http://172.30.255.2/0.htm', // 校园网有线连接 || SZU_CTC&CMCC
}
const keys = {
  wifi: '123456',
  nth: '%B5%C7%A1%A1%C2%BC', // “登  录”的gbk转ascii编码
}

// 是否已连接
let isConnected = false

// 控制台的 DOM 元素
const statusDom = document.querySelector('#status');

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

function connectTo(type) {
  // 创建 XMLHttpRequest 对象
  const request = new XMLHttpRequest();
  request.withCredentials = true;
  request.open('POST', urls[type], true);

  // 设置请求头
  request.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded'
  );

  // 请求体
  const postBody = serialize({
    DDDDD: accountData.id,
    upass: accountData.password,
    '0MKKey': keys[type],
    v6ip: '',
  });

  // 发送请求
  request.send(postBody);
  request.onreadystatechange = () => {
    if (isConnected) {
      return;
    }
    if (request.status !== 200) {
      statusDom.innerHTML += `返回码${request.status}`;
    } else if (
      request.readyState === 4 &&
      request.status === 200
    ) {
      statusDom.innerText = '自动登录成功(●ˇ∀ˇ●)';
      isConnected = true;
    }
  };

}

if (false) {
  statusDom.innerText = '正在连接中';
  connectTo('wifi');
  connectTo('nth');
}
