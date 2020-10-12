'use strict';

/**
 * 为了让display none兼容transition opacity渐变的函数
 */
const show = (
  elem,
  {
    delay = 0,
    opacity = 1,
  } = {}
) => {
  if (!elem) {
    return false;
  }
  elem.classList.remove('none');
  setTimeout(() => {
    elem.style.opacity = opacity;
  }, delay);
  return true;
};

/**
 * 为了让display none兼容transition opacity渐变的函数
 */
const hide = (
  elem,
  {
    duration = 300,
    delay = 0,
  } = {}
) => {
  if (!elem || elem.classList.contains('none')) {
    return false;
  }
  setTimeout(() => {
    // TODO: 渐变时长放在js里控制更优雅
    elem.style.opacity = 0;
    setTimeout(() => {
      elem.classList.add('none');
    }, duration);
  }, delay);
  return true;
};

const securityText = '*账号信息仅保存于本地，以保证隐私安全';

// 一些用到的DOM元素

const stage2 = document.querySelector('.stage-2');
const tips = stage2.querySelector('.tips');

const cidInput = stage2.querySelector('.card-id');
const pwInput = stage2.querySelector('.password');

const saveButton = stage2.querySelector('.save-button');
const savedButton = stage2.querySelector('.saved-button');
const loginButton = stage2.querySelector('.login-button');
const loadingButton = stage2.querySelector('.loading-button');
const loginedButton = stage2.querySelector('.logined-button');
const retryButton = stage2.querySelector('.retry-button');
const errorButton = stage2.querySelector('.error-button');

const buttons = [saveButton, savedButton, loginButton, loadingButton, loginedButton, retryButton, errorButton];

// 卡号密码
let cardId = localStorage.getItem('cid');
let password = localStorage.getItem('password');

// if (true) {
if (!cardId && !password) {
  // 第一次使用插件，需要展示登录引导页
  const stage1 = document.querySelector('.stage-1');
  const nextButton = stage1.querySelector('.next-button');
  const fillButton = stage1.querySelector('.fill-button');

  show(stage1);

  fillButton.addEventListener('click', () => {
    // next-button动画
    nextButton.style.width = '800px';
    nextButton.style.height = '800px';
    // 隐藏stage1，显示stage2
    hide(stage1, { duration: 500, delay: 500 });
    show(stage2, { delay: 500 });
    show(tips, { delay: 800 });
    show(saveButton);
    tips.innerText = securityText;
  });
} else {
  show(stage2)
  show(tips, { delay: 300 });
  show(loginButton);
  cidInput.value = cardId;
  pwInput.value = password;
}

/**
 * 检查到用户输入非法时，给input添加warning类
 */
const warn = (elem, duration = 1000) => {
  if (!elem) return;
  elem.classList.add('warning');
  setTimeout(() => {
    elem.classList.remove('warning');
  }, duration);
};

// 点击保存按钮
saveButton.addEventListener('click', () => {
  // 获取用户输入的卡号密码
  cardId = cidInput.value;
  password = pwInput.value;
  // 检查输入是否合法
  let valid = true;
  if (cardId.length === 0 || /[a-z]/.test(cardId)) {
    warn(cidInput);
    valid = false;
  }
  if (password.length === 0) {
    warn(pwInput);
    valid = false;
  }
  if (!valid) {
    show(errorButton);
    return;
  }
  // 保存至localStroage
  localStorage.setItem('cid', cardId);
  localStorage.setItem('password', password);
  // 切换按钮状态
  hide(saveButton, { delay: 300 });
  tips.innerText = '';
  show(savedButton);
  // 展示登录按钮
  hide(savedButton, { delay: 1300 });
  show(loginButton, { delay: 1000 });
});

// 用户更改input内容时，允许用户进行保存
[cidInput, pwInput].forEach(elem => {
  elem.addEventListener('keydown', () => {
    show(saveButton);
    tips.innerText = securityText;
    buttons.forEach(button => {
      if (button !== saveButton) {
        hide(button, { delay: 300 });
      }
    });
  });
});

let hadGotCallback = false;

/**
 * 接受请求的返回信息，进行相关输出
 */
const connectedCallback = (isSuccess, msg) => {
  // 不论是连接wifi还是网线，期望的连接模式应该会更先回调，而另外一种模式会超时后才触发回调，会慢一点
  if (isSuccess) {
    hide(loadingButton, { delay: 300 });
    show(loginedButton);
    if (msg) tips.innerText = msg;
    hadGotCallback = true;
  } else if (msg) {
    show(errorButton);
    hide(errorButton, { delay: 2300 });
    show(retryButton, { delay: 2000 });
    tips.innerText = msg;
    hadGotCallback = true;
  }
};

// 点击登录/重试按钮
[loginButton, retryButton].forEach(button => {
  // 发起登录请求
  button.addEventListener('click', () => {
    // 变为loading状态
    hide(button, { delay: 300 });
    show(loadingButton);
    // 发送登录请求
    connectTo('nth', connectedCallback);
    connectTo('wifi', connectedCallback);
    setTimeout(() => {
      if (!hadGotCallback) {
        hide(loadingButton, { delay: 300 });
        show(retryButton);
      }
    }, 5000);
  });
})
