unit 文件存放在 `usr/lib/systemd/system` 路径下, 一般以 `*.service` 文件命名.  
下面是一个关机启动的例子:

```
[Unit]
Description=Enable NVIDIA card when poweroff
DefaultDependencies=no

[Service]
Type=oneshot
ExecStart=/bin/sh -c 'echo ON > /proc/acpi/bbswitch'

[Install]
WantedBy=shutdown.target
```

#### [Unit]  

其中`[Unit]`区块下可用以下选项, 主要是当前 Unit (和其他 Unit) 的关系:
```
Description: 描述
Documentation: 文档地址
Requires: 当前 Unit 依赖的其他 Unit 名, 如果依赖的没有运行, 则当前 Unit 会运行失败
Wants: 类似于 Requires, 但是如果其他没有运行, 这个也依旧会运行.
BindsTo: 类似于 Requires, 如果指定的 Unit 中途退出则此 Unit 也会停止运行
Before: 其他 Unit 名, 在指定 Unit 启动之前再启动
After: 其他 Unit 名, 在指定 Unit 启动完成之后再启动
Conflicts: 其他 Unit 名, 如果指定 Unit 启动则此 Unit 不启动.
Condition: 当前 Unit 运行必须满足的条件, 没满足则不会运行.
Assert: 当前 Unit 运行必须满足的条件, 没满足则启动失败
```

#### [Install]

其用来定义此单元如何启动, 和怎么启动, 可用的字段如下:  
```
WantedBy: 其值为一个或者多个 Target, 当前 Unit 启用时, 符号链接会放入 /etc/systemd/system 目录下, 以 Target 名 + .wants 后缀构成的子目录中.
RequireBy: 它的值是一个或多个 Target, 会放入同上但后缀为 .required 的子目录中.
Alias: 当前 Unit 可用于启动的别名
Also: 当前 Unit 启用时, 会被同时启用的其他 Unit
```

#### [Service]

其主要的字段如下:

```
Type: 定义启动时的进程行为, 其值如下:
      simple: 默认值, 执行ExecStart指定的命令, 启动主进程
      forking: 以 fork 方式创建一个子进程, 其后父进程会退出
      oneshot: 一次性进程, Systemd 会等待当前服务推出再往下执行其他服务.
      dbus: 当前服务通过 D-Bus 启动
      notify: 当前服务启动完毕, 会通知 Systemd, 然后再往下执行
      idle: 若有其他任务执行完毕当前服务才会运行.
ExecStart: 当前服务启动时执行的命令
ExecStartPre: 启动当前服务之前执行的命令
ExecStartPost: 启动当前服务之后执行的命令
ExecReload: 重启当前服务时要执行的命令
ExecStop: 停止当前服务时要执行的命令
ExecStopPost: 停止当前服务之后要执行的命令
RestartSec: 自动重启当前服务间隔的秒数
Restart: 定义何种情况 Systemd 会自动重启当前的服务, 可能的值包括
         always
         on-success
         on-failure
         on-abnormal
         on-abort
         on-watchdog
TimeoutSec: 定义 Systemd 停止当前服务之前等待的秒数
Environment: 指定的环境变量
```

#### Target

所有 target 可用如下指令查看 `systemctl list-unit-files --type=target`

* `poweroff.target` 关闭系统
* `rescue.target` 单用户模式
* `multi-user.target` 多用户
  * `graphical.target` 图形用户
* `reboot.target` 重启
* `emergency.target` 急救模式
* `shutdown.target` 关闭计算机
