# sage-tools

说点什么呢 = = 

完善我自己的项目常用工具库

## npm引用

```js
// 安装
npm i sage-tools --save
// 引入
const { isIdCard } = require('sage-tools')
//or
const Tools = require('sage-tools')
// 使用
isIdCard(123)
//or
Tools.isIdCard(123)

```

## script引用

```html
<!-- 引入 -->
<script src="./sage.min.js"></script>
<!-- 使用 -->
<script>
    #.isIdCard(123)
</script>
```

方法名 |  功能
--- | ---
 isIdCard |  判断是否是中国身份证号码
 isBankId |  判断是否是中国银行账户
 isChineseOnly |  判断是否是全中文
 isEmail |  验证电子邮箱的格式
RandomColor | 生成随机颜色
Base64 | Base64 编码
CRC32 | CRC32 编码
MD5| MD5 编码
SHA1| SHA1 编码
SHA256| SHA256 编码
SHA512| SHA512 编码
...env |
assign | 合并对象
trim | 消除字符串两边空格
filterTag | 过滤html代码(把<>转换)
changeCase | 转换字母大小写
qs | qs
flieList | 获取文件夹下文件列表
Event | 事件触发器