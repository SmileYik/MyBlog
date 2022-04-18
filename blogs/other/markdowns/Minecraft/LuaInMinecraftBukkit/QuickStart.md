准备条件有:

+ 简单熟悉**lua 5.2.X**语法(默认模式)

或者

+ 简单熟悉**lua 5.4**语法(native模式)

### 第一步 创建脚本插件文件夹

在Bukkit服务器的`plugins/LuaInMinecraftBukkit`目录下, 有一个名为`plugins`的目录, 这个目录就是用来装lua脚本插件的目录.

我们进入`plugins/LuaInMinecraftBukkit/plugins`目录中, 创建一个`MyLuaPlugin`文件夹, 这个文件夹就成了一个脚本插件文件夹.


### 第二步 创建 lua_plugin.yml

在`MyLuaPlugin`文件夹中创建一个`lua_plugin.yml`文件, 用来告诉插件这里有一个脚本插件, 在其中写入.

``` yml
# 展示用的名字
displayName: 我的Lua插件
# 脚本插件id, 建议插件id与目录名保持一致, 并且只使用26个英文字母组成
id: MyLuaPlugin
# 作者
author: SmileYik
# 脚本版本
version: 1.0
# 强制依赖插件, 是一个列表
# 其中列表里是其他依赖脚本插件的脚本插件id
dependents: []
# 非强制依赖插件, 是一个列表
# 其中列表里是其他依赖脚本插件的脚本插件id
softDependents: []
```

插件总是会在加载脚本前去查询`lua_plugin.yml`文件以获取脚本插件信息.

### 第三步 创建 main.lua

插件总是从`main.lua`脚本开始, 为了让插件能够运行我们写的脚本插件, 我们在`MyLuaPlugin`文件夹内创建一个`main.lua`文件

并且在其中写入如下文本:

```lua
-- 获取日志实例
local logger = self:getLogger()
-- 获取配置路径
local configPath = self:getConfigPath()

command = {}
listener = {}

-- 当脚本插件被启用时会执行这个方法
function onEnable()
    logger:info("我被启用了!!!!")
    if (configPath:exists() == false) then
        configPath:mkdirs()
    end
    -- 注册一个指令, 第一个参数为: 注册的指令
    --             第二个参数为: 函数路径
    luaBukkit.commandRegister:registerCommand(
        "test", "MyLuaPlugin.command.dispatch"
    )
    -- 注册一个事件, 第一个参数为: 事件类型
    --             第二个参数为: 函数路径
    --             第三个参数为: 事件优先级
    luaBukkit.eventRegister:registerListener(
        "PlayerJoinEvent", "MyLuaPlugin.listener.onPlayerJoin", 2
    )
end

-- 当脚本插件被结束时会执行这个方法
function onDisable()
    logger:info("我被卸载了!")
end

function listener.onPlayerJoin(event)
    local playername = event:getPlayer():getName()
    event:setJoinMessage(playername .. "加入了服务器哦~")
    event:getPlayer():sendMessage("你好啊" .. playername)
end

function command.dispatch(arg, sender, strs)
    args = {}
    if (sender == nil) then
        args.isPlayer = arg[1]
        args.sender = arg[2]
        args.args = arg[3]
    else
        args.isPlayer = arg
        args.sender = sender
        args.args = strs
    end

    -- args是一张表, 表里有三个参数, 分别是 isPlayer(bool), sender(发送指令的人), args(字符串数组)
    if (args.args[2] == "openInventory" and args.isPlayer) then
        local inv = luaBukkit.server:createInventory(NIL, 27, "我是你的第一个窗口~")
        args.sender:openInventory(inv)
        logger:info("执行完毕")
        return
    end
    args.sender:sendMessage("指令错误!")
end


logger:info("加载完毕!")
```

现在, 你的**LuaInMinecraftBukkit**的插件配置目录的结构应该是这样子的:

```
.
└── plugins
    └── MyLuaPlugin
        ├── lua_plugin.yml
        └── main.lua

2 directories, 2 files
```

#### 脚本解析 (可以跳过)

[跳过](#第四步 启用脚本)

上面我们写了一个`main.lua`文件, 文件中装有我们的lua脚本.

首先看第一句

```lua
local logger = self:getLogger()
```

self是一个指向Java插件中的[LuaPlugin](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/plugin/LuaPlugin.java)类的引用,
而`:`符号就相当于是在c语言中解引用的过程, `self:getLogger()`
连起来一起就变成了执行`self`引用指向的对象的`getLogger()`
方法. 所以这一句就是在本身的**LuaPlugin**类的实例中获取
一个**Logger**实例, 没错, 这个Logger就是java编写bukkit插件
时获取的那个Logger实例是同一个类. 至此, 你应该了解到了lua脚本
中能够直接访问到java的对象实例的方法, 而在脚本下文中的

+ `configPath` 对应着Java中 `File` 类实例对象引用
+ `logger` 对应着Java中 `Logger` 类实例对象引用
+ `luaBukkit.eventRegister` 对应的是 [EventRegister](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/plugin/event/EventRegister.java) 类实例对象引用
+ `luaBukkit.commandRegister` 对应的是 [CommandRegister](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/plugin/command/CommandRegister.java) 类实例对象引用
+ `luaBukkit.server` 对应的是java中`Bukkit.getServer()`返回的服务器实例对象的引用
等等等等



接着下面定义了一个全局的**onEnable函数**. 插件在加载脚本过程中
总是会先将脚本文件中的文本重头至尾解析一边, 解析完成之后再去
调用脚本中的全局的**onEnable函数**. **onDisable函数**同理, 当脚本
需要被卸载时, 脚本中的**onDisable函数**就会被插件调用.


`listener`表内有一个`onPlayerJoin`函数, 这个函数将传递给插件插件管理
当注册的事件发生时(这里是玩家加入服务器时间), 插件将会把该事件的实例对象的
引用(在这个例子中是[PlayerJoinServer](https://bukkit.windit.net/javadoc/org/bukkit/event/player/PlayerJoinEvent.html)实例对象引用)

`command`表内有一个`dispatch`方法, 它被以下语句注册并传送给插件.

```lua
luaBukkit.commandRegister:registerCommand(
    "test", "MyLuaPlugin.command.dispatch"
)
```

插件将在所注册的指令(这个例子中是test)被使用时, 把3给参数传递给所指定的脚本函数中.

如果插件运行在默认模式, 那么插件将只会传入一个参数到指定的脚本函数中, 如果所给定的`MyLuaPlugin.command.dispatch`所对应的函数的参数有多个, 那么除了第一个参数被正确赋值, 其余形参的值都为`nil`, 这个被正确赋值的参数是一个如下的列表:

|索引|值|说明|
|-|-|-|
|1|isPlayer|是否为玩家发出, 这是一个bool类型|
|2|sender|发送指令的实体, 这里可能是玩家也可能是控制台实例对象的引用|
|3|args|玩家发送的指令, 是一个字符串列表, 第一个索引对应的值代表这个脚本所注册的指令(在这个例子中args[1]的值是`test`)|

但是如果插件运行在Native模式, 那么插件将会传入三个参数到指定的脚本函数中, 传入的参数从第一个形参到第三个形参依次为:

|形参1|形参2|形参3|
|-|-|-|
|isPlayer|sender|args|

形参内容与上表内容一致.

以下操作就是为了兼容Native模式与默认模式, 也就是说, `sender`是第二个形参, 如果第二个形参没有被传入参数, 那么就是在以默认模式运行, 反之则为在Native模式下运行.

```lua
args = {}
if (sender == nil) then
    args.isPlayer = arg[1]
    args.sender = arg[2]
    args.args = arg[3]
else
    args.isPlayer = arg
    args.sender = sender
    args.args = strs
end
```


### 第四步 启用脚本

脚本已经编好了但是还没有被运行, 运行可以有以下方法.

#### 选项1: 重启服务器以启动脚本

这个方法很简单, 只需要重新启动Bukkit服务器就可以加载脚本了.

#### 选项2: 热加载

**确保没有一个相同脚本插件ID的脚本插件已被加载!**

在控制台中输入指令`/lua load MyLuaPlugin`即可加载(**注意大小写**)

### 第五步 上mc看效果了

可以自己试一下效果.

+ 登陆事件演示

![登陆事件效果](/blogs/other/markdowns/Minecraft/LuaInMinecraftBukkit/QuickStart/yudt8o.png)

+ 指令演示(指令: "/luap test openInventory")

![指令演示效果](/blogs/other/markdowns/Minecraft/LuaInMinecraftBukkit/QuickStart/50s1e6.png)
