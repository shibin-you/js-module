# 日历


```js
var calendar = new Calendar({
  start: '2019/05/10',
  end: '2020/5/20',
  specialDates: [{
    date: '2019/05/23',
    text: '放假',
  }, {
    date: '2020/01/01',
    text: '元旦'
  }],
  itemClick: function(item) {
    console.log(item)
  }
})
```
显示日历
```js
calendar.show()
```
### 配置项
#### start
* 类型 String
* 默认值：无
* 作用：开始日期  
* end 结束日期
* 格式为'年/月/日'
