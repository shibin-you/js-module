# 底部弹出菜单

```js
var actionButton = new ActionButton({
  tapHidden: true,
  items: [{
    img: './img/wx.png',
    text: '微信'
  }, {
    img: './img/wx_circle.png',
    text: '朋友圈'
  }, {
    img: './img/wx_circle.png',
    text: '朋友圈'
  }, {
    img: './img/wx_circle.png',
    text: '朋友圈'
  }, {
    img: './img/wx_circle.png',
    text: '朋友圈'
  }, {
    img: './img/wx_circle.png',
    text: '朋友圈'
  }]
}),
itemClick: function(item) {
  console.log(item.index)//被点击按钮的索引值
}
```
### 配置项
#### tapHidden
* 类型：Boolean
* 默认值：false
* 作用：点击阴影是否自动隐藏弹出菜单
* 是否必传：否
#### items
* 类型：Array
* 默认值：[]
* 作用：弹出菜单的内容
* 是否必传：否
#### itemClick
* 类型：Function
* 默认值：无
* 作用：点击菜单的内容时会触发该函数
* 是否必传：否
### 方法

#### 显示弹出菜单
```js
actionButton.show()
```
