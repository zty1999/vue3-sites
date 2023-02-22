
## 开发应用:

### 数据更新 视图不更新
**$set**
响应式对象新增/删除属性时,数据更新视图不更新:
Vue.$set( target, propertyName/index, value )

因为vue2 的响应式是使用 Object.defineProperty 劫持对象属性,所以对象新增属性时需要重新遍历对象,对其新增属性再次使用Object.defineProperty 进行劫持.  也就是 **Vue2.x 中给数组和对象新增属性**时，**需要使用$set才能保证新增的属性也是响应式的**, $set就是通过调用Object.defineProperty去处理响应式对象.



(对象属性的添加或删除)以下情况,vue2响应式失效
1、改变数组的长度时
2、改变数组中的属性时
3、通过索引值修改数组时
4、动态给对象添加属性时


**$nextTick**
$nextTick 接收一个回调函数,将回调延迟到下次 DOM 更新循环之后执行,即回调函数中的操作会在视图更新后完成