<div align="center">
  <img src="https://static.ceynri.cn/W5ojBY1p8MmOG7X.png" alt=""/>
  <h1>深大校园网络一键登录认证 - 浏览器插件</h1>
</div>

针对深圳大学校园网有线连接与 WIFI 连接复杂的登录认证方式，给出一键快速登录认证解决方案的浏览器扩展插件。支持 Chrome/Firefox 浏览器。

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
2. 通过 [Releases](https://github.com/ceynri/szu-network-connecter/releases) 下载对应的 **crx** 文件，然后打开 Chrome 浏览器的扩展程序界面，将 crx 文件拖入浏览器窗口即可

> 以 Chromium 内核的其他浏览器（如 Edge Beta、360极速浏览器等）应该也可以通过 crx 的方式进行安装。

### Firefox 浏览器

Firefox Addons 商店不允许上架受限受众的插件，故只好通过单独下载的形式安装：

- [Releases](https://github.com/ceynri/szu-network-connecter/releases) 选择 xpi 后缀的 Firefox 插件进行下载
- 在 Firefox 浏览器 Ctrl+Shift+A 打开附加组件管理器
- 将下载的 xpi 文件拖入浏览器即可

<br>

## 使用方式

1. 点击“去填写”，输入你的**卡号**（不是学号）和密码并点击保存按钮

    ![launch screen.png](https://static.ceynri.cn/cg26MhuBJmSakCQ.png)

    ![input.jpg](https://static.ceynri.cn/CTSyHFpQDWXd72U.jpg)

2. 保存成功后，点击登录即可

    ![login.jpg](https://static.ceynri.cn/vFq1Qu7Dn8UCVrb.jpg)

    ![logined.jpg](https://static.ceynri.cn/KBgxod5qu3WlJfN.jpg)

3. 如果出现报错或登录超时，请先检查个人信息、网络等设置是否有问题。如无法解决可以提 issue 并提供相关行为与环境信息

    ![error.jpg](https://static.ceynri.cn/RuWUZjokFNHPt2Y.jpg)

<br>

## 许可协议

[MIT](./LICENSE)

<br>

## 其他

> - [命令行 curl 版本（issues#1）](https://github.com/ceynri/szu-network-connecter/issues/1)
> - [后记](./record.md)
> - [隐私权政策](./privacy-policy.md)（为了上架 Chrome 商店而随便起了一份）

<br>
