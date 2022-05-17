>最后更新于2022年05月17日 | [历史记录](https://github.com/SmileYik/MyBlog/commits/master/blogs/other/markdowns/Minecraft/LuaInMinecraftBukkit/lua_plugin.yml.md)

>此页面内容对应于LuaInMinecraftBukkit插件的最新版本(**version: 1.4**), 历史文档可以插件此页面的历史记录

lua_plugin.yml 是用来记录脚本插件的元数据的一个文件.

配置模板:

```yaml
# 展示用的名字
displayName: 展示用的名字
# 脚本插件id, 建议插件id与目录名保持一致, 并且只使用26个英文字母以及_组成
id: luapluginid
# 作者
author: author
# 脚本版本
version: version
# 强制依赖插件, 是一个列表
# 其中列表里是其他依赖脚本插件的脚本插件id
dependents: []
# 非强制依赖插件, 是一个列表
# 其中列表里是其他依赖脚本插件的脚本插件id
softDependents: []
# 模式有两种, 在填写过程中注意首字母大写
# 一种是 Inside(默认模式)
# 另外一种是 Outside(Native模式)
# 此选项仅在config.yml中run-mode为Hybrid时有效
mode: Inside
```
