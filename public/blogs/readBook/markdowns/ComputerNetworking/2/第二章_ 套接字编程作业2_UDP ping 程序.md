这道题给了服务端, 要我们依据服务端写出客户端. 还是挺好玩的, 题目看这里: [Socket2_UDPpinger.pdf](https://github.com/moranzcw/Computer-Networking-A-Top-Down-Approach-NOTES/blob/master/SocketProgrammingAssignment/%E4%BD%9C%E4%B8%9A2-UDPping%E7%A8%8B%E5%BA%8F/Socket2_UDPpinger.pdf)

#### 服务端代码  
```python
# UDPPingerServer.py
# We will need the following module to generate randomized lost packets import random
from socket import *
import random

# Create a UDP socket
# Notice the use of SOCK_DGRAM for UDP packets
serverSocket = socket(AF_INET, SOCK_DGRAM)
# Assign IP address and port number to socket
serverSocket.bind(('', 12000))

while True:
    # Generate random number in the range of 0 to 10
    rand = random.randint(0, 10)
    # Receive the client packet along with the address it is coming from
    message, address = serverSocket.recvfrom(1024)
    # Capitalize the message from the client
    message = message.upper()
    # If rand is less is than 4, we consider the packet lost and do not respond
    if rand < 4:
        continue
    # Otherwise, the server responds
    serverSocket.sendto(message, address)
```
#### 客户端代码  
``` python
from socket import *
import time

serverHost = '127.0.0.1'
serverPort = 12000
pingText = "ping"
pingByte = len(pingText.encode())
clientSocket = socket(AF_INET, SOCK_DGRAM)
clientSocket.settimeout(1)
for i in range(10):
    try:
        time1 = int(round(time.time() * 1000))
        clientSocket.sendto(pingText.encode(), (serverHost, serverPort))
        message, addr = clientSocket.recvfrom(1024)
        ms = int(round(time.time() * 1000)) - time1
        print("来自 %s 的回复: 字节=%d 时间=%dms" % (addr[0], pingByte, ms))
    except:
        print("请求超时.")
```

#### 运行效果如下
![](./blogs/readBook/markdowns/ComputerNetworking/2/pics/2-2.1.png)
