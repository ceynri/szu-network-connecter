<div align="center">
  <img src="https://i.loli.net/2020/09/19/W5ojBY1p8MmOG7X.png" alt=""/>
  <h1>一键登录深大校园网络 - Chrome 插件</h1>
</div>

针对深圳大学校园网有线连接与 WIFI 连接复杂的登录方式，给出一键快速登录解决方案的 Chrome 扩展插件。

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

## 使用方式

目前已将插件提交至 Chrome 商店进行审核，完成后会发布 crx 文件以及 Chrome 商店插件地址。

以下是借助开发者模式的方式体验该插件，执行步骤：

- 下载本项目代码（[Releases 下载](https://github.com/ceynri/szu-network-connecter/releases)），保存到随便你想保存的位置（之后不要移动）
- 打开 Chrome 浏览器，在地址栏输入 `chrome://extensions` 并访问
- 打开右上角的`开发者模式`
- 选择`加载已解压的扩展程序`
  - 如果是 clone 本项目：选中本项目下的`szu-network-connecter`文件夹
  - 如果是 Releases：解压，选中解压后的文件夹
- 插件已被添加到 Chrome 浏览器中，在右上角插件栏区域中点击本插件即可运行

![使用步骤图例.jpg](https://i.loli.net/2020/09/14/gGxFHdu8oZjPDKa.jpg)

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

## 其他

> [后记](./record.md)

<br>
