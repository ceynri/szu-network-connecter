<div align="center">
  <img src="https://i.loli.net/2020/09/19/W5ojBY1p8MmOG7X.png" alt=""/>
  <h1>一键登录深大校园网络 - Chrome 插件</h1>
</div>

针对深圳大学校园网有线连接与 WIFI 连接复杂的登录方式，给出一键快速登录解决方案的浏览器扩展插件。

## 基本特性

- 一键登录校园网络，无需安装糟糕的 Drcom 或打开难记的登录网页
- 无需选择 WIFI 连接模式/有线连接模式
- 自动记忆用户卡号信息，本地缓存，无需反复填写
- 简洁的 UI 界面（和没什么必要的动效）

<br>

## 登录原理

- 有线连接对应的登录网页网址为 `http://172.30.255.2/0.htm`
- WIFI 连接对应的登录网页网址为 `https://drcom.szu.edu.cn/a70.htm`
- 网页的登录行为即发送带有卡号密码的 post 请求
- 插件只需帮忙记忆用户的卡号与密码（使用 `localStorage`），模拟请求并处理返回结果即可

<br>

## 安装方式

### Chrome 浏览器

两种途径：

1. 直接通过 [Chrome 商店](https://chrome.google.com/webstore/detail/深大校园网络登录/mmeaolnimopgipjfbgobdlgkojojonop/)进行安装
2. 通过 [Releases](https://github.com/ceynri/szu-network-connecter/releases) 下载对应的 **crx** 文件
  - 然后打开 Chrome 浏览器的扩展程序界面
  - 将 crx 文件拖入浏览器窗口即可

> 以 Chromium 内核的其他浏览器（如 Edge Beta、360极速浏览器等）应该也可以通过 crx 的方式进行安装。

### Firefox 浏览器

两种方式：

1. 直接通过 [Firefox ADD-ONS 商店](https://addons.mozilla.org/zh-CN/firefox/addon/深大校园网络登录/)获取安装
2. [Releases](https://github.com/ceynri/szu-network-connecter/releases) 选择 xpi 后缀的 Firefox 插件进行下载
   - 在 Firefox 浏览器 Ctrl+Shift+A 打开附加组件管理器
   - 将下载的 xpi 文件拖入浏览器即可

<br>

## 插件图例

![login.jpg](https://i.loli.net/2020/09/14/vFq1Qu7Dn8UCVrb.jpg)

![input.jpg](https://i.loli.net/2020/09/14/CTSyHFpQDWXd72U.jpg)

![logined.jpg](https://i.loli.net/2020/09/14/KBgxod5qu3WlJfN.jpg)

![error.jpg](https://i.loli.net/2020/09/14/RuWUZjokFNHPt2Y.jpg)

<br>

## 预期特性

> 大概率是会鸽了，只有影响到我使用的问题我才会后续跟进修复或添加新特性，有意者欢迎直接 PR

- 目前仅测试有线连接/宿舍区 WIFI 连接模式，对办公区的 WIFI 模式未进行状态判断与具体测试，无法保证是否可以连接，如有需要后续进行完善
- 增加自动登录选项，点击插件图标后自动登录，无需再点击登录按钮
- input 输入框增加 <kbd>Enter</kbd> 键监听
- 登录成功后延时几秒自动关闭弹窗

<br>

## 许可协议

[MIT](./LICENSE)

<br>

## 其他

> [后记](./record.md)
>
> [隐私权政策](./privacy-policy.md)（为了上架 Chrome 商店而随便起了一份）

<br>
