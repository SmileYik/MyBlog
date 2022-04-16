准备条件有:

+ 简单熟悉**lua 5.2.X**语法

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
-- 获取日志
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
    event:setJoinMessage(event:getPlayer():getName() .. "加入了服务器哦~")
    event:getPlayer():sendMessage("你好啊" .. event:getPlayer():getName())
end

function command.dispatch(args)
    -- args是一张表, 表里有三个参数, 分别是 isPlayer(bool), sender(发送指令的人), args(字符串数组)
    if (args.args[2] == "openInventory" and args.isPlayer) then
        local inv = luaBukkit.server:createInventory(NIL, 27, "我是你的第一个窗口~")
        args.sender:openInventory(inv)
        logger:info("执行完毕")
        return
    end

    echo = "回声: "
    for i, j in ipairs(args.args) do
        echo = echo .. j .. " "
    end

    args.sender:sendMessage(echo)
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
