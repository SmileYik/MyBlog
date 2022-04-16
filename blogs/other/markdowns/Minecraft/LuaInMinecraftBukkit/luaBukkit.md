luaBukkit变量是一个全局变量, 它是一张表

|键|值|说明|
|-|-|-|
|pluginHelper|表||
|server|表|可以用的方法有: [文档](https://bukkit.windit.net/javadoc/org/bukkit/Server.html)|
|eventRegister|表|对事件进行管理|
|commandRegister|表|对指令进行管理|

### pluginHelper

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
