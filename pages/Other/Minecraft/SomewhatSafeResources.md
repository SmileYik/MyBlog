此插件在使用过程中**需要**在**客户端**上安装一个**Mod**,  
并且Mod版本与服务端所使用的插件的版本**需要对应**.  

本插件与本Mod有类似的命名规则, 例如
```
Spigot-1.12.2-SomewhatSafeResources-1.2-SNAPSHOT.jar
```
* **Spigot**: 适用于Bukkit, Spigot, Paper及其衍生服务端.
* **1.12.2**: 适用于Minecraft 1.12.2版本的服务端
* **SomewhatSafeResources**: 本作品名
* **1.2**: 本作品目前的版本号

### Mod

对于Mod, 不同版本Minecraft需要使用相对应版本的Mod.  
仅需要将对应版本Mod放入mods文件夹即可.

### 插件

#### 权限

##### SomewhatSafeResources.Admin

插件的总权限, 默认op拥有.

#### 指令

##### /ssres reload

重载插件的配置文件

#####  /ssres encrypt [文件名]

对资源包文件进行加密

#### 用法

把要加密的资源包文件放入插件配置文件夹下,
即/plugins/SomewhatSafeResources文件夹下,
并且要加密的资源包文件名不能含有空格,
使用指令ssres encrypt [加密资源文件],
即可对文件夹下的文件进行加密, 并且生成两
个encrypted打头的文件, .txt后缀的则为生成
的秘钥, 非.txt后缀的则为加密后的文件.
打开插件的config.yml文件, 根据提示修改对
应参数.

#### 例子

例如我把一个名为"a.zip"文件放入插件的文件夹下,
执行如下指令

```
[00:45:18 INFO]: =================SomewhatSafeResources=================
[00:45:18 INFO]: /ssres reload          -   重载插件配置
[00:45:18 INFO]: /ssres encrypt [file]  -   对配置文件夹下制定文件进行加密
[00:45:18 INFO]: =======================================================
ssres encrypt a.zip
[00:58:04 INFO]: 加密秘钥为: NnKXQS7DYePZxCpocXW6TQ==
```

之后在配置文件夹下产生两个文件
```
encrypted.a.zip: 被加密的文件
encrypted.a.zip.txt: 加密的秘钥
```

将文件`encrypted.a.zip`修改为你想要的文件名, 例如 `abc.zip`
则配置文件中将以下配置改成:
``` yaml
# 秘钥, 插件加密文件生成的那一串文本
key: "NnKXQS7DYePZxCpocXW6TQ=="
# 资源包的名字, 即mod会在资源包文件夹下搜索指定名字的资源包
file-name: "abc.zip"
```
最后, 把`abc.zip`文件放入游戏客户端的资源包文件夹即可

#### 配置文件

``` yaml
# 秘钥, 插件加密文件生成的那一串文本
key: xxxxxx
# 当玩家加入服务器后延迟多少秒加载资源包.
# 单位为tick, 1秒等于20tick
delay: 10
# 资源包的名字, 即mod会在资源包文件夹下搜索指定名字的资源包
file-name: "resource pack.zip"
# 当玩家缺失资源包时是否将玩家踢出
when-resource-pack-missing:
  kick: true
  message: "没有找到对应的资源包文件"
# 当玩家客户端无响应时是否将玩家踢出
when-client-not-reply:
  kick: true
  message: "认证超时"
# 当玩家客户端解码失败时是否将玩家踢出
when-decode-failed:
  kick: true
  message: "资源包认证失败"
# 重试次数.
# 这里建议重试次数低一点, 降低客户端总是加载资源包的情况的记录
retry-times: 0
# 隔多久重试.
# 单位为tick, 1秒等于20tick
# 这里建议重试时间尽量长一点, 给足客户端回应的时间,
# 否则容易发生客户端一直加载资源包的情况
retry-times-delay: 20
```
