import { login, newLogin } from './login-post.js';
import { show, hide, warn } from './animation.js';

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

/**
 * 接受请求的返回信息，进行相关输出
 */
const showResult = (isSuccess, msg) => {
  if (isSuccess) {
    hide(loadingButton, { delay: 300 });
    show(loginedButton);
  } else {
    show(errorButton);
    hide(errorButton, { delay: 2300 });
    show(retryButton, { delay: 2000 });
  }
  if (msg) {
    tips.innerText = msg;
  }
};

// 点击登录/重试按钮
[loginButton, retryButton].forEach(button => {
  // 发起登录请求
  button.addEventListener('click', () => {
    // 变为loading状态
    hide(button, { delay: 300 });
    show(loadingButton);
    tips.innerText = '';

    // 超时处理
    const timeoutTimer = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('😥登录超时');
      }, 5000);
    });

    // 发送登录请求
    Promise.race([
      // login('nth'),
      login('wifi'),
      newLogin(),
      timeoutTimer,
    ])
      .then((res) => {
        // 期望的连接模式会更先返回结果，未连接的模式会延迟返回，故被淘汰
        showResult(res.type, res.msg);
      })
      .catch((e) => {
        console.warn(e);
        tips.innerText = e;
        hide(loadingButton, { delay: 300 });
        show(retryButton);
      })
  });
})
