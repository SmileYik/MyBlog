这里是说说如何创建一个监听事件的.

此插件版本的监听事件仅仅包含Minecraft 1.12.2所对应的Bukkit版本含有的监听事件, 后续版本添加的新事件可能不可用, 但对于已有的事件是可用的


### 注册监听

注册监听事件方法如下:

```lua
luaBukkit.eventRegister:registerListener(arg1, arg2, arg3)
```

#### arg1 要监听的事件

arg1 代表你要监听的事件, Java用什么事件类你就怎么在这用就好了(类名简写).

例如我要监听一个玩家加入服务器事件, 在java中是导入`org.bukkit.event.player.PlayerJoinEvent`, 也就是这样用

```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
  // do things...
}
```

我们只要填入"PlayerJoinEvent"这个字符串给第一个参数就可以了.

#### arg2 事件发生时要执行的方法

接收的是一个字符串, 格式为`<脚本插件ID>.[模块名.]<函数名>`, 可以看注册指令那一接具体了解, 方法一样.

当无法寻找到对应的函数时将会自动取消该事件.

#### arg3 事件优先级

这个是给一个[0, 5]区间内的数, 当在区间之外时默认为2

对应的优先级如下

|数字|优先级|
|-|-|
|0|LOWEST|
|1|LOW|
|2|NORMAL|
|3|HIGH|
|4|HIGHEST|
|5|MONITOR|

### 取消监听

#### 取消监听单个事件

```lua
luaBukkit.eventRegister:unregisterEvent(arg1)
```

arg1就是你注册时候写的第二个参数, 也就是有特殊格式的字符串: `<脚本插件ID>.[模块名.]<函数名>`

#### 取消监听脚本插件所注册的所有事件

```lua
luaBukkit.eventRegister:unregisterAll(pluginId)
```

传入的参数就是脚本插件的id. 会把这个脚本插件中的所有监听事件全部取消掉.
