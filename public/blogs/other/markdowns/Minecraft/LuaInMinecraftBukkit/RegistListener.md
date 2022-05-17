> 最后更新于2022年05月17日 | [历史记录](https://github.com/SmileYik/MyBlog/commits/master/blogs/other/markdowns/Minecraft/LuaInMinecraftBukkit/RegistListener.md)

>此页面内容对应于LuaInMinecraftBukkit插件的最新版本(**version: 1.4**), 历史文档可以插件此页面的历史记录

这里是说说如何创建一个监听事件的.

此插件版本的监听事件仅仅包含Minecraft 1.12.2所对应的Bukkit版本含有的监听事件, 后续版本添加的新事件可能不可用, 但对于已有的事件是可用的


### 注册监听

注册监听器的方法有两种, 一种是使用类似于注册指令, 也就是要提供函数路径的方式去注册监听器; 而第二种则是将函数作为注册参数去注册监听器.

所有用来注册事件的函数都会在事件触发时, 传入相对于的事件实例作为形参.

#### 方式1

方式1与注册指令的方式类似, 它也需要在注册过程中将`<脚本插件id>.[模块名.]函数名`字符串作为参数来注册.

java中的代码如下:

```java
/**
 * 注册监听事件.
 * @param event 要注册的事件名.
 * @param id 闭包id
 * @param priority 优先级, 范围为[0, 5], 不再此区间内则为正常默认等级.
 */
public void register(String event, String id, int priority);
```

注册方式如下:
```lua
luaBukkit.event:register(arg1, arg2, arg3)
```

##### arg1 要监听的事件

arg1 代表你要监听的事件, Java用什么事件类你就怎么在这用就好了(类名简写).

例如我要监听一个玩家加入服务器事件, 在java中是导入`org.bukkit.event.player.PlayerJoinEvent`, 也就是这样用

```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
  // do things...
}
```

我们只要填入"PlayerJoinEvent"这个字符串给第一个参数就可以了.

##### arg2 事件发生时要执行的函数路径

接收的是一个字符串, 格式为`<脚本插件ID>.[模块名.]<函数名>`.

例如脚本插件id为'luaevent1'的脚本中有一个方法如下:

```lua
listeners = {
  -- e 代表当注册的事件触发时, 传入的事件实例的引用
  onPlayerJoin = function (e)
    -- do something....
  end
}
```

脚本插件id为`luaevent1`, 函数名为`onPlayerJoin`, 而这个函数是在 `listeners` 模块下的, 所以整合起来, 参数二应该填入如下字符串`luaevent1.listeners.onPlayerJoin`

##### arg3 事件优先级

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

##### 示例

在脚本插件id为'playerfish'脚本中注册一个玩家钓鱼事件(`PlayerFishEvent`)

``` lua
listeners = {
  onPlayerFish = function (event)
    -- do something....
  end
}

luaBukkit.event:register(
    "PlayerFishEvent", "playerfish.listeners.onPlayerFish", 2
)
```

#### 方式2

方式2允许你能够在注册过程中能够使用一个函数作为参数去注册.

java代码如下:

```java
/**
 * 创建一个事件监听器.
 * @param plugin   脚本插件实例.
 * @param closure  脚本函数
 * @param event    事件名
 * @param priority 优先级, 范围为[0, 5], 不再此区间内则为正常默认等级.
 */
public String register(LuaPlugin plugin,
                       Object closure, String event, int priority);
```

注册方式如下:

```lua
luaBukkit.event:register(plugin, closure, event, priority)
```
PlayerJoinEvent
##### 参数1: plugin

此参数需要传入脚本插件实例, 当脚本插件被加载时, 如`luaBukkit`变变量一样, LuaInMinecraftBukkit将会在脚本全局环境中创建一个名为`self`的变量, 这个变量就是脚本插件实例.

##### 参数2: closure

此参数需要传入一个函数. 比如:

```lua
luaBukkit.event:register(self, function (event)
  -- do something....
end, "PlayerJoinEvent", 2)
```

其中第二个参数就为一个函数.

```lua
function (event)
  -- do something....
end
```

##### 参数3: event

对应与方式1注册监听器中的参数1(要监听的事件)

##### 参数4: priority

对应与方式1注册监听器中的参数3(事件优先级)

##### 示例

注册一个玩家重生事件(`PlayerRespawnEvent`)

```lua
luaBukkit.event:register(self, function (event)
  -- do something....
end, "PlayerRespawnEvent", 2)
```


### 取消监听

#### 取消监听单个事件

java代码:

```java
/**
 * 移除插件脚本用指定id注册的事件.
 * @param id 注册事件所用的id.
 */
public void unregisterEvent(String id);
```

使用方法:

```lua
luaBukkit.eventRegister:unregisterEvent(arg1)
```

arg1就是你注册时候写的第二个参数, 也就是有特殊格式的字符串: `<脚本插件ID>.[模块名.]<函数名>`

#### 取消监听脚本插件所注册的所有事件

java代码:

```java
/**
 * 移除插件脚本所有注册的事件.
 * @param pluginId 插件脚本id
 */
public void unregisterAll(String pluginId);
```

使用方法:

```lua
luaBukkit.eventRegister:unregisterAll(pluginId)
```

传入的参数就是脚本插件的id. 会把这个脚本插件中的所有监听事件全部取消掉.
