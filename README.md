# mini-pro-template

## 环境要求
1. Node9+
2. Visual Studio Code
3. Git
4. 微信开发者工具       建议下载稳定版本
5. 支付宝开发者工具    建议下载稳定版本



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
小程序首次编译成功：需要手动打开开发者工具导入项目（dist/dev/对应的小程序）

微信小程序
yarn weixin

支付宝小程序
yarn alipay

移动端h5
yarn h5
```

### Compiles and minifies for test
```
微信小程序
yarn build:mp-weixin-test

支付宝小程序
yarn build:mp-alipay-test

移动端h5
yarn build:h5-test
```


### Compiles and minifies for production
```
微信小程序
yarn build:mp-weixin

支付宝小程序
yarn build:mp-alipay

移动端h5
yarn build:h5
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
