>Update: 2022-05-19 | [History](https://github.com/SmileYik/MyBlog/commits/master/blogs/other/markdowns/Minecraft/LuaInMinecraftBukkit/QuickStart.md)

>This page for latest version of LuaInMinecraftBukkit(or upper)(**version: 1.4**), you can find older content in history.


### Prepare

+ konw how to use **lua 5.2.X** (Inside Mode)

OR

+ konw how to use **lua 5.4** (Outside Mode)

### Create Your Lua Plugin Folder

After you install this plugin. it will create a folder named `plugins` in `[your bukkit root]/plugins/LuaInMinecraftBukkit` folder. this folder is use to put lua script plugin.

Enter `plugins/LuaInMinecraftBukkit/plugins` and create a folder named `MyLuaPlugin`, then you done the first step.

### Create lua_plugin.yml for Your Script Plugin

Into `MyLuaPlugin` folder and create a new file named `lua_plugin.yml`, this file is to tell LuaInMinecraftBukkit that your lua plugin information.

It is template of `lua_plugin.yml`

``` yml
# your lua plugin display name
displayName: 我的Lua插件
# lua script id, make sure as same as folder name, and just contants a-zA-Z0-9
id: MyLuaPlugin
# author
author: author
# your script version
version: 1.0
# which script plugin you dependent.
dependents: []
# which script plugin you dependent.
softDependents: []
# which Lua VM did your script plugin want to use.
# you can chose Inside or Outside.
# Inside is made by java
# Outside is made by c
mode: Inside
```

### Create main.lua

LuaInMinecraftBukkit always to load a script plugin at `main.lua` file.

create `main.lua` file. and write these text into it.

```lua
-- Get Logger
local logger = self:getLogger()

command = {}
listener = {}

-- LuaInMinecraftBukkit will find onEnable function and call it first after load your script plugin's main.lua file.
function onEnable()
    logger:info("I be enable!!!!!")
    -- register a command
    -- param two allow this format: '<lua script id>.<function>'
    -- in this example, this lua script named 'MyLuaPlugin',
    -- and this function is 'command.dispatch'.
    -- then i will use 'MyLuaPlugin.command.dispatch'
    luaBukkit.command:registerCommand(
        "test", "MyLuaPlugin.command.dispatch"
    )
    -- register a player join event
    -- the param two is as same as register command.
    luaBukkit.event:register(
        "PlayerJoinEvent", "MyLuaPlugin.listener.onPlayerJoin", 2
    )
end

-- LuaInMinecraftBukkit will find onDisable function and call it after unload your script plugin.
function onDisable()
    logger:info("I am unload!")
end

-- this function is registered a PlayerJoinEvent.
function listener.onPlayerJoin(event)
    local playername = event:getPlayer():getName()
    event:setJoinMessage(playername .. " JOINED~")
    event:getPlayer():sendMessage("Hello, " .. playername)
end

-- this function is registered a command.
function command.dispatch(isPlayer, sender, args)
    if (args[2] == "openInventory" and isPlayer) then
        local inv = luaBukkit.server:createInventory(NIL, 27, "I am your first window~")
        sender:openInventory(inv)
        logger:info("done!!!")
        return
    end
    sender:sendMessage("your command is wrong!")
end

logger:info("load over!")
```

Then, your script plugin folder should like this:

```
.
└── plugins
    └── MyLuaPlugin
        ├── lua_plugin.yml
        └── main.lua

2 directories, 2 files
```

#### 脚本解析 (可以跳过)

[跳过](#第四步__启用脚本)

上面我们写了一个`main.lua`文件, 文件中装有我们的lua脚本.
首先看第一句.

```lua
local logger = self:getLogger()
```

self是一个指向Java插件中的[LuaPlugin](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/luaplugin/LuaPlugin.java)类的引用,
而`:`符号就相当于是在c语言中解引用的过程, `self:getLogger()`
连起来一起就变成了执行`self`引用指向的对象的`getLogger()`
方法. 所以这一句就是在本身的**LuaPlugin**类的实例中获取
一个**Logger**实例, 没错, 这个Logger就是java编写bukkit插件
时获取的那个Logger实例是同一个类. 至此, 你应该了解到了lua脚本
中能够直接访问到java的对象实例的方法, 而在脚本下文中的

+ `configPath` 对应着Java中 `File` 类实例对象引用
+ `logger` 对应着Java中 `Logger` 类实例对象引用
+ `luaBukkit.event` 对应的是 [EventRegister](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/luaplugin/event/EventRegister.java) 类实例对象引用
+ `luaBukkit.command` 对应的是 [CommandRegister](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/luaplugin/command/CommandRegister.java) 类实例对象引用
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
luaBukkit.command:registerCommand(
    "test", "MyLuaPlugin.command.dispatch"
)
```

插件将在所注册的指令(这个例子中是test)被使用时,把3给参数传递给所指定的脚本函数中.

当注册的指令被执行时, 插件将会传送三个参数给脚本, 如下表(按照顺序排列):

|形参|值|说明|
|-|-|-|
|形参1|isPlayer|if this command is send by a player, it will be true.|
|形参2|sender|who send this command, it might be player or console|
|形参3|args|the command args. if your send command /luap test a b c, this will be a list [test, a, b, c]|

### Enable Your Script Plugin

there has two way to load and enable your script plugin.

#### Way 1: restart your bukkit server.

this is a simple way to load your script plugin.

#### Way 2: use command

**Make Sure There is No Same ID Script Plugin Be Loaded!**

send a command in your server like:

**MyLuaPlugin** is your script plugin id.

```shell
/lua load MyLuaPlugin
```

在控制台中输入指令`/lua load MyLuaPlugin`即可加载(**注意大小写**)

### Show in Minecraft

可以自己试一下效果.

+ Login

![登陆事件效果](/blogs/other/markdowns/Minecraft/LuaInMinecraftBukkit/../QuickStart/yudt8o.png)

+ Open A Inventory(Command: "/luap test openInventory")

![指令演示效果](/blogs/other/markdowns/Minecraft/LuaInMinecraftBukkit/../QuickStart/50s1e6.png)
