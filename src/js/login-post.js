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
  const keyValues = [];
  for (const [key, value] of Object.entries(obj)) {
    keyValues.push(`${key}=${value}`);
  }
  return keyValues.join('&');
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
          const msg = JSON.stringify({
            status: request.status,
            readyState: request.readyState,
          });
          resolve({
            type: false,
            msg: `连接异常，请检查网络连接情况（${msg}）`,
          });
        }, 3000);
        return;
      }

      if (request.readyState !== 4) {
        return;
      }

      const response = request.responseText;
      const msga = /msga='(.*)'/.exec(response);
      let msg = msga && msga[1];

      const isSucceedResult = response.includes('认证成功页') || response.includes('登录成功窗');
      const isInfoResult = response.includes('信息页') || response.includes('信息返回窗');

      if (isSucceedResult) {
        resolve({
          type: true,
          msg: '登录成功😊',
        });
        return;
      }

      if (isInfoResult && !msg) {
        // nth的登录成功没有msg
        resolve({
          type: true,
          msg: '登录成功😊',
        });
        return;
      }

      // 错误情况简单翻译
      if (msg === 'ldap auth error') {
        msg = `账号或密码错误（${msg}）`;
      }
      if (msg === 'error hid') {
        msg = `登录行为异常，请过几分钟后再试（${msg}）`;
      }
      // 返回失败结果
      resolve({
        type: false,
        msg: `😥登录失败${msg ? '：' + msg : ''}`,
      });
    };
  });
  // 发送请求
  request.send(postBody);

  return result;
}

// 宿舍区宽带升级后的登录
export function newLogin() {
  // 创建 XMLHttpRequest 对象
  const request = new XMLHttpRequest();

  // 学号、密码
  const cid = localStorage.getItem('cid');
  const password = localStorage.getItem('password');

  // 构造url
  const query = serialize({
    callback: 'dr1003',
    login_method: 1,
    user_account: `%2C0%2C${cid}`,
    user_password: password,
    wlan_user_ip: '',
    wlan_user_ipv6: '',
    wlan_user_mac: '000000000000',
    wlan_ac_ip: '',
    wlan_ac_name: '',
    jsVersion: '4.1.3',
    terminal_type: 1,
    lang: 'zh-cn',
    v: 10353,
    lang: 'zh',
  });
  const url = `http://172.30.255.42:801/eportal/portal/login?${query}`;
  request.open('GET', url, true);

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
        /**
         * 新版协议的返回格式:
         * dr1003({\"result\":1,\"msg\":\"Portal协议认证成功！\"});
         * dr1003({\"result\":0,\"msg\":\"账号不存在\",\"ret_code\":1});
         * dr1003({\"result\":0,\"msg\":\"IP: 172.30.237.57 已经在线！\",\"ret_code\":2});
         * 该请求为jsonp请求，这里dr1003来自于GET请求中的callback参数
         */

        // 切除前面的"dr1003("一共7个字符
        // 以及后面的");"两个字符，得到完整JSON字符串
        const responseText = request.responseText.substring(7, request.responseText.length - 2);

        // 尝试解析JSON
        let responseJson = {};
        try {
          responseJson = JSON.parse(responseText);
        } catch (e) {
          console.error(e);
          resolve({
            type: false,
            msg: `😥登录失败：${request.responseText}`
          });
        }

        // 成功
        const isSucceedResult = (responseJson.result === 1);
        if (isSucceedResult) {
          resolve({
            type: true,
            msg: '登录成功😊'
          });
        }

        // "IP已经在线"算作登录成功
        const isAlreadyOnline = (responseJson.ret_code === 2);
        if (isAlreadyOnline) {
          resolve({
            type: true,
            msg: `登录成功😊：${responseJson.msg}` // 顺便显示一下登录的IP
          });
        }

        // 失败
        let msg = responseJson.msg;
        // 错误情况简单翻译
        if (msg === 'ldap auth error') msg = `账号或密码错误（${msg}）`;
        if (msg === 'error hid') msg = `登录行为异常，请过几分钟后再试（${msg}）`;
        resolve({
          type: false,
          msg: `😥登录失败：${msg}`
        });
      }
    };
  });
  // 发送请求
  request.send();

  return result;
}
