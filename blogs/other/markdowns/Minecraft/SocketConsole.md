
这里有两个文件, 一个是: `SocketConsolePlugin`, 另外一个是: `SocketConsoleClient`, 其中前者为Minecraft Bukkit插件, 后者为网页端.

网页端是可选的, 如果不需要网页端可以查看底下的 [如果想用自己的客户端](#如果想用自己的客户端)


### 使用方法

插件直接丢进服务器的**plugins**文件夹即可    
启动完Minecraft的服务器后, 使用如下命令行即可启动套接字终端客户端

```
java -jar SocketConsoleClient-0.0.1-SNAPSHOT.jar
```
启动时会产生如下提示

```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.6.4)

2022-02-26 18:07:07.019  INFO 70981 --- [           main] t.s.s.SocketConsoleClientApplication     : Starting SocketConsoleClientApplication using Java 1.8.0_312 on miSkYle with PID 70981 (/home/miskyle/workspace/idea-space/SocketConsole/SocketConsoleClient/build/classes/java/main started by miskyle in /home/miskyle/workspace/idea-space/SocketConsole)
2022-02-26 18:07:07.021  INFO 70981 --- [           main] t.s.s.SocketConsoleClientApplication     : No active profile set, falling back to 1 default profile: "default"
2022-02-26 18:07:07.569  INFO 70981 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2022-02-26 18:07:07.574  INFO 70981 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2022-02-26 18:07:07.575  INFO 70981 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.58]
2022-02-26 18:07:07.611  INFO 70981 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2022-02-26 18:07:07.611  INFO 70981 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 563 ms
2022-02-26 18:07:07.787  INFO 70981 --- [           main] o.s.b.a.w.s.WelcomePageHandlerMapping    : Adding welcome page: class path resource [public/index.html]
2022-02-26 18:07:07.877  INFO 70981 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2022-02-26 18:07:07.883  INFO 70981 --- [           main] t.s.s.SocketConsoleClientApplication     : Started SocketConsoleClientApplication in 1.084 seconds (JVM running for 1.418)
```

之后使用ip以及提示消息中的端口号进行访问, 如上为 **8080** 端口, 在本地就可以使用浏览器访问 `http://127.0.0.1:8080` 进行操作.

#### 对于客户端, 你可以这样

##### Windows

```
.
├── SocketConsoleClient-0.0.1-SNAPSHOT.jar
└── start.bat
```

* start.bat 中的内容

```
java -jar SocketConsoleClient-0.0.1-SNAPSHOT.jar
```

##### Linux

```
.
├── SocketConsoleClient-0.0.1-SNAPSHOT.jar
└── start.sh
```

* start.sh 中的内容

```
java -jar SocketConsoleClient-0.0.1-SNAPSHOT.jar
```

### 配置

#### 插件配置

``` yaml
# 套接字控制台监听端口号
port: 16500
# 允许连到套接字控制台的ip白名单
white-list:
  - "127.0.0.1"
  - "localhost"
```

#### 套接字终端客户端配置

* SocketConsoleClient.jar/BOOT-INF/classes/application.properties

``` properties
#客户端网页绑定到的端口号
port=8080
```

* SocketConsoleClient.jar/BOOT-INF/classes/console-setting.json

``` json
{
  "host": "127.0.0.1", // ip
  "port": 16500,     // 与套接字终端插件配置中的port设定的数字相同
  "users": [
    {
      "username": "admin",      // 用户名
      "password": "admin"       // 密码
    },
    {
      "username": "admin2",      // 用户名
      "password": "admin2"       // 密码
    }
// 可以多个用户, 不过用户名需要不相同
  ]
}
```

### 如果想用自己的客户端

#### 1. 使用 `telnet` 指令

打开命令行, 输入如下指令即可连接(请确保你目前的插件配置允许你连接到终端):

```
telnet ip 端口
```

例子: 

```
❯ telnet 127.0.0.1 16500
Trying 127.0.0.1...
Connected to 127.0.0.1.
Escape character is '^]'.
[18:30:23] [Thread-5/INFO]: [SocketConsole] Remote connect: /127.0.0.1
```

之后只需要发送你想执行的指令后回车即可, 如执行`help`指令

```
❯ telnet 127.0.0.1 16500
Trying 127.0.0.1...
Connected to 127.0.0.1.
Escape character is '^]'.
[18:32:34] [Thread-5/INFO]: [SocketConsole] Remote connect: /127.0.0.1
help
[18:32:37] [Server thread/INFO]: [SocketConsole] dispatch command: help
[18:32:37] [Server thread/INFO]: --------- Help: Index ---------------------------
[18:32:37] [Server thread/INFO]: Use /help [n] to get page n of help.
***省略***
```

#### 2. 自己制作
使用套接字连接至插件, 发送以 `'\n'(换行符)` 为结尾的一句话至套接字即可发送指令  
而服务端会发送log给你.

下面是一个简单的例子: 

```
import java.io.*;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class SocketTest {

  public static void main(String[] args) throws IOException {
    Socket socket = new Socket("127.0.0.1", 16500);
    Scanner in = new Scanner(System.in);
    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream(), StandardCharsets.UTF_8));
    BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream(), StandardCharsets.UTF_8));

    new Thread(() -> {
      String str;
      try {
        while ((str = br.readLine()) != null) {
          System.out.println(str);
        }
      } catch (Exception e) {}
    }).start();

    String str;
    while (true) {
      str = in.nextLine();
      bw.write(str + "\n");
      bw.flush();
    }
  }
}

```