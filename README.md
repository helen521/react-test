豆瓣电影列表学习

# 技术栈
* React+React Router@3.x+fetch
* shiguoqing.com:3009

# Promise/A+规范介绍
## 作用
* 解决异步回调的深层嵌套问题
* 本质其实就是一种书写格式的改变

## 理解
* promise/a+只是一个规范，那么在不同的平台上有不同的实现
* angular:$q服务
* node:q,then,co模块
* ES6:Promise对象
* 还有就是es7中的async await 是要替代掉Promise的


## 内容
* 不管你做什么操作每次返回的都是Promise对象
  + 为了实现链式编程
  + 上一个then里面的输出是下一个then里面你的输入
* Promise对象是有状态的
  + 未完成状态（默认）
  * 已完成状态
    - 当数据请求成功的时候调用resolve方法将状态从未完成改为已完成
  * 失败状态
    - 当数据请求失败的时候调用reject方法将状态从未完成改为失败
* Promise对象的使用必须通过then方法调用
  + then方法里面的函数只有在状态改变的时候才会被触发
  + 此时如果Promise对象的状态是已完成状态，就走成功的回调函数
  + 此时如果Promise对象的状态是失败状态，就走失败的回调函数
  

  