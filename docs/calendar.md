# 日历


```js
var calendar = new Calendar({
  start: '2019/05/10',//开始日期（必传）
  end: '2020/5/20',//结束日期（必传）
  specialDates: [{
    date: '2019/05/23',//标记的日期
    text: '放假',//标记的文字
  }, {
    date: '2020/01/01',
    text: '元旦'
  }],
  itemClick: function(item) {
    console.log(item.year+'-'+item.month+'-'+item.date)
  }
})
```
### 配置项
#### start
* 类型 String
* 默认值：无
* 作用：开始日期  
* 格式为'年/月/日'
* 是否必传：是
### end
* 类型 String
* 默认值：无
* 作用：结束日期  
* 格式为'年/月/日'
* 是否必传：是

### specialDates
* 类型 Array
* 默认值：无
* 作用：标记日期
* 是否必传：否

### itemClick
* 类型 Function
* 默认值：无
* 当某一个日期被点击时触发

### 方法
#### 显示日历
```js
calendar.show()
```
