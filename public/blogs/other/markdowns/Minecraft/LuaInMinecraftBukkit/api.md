> 最后更新于2022年05月21日 | [历史记录](https://github.com/SmileYik/MyBlog/commits/master/blogs/other/markdowns/Minecraft/LuaInMinecraftBukkit/api.md)

>此页面内容对应于LuaInMinecraftBukkit插件的最新版本(及以上版本)(**version: 1.6**), 历史文档可以插件此页面的历史记录

### LuaConfig

通过该接口, 能够在Lua脚本中对指定的类进行配置或操作.

```java
public interface LuaConfig {
  /**
   * 用默认运行模式加载一个脚本配置.
   * @param script 脚本.
   * @return 一个脚本配置.
   */
  static LuaConfig loadInsideLuaConfig(String script);

  /**
   * 用默认运行模式加载一个脚本配置.
   * @param path 脚本路径.
   * @return 一个脚本配置.
   */
  static LuaConfig loadInsideLuaConfig(Path path);

  /**
   * 用Native原生运行模式加载一个脚本配置.
   * @param script 脚本.
   * @return 一个脚本配置.
   */
  static LuaConfig loadOutsideLuaConfig(String script);

  /**
   * 用Native原生运行模式加载一个脚本配置.
   * @param path 脚本路径.
   * @return 一个脚本配置.
   */
  static LuaConfig loadOutsideLuaConfig(Path path);

  /**
   * 构造一张Lua表.
   * @return LuaTableBuilder
   */
  LuaTableBuilder<?> newTableBuilder();

  /**
   * 增加一个全局变量.
   * @param key   全局变量名.
   * @param value 全局变量值.
   */
  void setGlobal(String key, Object value) throws LuaException;

  /**
   * 增加一个全局变量.
   * @param key   全局变量名.
   * @param value 全局变量值.
   * @return 本实例对象.
   */
  default LuaConfig addGlobal(String key, Object value) throws LuaException {
    setGlobal(key, value);
    return this;
  }

  /**
   * 运行脚本.
   */
  void config() throws IOException, LuaException;

  /**
   * 关闭并释放LuaConfig所使用的资源.
   * 需要注意的是, 如果传入闭包, 在调用闭包时候,
   * 则必须要保持LuaConfig未被关闭.
   */
  void close();

  /**
   * 运行一个Lua闭包对象并且返回为字符串类型.
   * <p>
   *   对于默认模式有:
   *   如果传递的参数大于3个的时候, 将只会传递前三个参数给闭包.
   * </p>
   * <p>
   *   对于Native模式有:
   *   如果在运行此闭包时, LuaConfig已经关闭, 闭包将会运行失败并抛出异常.
   * </p>
   * @param closureObj   由lua脚本返回的一个闭包实例对象.
   * @param objs         传递给闭包的参数.
   * @return 如果闭包返回为nil, 则此方法返回null.
   *         如果此闭包运行后返回的字符串结果.
   */
  String callClosureReturnString(Object closureObj, Object ... objs);

  /**
   * 运行一个Lua闭包对象并且返回为java对象.
   * 成功且正确的返回java对象的前提是, 在闭包
   * 中返回的对象必须是一个java对象.
   * <p>
   *   对于默认模式有:
   *   如果传递的参数大于3个的时候, 将只会传递前三个参数给闭包.
   * </p>
   * <p>
   *   对于Native模式有:
   *   如果在运行此闭包时, LuaConfig已经关闭, 闭包将会运行失败并抛出异常.
   * </p>
   * @param closureObj   由lua脚本返回的一个闭包实例对象.
   * @param objs         传递给闭包的参数.
   * @return 如果闭包返回为nil, 则此方法返回null.
   *         如果此闭包运行后返回的java对象结果.
   */
  Object callClosureReturnObject(Object closureObj, Object ... objs);

  /**
   * 运行一个Lua闭包对象. 并且返回一个Number实例.
   * <p>
   *   对于默认模式有:
   *   如果传递的参数大于3个的时候, 将只会传递前三个参数给闭包.
   * </p>
   * <p>
   *   对于Native模式有:
   *   如果在运行此闭包时, LuaConfig已经关闭, 闭包将会运行失败并抛出异常.
   * </p>
   * @param closureObj   由lua脚本返回的一个闭包实例对象.
   * @param objs         传递给闭包的参数.
   * @return 如果闭包返回为nil, 则此方法返回null.
   *         如果此闭包运行后返回的数字结果.
   */
  Number callClosureReturnNumber(Object closureObj, Object ... objs);

  /**
   * 运行一个Lua闭包对象. 并且返回一个布尔值.
   * <p>
   *   对于默认模式有:
   *   如果传递的参数大于3个的时候, 将只会传递前三个参数给闭包.
   * </p>
   * <p>
   *   对于Native模式有:
   *   如果在运行此闭包时, LuaConfig已经关闭, 闭包将会运行失败并抛出异常.
   * </p>
   * @param closureObj   由lua脚本返回的一个闭包实例对象.
   * @param objs         传递给闭包的参数.
   * @return 如果闭包返回为nil, 则此方法返回false.
   *         如果此闭包运行后返回的布尔值结果.
   */
  boolean callClosureReturnBoolean(Object closureObj, Object ... objs);

  /**
   * 运行一个Lua闭包对象. 并且返回一个闭包.
   * <p>
   *   对于默认模式有:
   *   如果传递的参数大于3个的时候, 将只会传递前三个参数给闭包.
   * </p>
   * <p>
   *   对于Native模式有:
   *   如果在运行此闭包时, LuaConfig已经关闭, 闭包将会运行失败并抛出异常.
   * </p>
   * @param closureObj   由lua脚本返回的一个闭包实例对象.
   * @param objs         传递给闭包的参数.
   * @return 如果闭包返回为nil, 则此方法返回null.
   *         如果此闭包运行后返回的闭包结果.
   */
  Object callClosureReturnClosure(Object closureObj, Object ... objs);
}
```

#### 使用方法

首先获取`LuaConfig`实例, 这里有四种方法获取其实例, 分别为:

```java
LuaConfig config = LuaConfig.loadInsideLuaConfig(脚本字符串);
LuaConfig config = LuaConfig.loadInsideLuaConfig(脚本文件路径);
LuaConfig config = LuaConfig.loadOutsideLuaConfig(脚本字符串);
LuaConfig config = LuaConfig.loadOutsideLuaConfig(脚本文件路径);
```

之后让脚本能够获取到你的要配置的对象, 也就是设置脚本中的全局变量.

```java
config.addGlobal("key1", value1)
      .addGlobal("keyn", valuen);
```

最后运行脚本:

```java
config.config();
```

#### 例子1 - 不带闭包且方法赋值

##### 实体类

```java
public class Setting {
  private String a;
  private int b;

  public void setA(String a) {
    this.a = a;
  }

  public void setB(int b) {
    this.b = b;
  }
}
```

##### lua脚本

```lua
setting:setA("I am A.")
setting:setB(99 * 13)
```

##### 应用脚本

```java
Setting setting = new Setting();
LuaConfig config = LuaConfig.loadInsideLuaConfig(Paths.get("setting.lua"))
config.add("setting", setting).config();
```

#### 例子2 - 不带闭包且属性赋值

##### 实体类

```java
public class Setting {
  public String a;
  public int b;
}
```

##### lua脚本

```lua
setting.a = "I am A."
setting.b = 10
```

##### 应用脚本

```java
Setting setting = new Setting();
LuaConfig config = LuaConfig.loadInsideLuaConfig(Paths.get("setting.lua"))
config.add("setting", setting).config();
```

#### 例子3 - 闭包调用

这个例子包含了属性赋值和闭包的使用.

其中实现了[LuaConfigEntity](#LuaConfigEntity)接口, 以更方便的对闭包进行使用.

##### 实体类

```java
class TestEntity implements LuaConfigEntity {
  private LuaConfig config;
  private Object expCalculator;
  private Object expCalculator2;

  private Object a;

  private Object b;

  private Object c;

  private Object d;

  public String e;

  public Object f;

  public boolean callA() {
    return config.callClosureReturnBoolean(a);
  }

  public String callB() {
    return config.callClosureReturnString(b);
  }

  public TestEntity callC() {
    return (TestEntity) config.callClosureReturnObject(c);
  }

  public double callD(double d) {
    Object temp = config.callClosureReturnClosure(this.d, d);
    return config.callClosureReturnNumber(temp).doubleValue();
  }

  public double callF(double d) {
    return config.callClosureReturnNumber(this.f, d).doubleValue();
  }

  int calculate(int level) {
    return config.callClosureReturnNumber(
            expCalculator, level
    ).intValue();
  }

  float calculate2(int level) {
    return config.callClosureReturnNumber(
            expCalculator2, level
    ).floatValue();
  }

  public void setExpCalculator(Object expCalculator) {
    this.expCalculator = expCalculator;
  }

  public void setExpCalculator2(Object expCalculator2) {
    this.expCalculator2 = expCalculator2;
  }

  public void setA(Object a) {
    this.a = a;
  }

  public void setB(Object b) {
    this.b = b;
  }

  public void setC(Object c) {
    this.c = c;
  }

  public void setD(Object d) {
    this.d = d;
  }

  @Override
  public LuaConfig getLuaConfig() {
    return config;
  }

  @Override
  public void setLuaConfig(LuaConfig luaConfig) {
    this.config = luaConfig;
  }

  @Override
  public String toString() {
    return "TestEntity{" +
            "config=" + config +
            ", expCalculator=" + expCalculator +
            ", expCalculator2=" + expCalculator2 +
            ", a=" + a +
            ", b=" + b +
            ", c=" + c +
            '}';
  }
```

##### lua脚本

```java
script = String.join(
        "\n",
        "test:setExpCalculator(",
        "  function (level)",
        "    return level * 2",
        "  end",
        ")",
        "test:setExpCalculator2(",
        "  function (level)",
        "    return level * 1.5",
        "  end",
        ")",
        "test:setA(",
        "  function (level)",
        "    return true",
        "  end",
        ")",
        "test:setB(",
        "  function (level)",
        "    return 'hello'",
        "  end",
        ")",
        "test:setC(",
        "  function (level)",
        "    return test",
        "  end",
        ")",
        "test:setD(",
        "  function (d)",
        "    return function ()",
        "             return d*d",
        "           end",
        "  end",
        ")",
        "test.e = 'aaa'",
        "test.f = function (d)",
        "           return d ^ 0.5",
        "         end"
);
```

##### 测试代码

```java
@Test
void luaConfigEntityInsideTest() throws LuaException, IOException {
  LuaConfig config = LuaConfig.loadInsideLuaConfig(script);
  TestEntity testEntity = new TestEntity();
  config.addGlobal("test", testEntity).config();
  System.out.println(testEntity.calculate(10));
  System.out.println(testEntity.calculate(20));
  System.out.println(testEntity.calculate2(10));
  System.out.println(testEntity.calculate2(20));
  System.out.println(testEntity.callA());
  System.out.println(testEntity.callB());
  System.out.println(testEntity.callC());
  System.out.println(testEntity.callD(3.14));
  System.out.println(testEntity.e);
  System.out.println(testEntity.callF(2));
}

@Test
void luaConfigEntityOutsideTest() throws LuaException, IOException {
  LuaConfig config = LuaConfig.loadOutsideLuaConfig(script);
  TestEntity testEntity = new TestEntity();
  config.addGlobal("test", testEntity).config();
  System.out.println(testEntity.calculate(10));
  System.out.println(testEntity.calculate(20));
  System.out.println(testEntity.calculate2(10));
  System.out.println(testEntity.calculate2(20));
  System.out.println(testEntity.callA());
  System.out.println(testEntity.callB());
  System.out.println(testEntity.callC());
  System.out.println(testEntity.callD(3.14));
  System.out.println(testEntity.e);
  System.out.println(testEntity.callF(2));
}
```

### LuaConfigEntity

当某类实现了该接口后, 在使用`LuaConfig`中的`setGlobal()`或`addGlobal()`方法时, 会自动将当前的`LuaConfig`对象实例通过`setLuaConfig()`方法传送给该类. 以方便该类能够调用Lua传来的闭包.

```java
/**
 * 如果需要自己的实体类能够有运行闭包的能力,
 * 则可以用实体类实现本接口, 获取正在配置该
 * 实体类的LuaConfig, 并且利用其运行脚本
 * 所返回出来的闭包.
 */
public interface LuaConfigEntity {
  /**
   * 获取 LuaConfig.
   * @return LuaConfig对象.
   */
  LuaConfig getLuaConfig();

  /**
   * 设置 LuaConfig.
   * @param luaConfig 要传入的LuaConfig实例.
   */
  void setLuaConfig(LuaConfig luaConfig);
}
```
