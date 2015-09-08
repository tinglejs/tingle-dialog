# tingle-dialog [![npm version](https://badge.fury.io/js/tingle-dialog.svg)](http://badge.fury.io/js/tingle-dialog)


## TL;DR


效果图:

![效果图](http://gtms02.alicdn.com/tps/i2/TB1u7edIVXXXXaAXXXXHStn1XXX-396-555.png)


## Simple Usage
```
Dialog.alert({
	title: '测试',
	children: '我是测试我是测试我是测试我是测试我是测试',
	onConfirm() {
    	console.log('alert confirm');
	}
});

Dialog.confirm({
	title: '测试',
	children: '我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是',
	onConfirm() {
	    console.log('confirm confirm');
	},
	onCancel() {
	    console.log('confirm cancel');
	}
});
```

## 可用配置

| 配置项 | 类型 | 必填 | 默认值 | 功能/备注 |
|---|---|----|---|----|
|show| boolean | required|false|是否显示对话框|
|title| string | required|-|对话框的标题|
|children| string |optional|-|对话框的内容|
|mask| boolean | optional |true|是否显示遮罩层|
|buttons| array | optional |一个确定按钮|一个数组，可以配置多个对话框上的按钮，具体的配置参考按钮的配置|

### 按钮的配置
| 配置项 | 类型 | 必填 | 默认值 | 功能/备注 |
|---|---|----|---|----|
|children| string | required |-|按钮的内容|
|callback| function |optional |-|点击按钮的回调, 返回false就不会自动关闭对话框|
|primary| boolean | optional |false|是否作为主按钮|
## API接口

### Dialog.alert(options)

静态方法，显示全局的 Dialog，可用参数请参考可用配置，其中回调函数是onConfirm。

### Dialog.confirm()

静态方法，显示全局的 Dialog，可用参数请参考可用配置，其中回调函数是onConfirm和onCancel。

### Dialog.hide()

静态方法，关闭全局的Dialog

###show
实例方法，显示一个对话框

###hide

实例方法，关闭一个对话框

## Links 相关链接

- [Fire a bug/Issues 提Bug](http://github.com/tinglejs/tingle-dialog/issues)
