> 最后更新于2022年05月19日 | [历史记录](https://github.com/SmileYik/MyBlog/commits/master/blogs/other/markdowns/Minecraft/LuaInMinecraftBukkit/luaBukkit.md)

>此页面内容对应于LuaInMinecraftBukkit插件的最新版本(及以上版本)(**version: 1.4**), 历史文档可以插件此页面的历史记录

luaBukkit变量是一个全局变量, 它是一张表, 并且在每一个脚本被加载前就已经被准备好并注册进lua脚本环境中的全局变量中.

这张表中主要含有4个参数, 它的内容具体如下

|键|值|说明|
|-|-|-|
|~~pluginHelper~~|java实例对象的引用(弃用)|见helper|
|helper|java实例对象的引用|[LuaPluginHelper](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/luaplugin/util/LuaPluginHelper.java)|
|server|java实例对象的引用|可以用的方法有: [Server类文档](https://bukkit.windit.net/javadoc/org/bukkit/Server.html)|
|~~eventRegister~~|java实例对象的引用(弃用)|见event|
|event|java实例对象的引用|对事件进行管理[EventRegister](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/luaplugin/event/EventRegister.java)|
|~~commandRegister~~|java实例对象的引用(弃用)|见command|
|command|java实例对象的引用|对指令进行管理[CommandRegister](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/luaplugin/command/CommandRegister.java)|
|task|java实例对象的引用|[TaskRegister](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/luaplugin/task/TaskRegister.java)|

### plugin

详细内容方法见: [LuaPluginHelper](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/luaplugin/util/LuaPluginHelper.java)


### event

详细内容方法见: [EventRegister](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/luaplugin/event/EventRegister.java)

使用方法见: [注册监听器](https://blog.smileyik.tk/?blog=other&album=MinecraftPost&post=LuaInMinecraftBukkit-registEvent)

### command

详细内容方法见: [CommandRegister](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/luaplugin/command/CommandRegister.java)

使用方法见: [注册指令](https://blog.smileyik.tk/?blog=other&album=MinecraftPost&post=LuaInMinecraftBukkit-registCmd)

### task

详细内容方法见: [TaskRegister](https://github.com/SmileYik/LuaInMinecraftBukkt/blob/master/src/main/java/tk/smileyik/luainminecraftbukkit/luaplugin/task/TaskRegister.java)
