这里记录着我目前在Manjaro上游玩游戏时的动手操作笔记, 以防我以后要游玩时忘记.

### Steam 平台

在Steam平台游玩游戏时要简单很多, 仅仅需要将Steam设置中的**SteamPlay**栏目下的**为支持的产品启用 Steam Play**后, 直接运行游戏就好了. 但依旧有一些游戏需要特别处理.

steam在利用proton启动游戏时, 会在此游戏的游戏库里的 `compatdata` 文件夹里创建以该游戏id命名的文件夹.

#### The Elder Scrolls V: Skyrim Special Edition(AE)

##### 启动游戏

可以直接在Steam库中启动, 但是会带来一些问题. 例如NPC都成了哑巴. 解决这一个问题可以使用如下方法:

1. 使用winetricks安装xact, 安装指令: `WINEPREFIX='....../compatdata/489830/pfx' winetricks --force xact`
2. 配置Wine容器配置, 打开该容器Wine设置后, 在函数库选项卡下新增**xaudio2_6**与**xaudio2_7**, 并将这两个改为**内建**或者**Native**
3. 进入[Kron4ek的FAudio-Builds](https://github.com/Kron4ek/FAudio-Builds/releases)的Releases页面下载最新的发布, 解压后进入**wine_setup_faudio.sh**文件所在文件夹, 在此文件夹路径内打开终端, 输入指令安装FAudio进此游戏容器目录中: `WINEPREFIX='....../compatdata/489830/pfx'  bash wine_setup_faudio.sh`
4. 控制台输入`sudo pacman -S faudio`安装FAudio
5. 游戏启动选项加入`WINEDLLOVERRIDES="xaudio2_7=n,b" PULSE_LATENCY_MSEC=90 VK_ICD_FILENAMES="/usr/share/vulkan/icd.d/nvidia_icd.json" gamemoderun %command%`

##### 安装mod

之后再写

#### Assassin's Cread Unity

1. 启动游戏前, 在游戏属性页面锁定Steam Play兼容性工具为**Proton 6.3-8**, 之后启动一次游戏, 等待`compatdata`目录创建完毕
2. 前往[Ubisoft Connect](https://ubisoftconnect.com/)下载最新的Ubisoft客户端安装文件.
3. 在控制台输入指令`protontricks -c "wine '~/UplayInstaller.exe' " 289650`, 其中`'~/UplayInstaller.exe'`是你在步骤2中下载的Ubisoft客户端安装文件的路径. 之后安装好后关闭即可
4. 正常打开游戏后会弹出登陆窗口, 登陆完毕即可.

#### Grand Theft Auto San Andreas

1.  启动游戏前, 在游戏属性页面锁定Steam Play兼容性工具为**Proton 4.2-9**,