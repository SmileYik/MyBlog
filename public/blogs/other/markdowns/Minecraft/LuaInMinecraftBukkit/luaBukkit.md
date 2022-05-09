luaBukkit变量是一个全局变量, 它是一张表, 并且在每一个脚本被加载前就已经被准备好并注册进lua脚本环境中的全局变量中.

这张表中主要含有4个参数, 它的内容具体如下

|键|值|说明|
|-|-|-|
|pluginHelper|java实例对象的引用|[LuaPluginHelper](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/plugin/util/LuaPluginHelper.java)|
|server|java实例对象的引用|可以用的方法有: [Server类文档](https://bukkit.windit.net/javadoc/org/bukkit/Server.html)|
|eventRegister|java实例对象的引用|对事件进行管理[EventRegister](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/plugin/event/EventRegister.java)|
|commandRegister|java实例对象的引用|对指令进行管理[CommandRegister](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/plugin/command/CommandRegister.java)|

### pluginHelper

```java
public class LuaPluginHelper {
  /**
   * 指定脚本插件是否加载.
   * @param id 脚本插件id
   * @return 如果已经加载则返回true.
   */
  public boolean isLoadPlugin(String id);

  /**
   * 以指定id对应的函数为run方法主体创建一个Runnable子类实例
   * @param id 函数路径
   * @return LuaRunnable实例
   */
  public LuaRunnable newLuaRunnable(String id);

  /**
   * 以指定id对应的函数为run方法主体创建一个Runnable子类实例
   * @param id 函数路径
   * @param obj 带入的参数.
   * @return LuaRunnable实例
   */
  public LuaRunnable newLuaRunnable(String id, Object obj);

  /**
   * 获取本插件实例对象.
   * @return 本插件的实例对象.
   */
  public Plugin getPlugin();

  /**
   * 通过全类名去获取java类类型.
   * @param name 全类名
   * @return 如果类存在则返回对应的类
   * @throws ClassNotFoundException 当找不到指定路径的类则抛出.
   */
  public Class<?> getClass(String name) throws ClassNotFoundException;

  /**
   * 插件是否在Native模式下运行.
   * @return 如果是在Native模式下运行则返回true.
   */
  public boolean isNativeMode();
}
```


#### isLoadPlugin

```java
/**
 * 指定脚本插件是否加载.
 * @param id 脚本插件id
 * @return 如果已经加载则返回true.
 */
public boolean isLoadPlugin(String id)
```

用法:

``` lua
local flag = luaBukkit.pluginHelper:isLoadPlugin("MyPlugin")
```

### eventRegister

```java
public class EventRegister {
  /**
   * 注册监听事件.
   * @param event 要注册的事件.
   * @param id 闭包id格式为: <脚本插件id>.[全局表名.]<全局函数名>
   * @param priority 优先级, 范围为[0, 5], 不再此区间内则为正常默认等级.
   * @throws ClassNotFoundException 当要注册的事件不存在则抛出.
   * @throws NoSuchMethodException 当要注册的事件不存在则抛出.
   * @throws InvocationTargetException 当要注册的事件不存在则抛出.
   * @throws InstantiationException 当要注册的事件不存在则抛出.
   * @throws IllegalAccessException 当要注册的事件不存在则抛出.
   */
  public void registerListener(String event, String id, int priority);

  /**
   * 移除插件脚本用指定id注册的事件.
   * id 格式为 <脚本插件id>.[全局表名.]<全局函数名>
   * @param id 注册事件所用的id.
   */
  public void unregisterEvent(String id);

  /**
   * 移除插件脚本所有注册的事件.
   * @param pluginId 插件脚本id
   */
  public void unregisterAll(String pluginId);
}
```

### commandRegister

```java
public class CommandRegister {
  /**
   * 注册一个指令.
   * @param command 要注册的指令.
   * @param id 闭包id. <脚本插件id>.[全局表名.]<全局函数名>
   */
  public void registerCommand(String command, String id);

}
```
