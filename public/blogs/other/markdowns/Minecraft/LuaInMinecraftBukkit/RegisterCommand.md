这一节是来谈谈如何注册一个指令的.

注册指令的方法为:

```lua
luaBukkit.commandRegister:registerCommand(arg1, arg2)
```

其中第一个参数(arg1)为要注册的指令, 第二个参数(arg2)是来告诉插件当输入注册的指令后使用参数2对应的函数去处理. 具体输入的值为一个字符串, 格式为`<脚本插件ID>.[模块名.]<函数名>`

就在**快速开始**这一节内容中, 里面使用了如下语句去注册了一个指令

```lua
command = {}

... 省略

luaBukkit.commandRegister:registerCommand(
    "test", "MyLuaPlugin.command.dispatch"
)

... 省略

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
```

这时候只要输入指令`/luap test`时, 无论后面的指令参数是什么样子, 之后的所有操作都会全权交给这个插件的`command.dispatch`函数处理.

在处理时会给函数传入一张表, 表的结构如下

|键|值|说明|
|-|-|-|
|isPlayer|true/false|表示发送指令的是玩家还是终端|
|sender|发送指令的实体对象|你在Java中怎么用它方法你就可以怎么用它方法([文档](https://bukkit.windit.net/javadoc/org/bukkit/command/CommandSender.html))|
|args|字符串表|表中第一个字符串为注册时绑定的指令(绑定时传入的参数一)|
