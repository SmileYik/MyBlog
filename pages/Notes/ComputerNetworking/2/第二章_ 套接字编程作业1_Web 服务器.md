题目看这里: [Socket1_WebServer.pdf](https://github.com/moranzcw/Computer-Networking-A-Top-Down-Approach-NOTES/blob/master/SocketProgrammingAssignment/%E4%BD%9C%E4%B8%9A1-Web%E6%9C%8D%E5%8A%A1%E5%99%A8/Socket1_WebServer.pdf)

### 第一个版本  
简单实现基本功能, 缺陷就是一次只能处理一个.
``` python
# import socket module
from socket import *
port = 16501
serverSocket = socket(AF_INET, SOCK_STREAM)
# Prepare a sever socket
# Fill in start
serverSocket.bind(('', port))
serverSocket.listen(1)
# Fill in end
while True:
    # Establish the connection
    print('Ready to serve...')
    connectionSocket, addr = serverSocket.accept()  # Fill in start  #Fill in end
    try:
        message = connectionSocket.recv(2048).decode()  # Fill in start  #Fill in end
        filename = message.split()[1]
        f = open(filename[1:])
        outputdata = f.read()

        # Send Header
        header = ("HTTP/1.1 200 OK\n" +
                  "Connection: close\n" +
                  "Server: Kiss~\n" +
                  "Content-Type: text/html\n\n")
        connectionSocket.send(header.encode())

        # Send the content of the requested file to the client
        connectionSocket.send(outputdata.encode())
        connectionSocket.close()
    except IOError:
        # Send response message for file not found
        # Fill in start
        connectionSocket.send("HTTP/1.1 404 Not Found".encode())
        # Fill in end

        # Close client socket
        # Fill in start
        connectionSocket.close()
        # Fill in end
serverSocket.close()
```
### 第二个版本  
在这个版本中, 可以在同一个时间段被多次请求.
``` python
# import socket module
from socket import *
import _thread

port = 16501
serverSocket = socket(AF_INET, SOCK_STREAM)
serverSocket.bind(('', port))
serverSocket.listen(1)


def send(connectionSocket, addr):
    try:
        print("Ready to serve... target: " + str(addr[0]) + ":" + str(addr[1]))
        message = connectionSocket.recv(2048).decode()
        filename = message.split()[1]
        f = open(filename[1:])
        outputdata = f.read()
        outputdata = outputdata.encode()
        header = ("HTTP/1.1 200 OK\n" +
                  "Connection: close\n" +
                  "Server: Kiss~\n" +
                  "Content-Length: %d\n" % len(outputdata) +
                  "Content-Type: text/html\n\n")
        # Send header.
        connectionSocket.send(header.encode())
        # Send contents.
        connectionSocket.send(outputdata)
        connectionSocket.close()
    except IOError:
        connectionSocket.send("HTTP/1.1 404 Not Found".encode())
        connectionSocket.close()


def main():
    while True:
        # Start new thread.
        _thread.start_new_thread(send, (serverSocket.accept()))
    serverSocket.close()


main()
```

### 客户端实现  
```python
from socket import *
import re
import sys

serverHost = sys.argv[1]
serverPort = int(sys.argv[2])
clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((serverHost, serverPort))
# 制作HTTP请求报文
header = 'GET /' + sys.argv[3] + ' HTTP/1.1\n' \
                         'Connection: close\n' \
                         'User-agent: I wanna a kiss!\n'

clientSocket.send(header.encode())
response = clientSocket.recv(2048).decode()
# 获取返回内容字节数
bufferSize = 2048
headerList = response.split('\n')
for line in headerList:
    if re.match(r'Content-Length', line):
        bufferSize = int(re.sub('\\D', "", line))
        break
contents = clientSocket.recv(bufferSize).decode()
print(response, end='')
print(contents)
```

### 使用效果 
![](./pages/Notes/ComputerNetworking/2/pics/2-1.1.png)  
![](./pages/Notes/ComputerNetworking/2/pics/2-1.2.png)  