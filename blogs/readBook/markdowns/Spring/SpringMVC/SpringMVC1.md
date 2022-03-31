## 常用注解

### @RequestMapping

用来将Web请求与方法或者类关联起来形成映射.

在注解源代码中有如下一行代码:
```java
@Target({ElementType.TYPE, ElementType.METHOD})
```

这表示这个注解能够使用在类上面也可以使用在方法上面.

#### value(path)属性

value属性是path属性的一个别名, 并且value与path属性都是字符串数组类型, 也就是它可以接受多个值.
而这个值代表的是Web请求路径.

+ 并且这些请求路径与请求类型无关, 也就是说无论哪个请求类型的请求都会触发相同的响应.
+ \* 与 \** 在与`\`相邻时, 可以作为通配符代表一层或多层路径.
+ ? 可以作为通配符代表除了`\`之外的字符
+ `{placeholder}` 可以作为一个占位符, 效果类似于`*`, 其中的实际请求的`placeholder`能够作为变量获取到.


##### 举个例子1

```java
@ResponseBody
@RequestMapping(
        value = {
                "/test1",
                "/test2",
                "/test3/*",
                "/test4/**"
        }
)
public String test1() {
  return "test1";
}
```

+ get请求

分别进行如下get请求

```shell
curl -v localhost:8080/demo1/test1
curl -v localhost:8080/demo1/test2
curl -v localhost:8080/demo1/test3
curl -v localhost:8080/demo1/test3/aaa
curl -v localhost:8080/demo1/test3/bbb
curl -v localhost:8080/demo1/test3/aaa/bbb
curl -v localhost:8080/demo1/test4
curl -v localhost:8080/demo1/test4/aaa
curl -v localhost:8080/demo1/test4/bbb
curl -v localhost:8080/demo1/test4/aaa/bbb
curl -v localhost:8080/demo1/test4/aaa/ccc/ddd
```

得到的回应如下(为了简洁, 只写出响应码和响应体的内容)

```
200 test1
200 test1
404
200 test1
200 test1
404
200 test1
200 test1
200 test1
200 test1
200 test1
```

+ post 请求

在POST请求下对GET请求中的所有链接请求一次得到的回应如下

```
200 test1
200 test1
404
200 test1
200 test1
404
200 test1
200 test1
200 test1
200 test1
200 test1
```

+ 其他请求

在其他类型请求的回应也与如上两个一样

##### 举个例子2

有如下代码:

```java
@ResponseBody
@RequestMapping("/hello/{name}")
public String hello(@PathVariable("name") String param) {
  return "Hello, " + param + "!";
}
```

Web请求映射可以等效于`/hello/*`

`{name}` 作为一个占位符, 可以通过形参列表上加上 `@PathVariable` 注释来获取. 其中 `@PathVariable` 注释中的 `value` 属性代表占位符, 也就是`{}`括号中的字符串, 这里的话是`name`.

对于如下两个请求:

```shell
curl -X GET localhost:8080/demo1/hello/SmileYik
curl -X GET localhost:8080/demo1/hello/everyone
```

会有如下响应:

```
200 Hello, SmileYik!
200 Hello, everyone!
```

#### method属性

method是RequestMethod类型的数组, 他的值可以是`GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE, TRACE`.  
method属性为空时, 代表接受所有类型的请求, 并对所有类型的请求进行响应.  
当method属性值不为空时, 只要发生的请求类型在method中, 就会进行响应, 不再的话就不会进行响应.

有如下一段代码:
```java
@ResponseBody
@RequestMapping(
        value = {"/test1",},
        method = {
                RequestMethod.GET,
                RequestMethod.DELETE
        }
)
public String test1() {
  return "test1";
}
```

对其进行如下请求:

```shell
curl -X GET localhost:8080/demo1/test1
curl -X POST localhost:8080/demo1/test1
curl -X DELETE localhost:8080/demo1/test1
curl -X PUT localhost:8080/demo1/test1
```

就会有如下响应:

```
200 test1
405
200 test1
405
```

#### params属性

这个属性是一个字符串数组, 他代表着请求这个参数时候需要有的查询参数也可以是POST请求等的请求体中的参数(form表单).

查询参数也就是一个url中"?"号后面的那一串文本.就比如说`https://blog.smileyik.tk/?tool=markdown`, "?"号后的`tool=markdown`就是一个查询参数, 参数名为`tool`, 参数值为`markdown`

在params属性中包括的字符串可以是如下:

+ "abc": 代表需要一个名为`abc`的参数才能触发响应
+ "!abc": 代表参数中不能存在一个名为`abc`的参数
+ "abc=123": 代表参数中必须出现一个名为`abc`的参数, 并且这个参数值必须为`123`
+ 'abc!=123': 代表参数中必须出现一个名为`abc`的参数, 并且这个参数值不能为123

例子:

```java
@ResponseBody
@RequestMapping(
        path = "/oh",
        params = {
                "action"
        }
)
public String oh() {
  return "oh!!!";
}
```

```shell
curl -G localhost:8080/demo1/oh
curl -G -d abc localhost:8080/demo1/oh
curl -G -d action localhost:8080/demo1/oh
curl -G -d action=kungfu localhost:8080/demo1/oh
curl -X POST localhost:8080/demo1/oh -d action=kungfu
```

可以得到如下的结果:curl -X POST localhost:8080/demo1/oh -d action=kungfu

```
400
400
oh!!!
oh!!!
oh!!!
```

例子2:

```java
@ResponseBody
@RequestMapping(
        path = "/oh",
        params = {
                "action=kungfu"
        }
)
public String oh() {
  return "oh!!!";
}
```

与上面例子1同样请求并且响应如下:

```
400
400
400
oh!!!
oh!!!
```

第三个之所以是`Bad Request`, 是因为`action`的值不为`kungfu`.

例子3:

```java
@ResponseBody
@RequestMapping(
        path = "/oh",
        params = {
                "action!=oh",
                "action=oh"
        }
)
public String oh() {
  return "oh!!!";
}
```

请求:

```shell
curl -G -d action=notoh localhost:8080/demo1/oh
curl -G -d action=oh localhost:8080/demo1/oh
```

响应:

```
400
400
```

代码中params中要求了两个参数, 一个是要求`action`的值为`oh`, 一个要求`action`的值不为`oh`, 而我们给的两个请求中一个请求为`action`的值为`notoh`, 不满足第一个要求的参数条件所以不给响应, 而第二个请求中`action`的值为`oh`, 不满足第二个要求的参数条件, 所以不给响应.

由此可见params属性值中的所有要求**全部满足**时, 才会给予响应.
