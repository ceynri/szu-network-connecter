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

export function login(type) {
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
    // v6ip: '',
  });

  // 根据连接情况返回结果
  const result = new Promise((resolve, reject) => {
    request.onreadystatechange = () => {
      if (request.status !== 200) {
        setTimeout(() => {
          resolve({
            type: false,
            msg: '连接失败，请检查网络连接情况',
          })
        }, 3000);
      }
      if (
        request.readyState === 4 &&
        request.status === 200
      ) {
        const response = request.responseText
        const msga = /msga='(.*)'/.exec(response);
        let msg = msga && msga[1];

        const isInfoResult = response.includes('信息页') || response.includes('信息返回窗')
        const isSucceedResult = response.includes('认证成功页') || response.includes('登录成功窗')

        if (isSucceedResult) {
          resolve({
            type: true,
            msg: '登录成功😊'
          });
        }

        if (isInfoResult) {
          // nth的登录成功
          if (!msg) {
            resolve({
              type: true,
              msg: '登录成功😊'
            });
          }
          // 错误情况简单翻译
          if (msg === 'ldap auth error') {
            msg = `账号或密码错误（${msg}）`
          }
          if (msg === 'error hid') {
            msg = `登录行为异常，请过几分钟后再试（${msg}）`
          }
          // 返回失败结果
          resolve({
            type: false,
            msg: `😥登陆失败：${msg}`
          });
        }
      }
    };
  });
  
  // 发送请求
  request.send(postBody);

  return result;
}
