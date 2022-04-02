**@PathVariable** 的作用是将请求路径上的占位符对应的值绑定到方法形参上.

它有三个属性, 分别是`value`, `name`以及`required`. 其中`value`是`name`的别名.

+ `name`属性用来绑定请求路径变量, 也就是请求路径中用`{}`花括号包围着的占位符. 当未赋值时默认为空串.

## 例子:

有如下实体类:

```java
public static class Sentence {
  private Integer id;
  private String sentence;
  private List<String> alias;

  public Sentence() {

  }

  public Sentence(Integer id, String sentence, List<String> alias) {
    this.id = id;
    this.sentence = sentence;
    this.alias = alias;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getSentence() {
    return sentence;
  }

  public void setSentence(String sentence) {
    this.sentence = sentence;
  }

  public List<String> getAlias() {
    return alias;
  }

  public void setAlias(List<String> alias) {
    this.alias = alias;
  }
}
```

初始化:

```java
private static final Map<Integer, Sentence> SENTENCE_MAP;

static {
  SENTENCE_MAP = new HashMap<>();
  SENTENCE_MAP.put(1, new Sentence(1, "早安各位", Arrays.asList("大家早安", "大家早上好")));
  SENTENCE_MAP.put(2, new Sentence(2, "我关上了门", Arrays.asList("门被我关上了", "我把门关上了")));
}
```

### 例子1

通过id值来获取某一个实体类对象. 初步认定当`value`(`name`)属性值为空时, 将会把变量值赋值给与占位符名字相同的形参

```java
@GetMapping("/demo3/sentence/{id}")
public Sentence getSentence(@PathVariable int id) {
  return SENTENCE_MAP.get(id);
}
```

对`/demo3/sentence/1`链接进行GET请求(这里的结果是格式化后产生的结果):

```json
{
    "id": 1,
    "sentence": "早安各位",
    "alias": [
        "大家早安",
        "大家早上好"
    ]
}
```

### 例子2

一个简单的整数相加功能, 提供a, b两个参数返回相加后的值, 通过结果可知道当`value`(`name`)属性值为空时, 将会把变量值赋值给与占位符名字相同的形参

```java
@GetMapping("/demo3/calculate/{b}/{a}")
public String calculate(@PathVariable int a, @PathVariable int b) {
  return String.format("%d + %d = %d", a, b, a + b);
}
```

当请求 `/demo3/calculate/1/2`时, 返回的结果为

```
2 + 1 = 3
```

### 例子3

这个是例子2的一个修改后的版本, 目的也是接受2个整数a, b并返回相加后的值, 唯一区别就是使用**@PathVariable**注解时, 指定了`value`属性的值. 让占位符`{b}`的值赋值给形参`a`, 占位符`{a}`的值赋值给形参`b`.

```java
@GetMapping("/demo3/calculate2/{b}/{a}")
public String calculate2(@PathVariable("b") int a,
                         @PathVariable("a") int b) {
  return String.format("%d + %d = %d", a, b, a + b);
}
```

当请求 `/demo3/calculate2/1/2`时, 返回的结果为

```
1 + 2 = 3
```

当指定了`value`(`name`)值时, 会优先把设定的值的路径变量赋值给相应的形参, 而不会去匹配形参参数名.

### 例子4

+ 当形参类型为Map<String, String> 时, 会传入所有的路径变量与其值到该map形参中.

```java
@GetMapping("/demo3/addString/{pen}/{apple}")
public String addString(@PathVariable Map<String, String> map) {
  String pen = map.get("pen");
  String apple = map.get("apple");
  return String.format("I have a %s, I have a %s, %s~", pen, apple, pen + apple);
}
```

当请求`/demo3/addString/pen/apple`时会得到如下响应

```
I have a pen, I have a apple, penapple~
```
