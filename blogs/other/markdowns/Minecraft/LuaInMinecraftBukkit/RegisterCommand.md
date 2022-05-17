>最后更新于2022年05月17日 | [历史记录](https://github.com/SmileYik/MyBlog/commits/master/blogs/other/markdowns/Minecraft/LuaInMinecraftBukkit/RegisterCommand.md)

>此页面内容对应于LuaInMinecraftBukkit插件的最新版本(**version: 1.4**), 历史文档可以插件此页面的历史记录

这一节是来谈谈如何注册一个指令的.

注册指令的方法为:

```lua
luaBukkit.commandRegister:registerCommand(arg1, arg2)
```

其中第一个参数(arg1)为要注册的指令, 第二个参数(arg2)是来告诉插件当输入注册的指令后使用参数2对应的函数去处理. 具体输入的值为一个字符串, 格式为`<脚本插件ID>.[模块名.]<函数名>`, 这个格式需要对应一个具体的函数.

在指令被触发时, 插件将会传送三个值到所对应的函数中作为形参. 这三个值如下表:

|形参|值|说明|
|-|-|-|
|形参1|isPlayer|是否为玩家发出, 这是一个bool类型|
|形参2|sender|发送指令的实体, 这里可能是玩家也可能是控制台实例对象的引用([文档](https://bukkit.windit.net/javadoc/org/bukkit/command/CommandSender.html))|
|形参3|args|玩家发送的指令, 是一个字符串列表, 第一个元素对应的值代表这个脚本所注册的指令|

### 例子

例如我有一个lua脚本插件的id叫`luacmd1`, 他的脚本内容为

```lua
commands = {
  onCommand = function ()
    -- do something....
  end
}
```

我们想用里面的`commands`模块下的`onCommand`函数去注册一个名为`cmd`的指令, 首先, 我们先修改`onCommand`函数, 让他能够接收到插件传来的三个参数

```lua
commands = {
  onCommand = function (isPlayer, sender, args)
    -- do something....
  end
}
```

然后将这个函数注册为能够处理指令`cmd`的函数, 我们先来分析一下, 这个脚本插件的id为`luacmd1`, `onCommand`函数在`commands`模块下, 所以要注册成指令时, 注册方法的第二个参数应该填入`luacmd1.commands.onCommand`

```lua
commands = {
  onCommand = function (isPlayer, sender, args)
    -- do something....
  end
}

luaBukkit.command:registerCommand(
    "cmd", "luacmd1.commands.onCommand"
)
```

之后, 你输入的`/luap cmd [arg1] ... [argn]`指令都会让`onCommand`处理.

args形参将会赋予 `[cmd, arg1, ..., argn]` 的字符串列表
