>最后更新于2022年05月17日 | [历史记录](https://github.com/SmileYik/MyBlog/commits/master/blogs/other/markdowns/Minecraft/LuaInMinecraftBukkit/config.yml.md)

>此页面内容对应于LuaInMinecraftBukkit插件的最新版本(**version: 1.4**), 历史文档可以插件此页面的历史记录

插件配置在 `/plugins/LuaInMinecraftBukkit/config.yml`

默认配置:

```yaml
# Hybrid: 混合模式
# Inside: 默认模式
# Outside: Native模式
run-mode: Hybrid
```

其中需要注意`Hybrid`, `Inside`, `Outside`都是首字母大写.

对于运行在MacOS上的Minecraft服务器是不能使用Native模式运行Lua脚本的.
