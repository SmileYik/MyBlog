
#### R1. 假定网路层提供了下列服务。在源主机中的网络层接受最大长度1200字节和来自运输层的目的主机地址的报文段。网络层则保证将该报文段交付给位于目的主机的运输层。假定在目的主机上能够运行许多网络应用进程。

##### a. 设计可能最简单的运输层协议，该协议将使应用程序数据到达位于目的主机的所希望的进程。假设在目的主机中的操作系统已经为每个运行的应用进程分配了一个4字节的端口号。

在即将发送的数据中在头部添加长度为4字节的首部, 这4个字节用来储存目的主机网络程序的端口号, 其余1196字节用来储存应用数据.

##### b.修改这个协议，使它向目的进程提供一个的 “返回地址”。

在a的基础上, 在头部再划分4个字节用来储存源主机网络应用程序的端口号, 即在首部划分8个字节, 前四个字节储存源主机网络应用程序端口号, 后四个字节储存目的主机网络应用程序端口号, 其余1192字节用来储存应用数据.

##### c. 在你的协议中，该运输层在计算机网络的核心中“ 必须做任何事”吗?

不需要. 它仅需要保证数据能够交付给网络曾即可.

#### R2. 考虑有一个星球，每个人都属于某个六口之家，每个家庭都住在自己的房子里，每个房子都一个唯一的地址， 并且某给定家庭中的每个人有一个独特的名字。假定该星球有一个从源家庭到目的家庭交付信件的邮政服务。该邮件服务要求:①在一 个信封中有一封信;②在信封上清楚地写上目的家庭的地址(并且没有别的东西)。假设每个家庭有一名家庭 成员代表为家庭中的其他成员收集和分发信件。这些信没有必要提供任何有关信的接收者的指示。 

##### a. 使用对上面复习题R1的解决方案作为启发，描述家庭成员代表能够使用的协议，以从发送家庭成员向接收家庭成员交付信件。

发送家庭在编写完主要邮件内容后, 将邮件内容套入一个写上目的家庭地址的信封中发送出去; 接收家庭成员取到信件后拿回家.

##### b.在你的协议中，该邮政服务必须打开信封并检查信件内容才能提供它的服务吗?

否, 邮政服务可以直接查看信封即可知道这封信是要送往哪个家庭的, 因为在信封上写了目的家庭的地址信息.

#### R3.考虑在主机A和主机B之间有一条TCP连接。假设从主机A传送到主机B的TCP报文段具有源端口号x和目的端口号y。对于从主机B传送到主机A的报文段，源端口号和目的端口号分别是多少?

既然是主机B传送到主机A的报文段, 那么源端口号为主机B上网络应用的端口号y, 而目的端口号为主机A上的网络应用端口号x.

#### R4.描述应用程序开发者为什么可能选择在UDP上运行应用程序而不是在TCP上运行的原因.

因为UDP仅提供必要的服务, 在使用UDP服务时并不需要先向目的主机建立连接从而没有建立连接时所产生的时延, 并且没有拥塞控制, UDP数据报能够以尽可能快的速度传输. 总的来说, UDP 关于发送什么数据以及何时发送的应用层控制更为精细. 它不需要建立连接并且没有连接状态, 同时相较于TCP协议来说, UDP协议首部报文开销仅有8字节, 分组首部开销小.

#### R5.在今天的因特网中，为什么语音和图像流量常常是经过TCP而不是经UDP发送。(提示:我们寻找的答案与TCP的拥塞控制机制没有关系。)

UDP协议并不保证目的主机能够接收到数据, 并且每个报文都是以无序情况下接收的. 尽管语音和图像可以容忍部分的数据丢失, 但是这是在接收到的数据在有序的情况下成立的.

#### R6.当某应用程序运行在UDP上时，该应用程序可能得到可靠数据传输吗?如果能，如何实现?

能够实现, 用于谷歌的Chrome浏览器中的QUIC协议将UDP作为其支撑运输协议并在UDP之上的应用层协议中实现可靠性.

#### R7.假定在主机C上的一个进程有一个具有端口号6789的UDP套接字。假定主机A和主机B都用目的端口号6789向主机C发送一个UDP报文段。这两台主机的这些报文段在主机C都被描述为相同的套接字吗?如果是这样的话，在主机C的该进程将怎样知道源于两台不同主机的这两个报文段?

是, 通过源主机端口及ip地址来区分两台不同主机所发出的两个报文段.

#### R8.假定在主机C端口80上运行的一个Web服务器。假定这个Web服务器使用持续连接，并且正在接收来自两台不同主机A和B的请求。被发送的所有请求都通过位于主机C的相同套接字吗?如果它们通过不同的套接字传递，这两个套接字都具有端口80吗?讨论和解释之。

在接收请求过程中是同一个套接字, 如果开始建立连接那么将创建一个新的套接字去发起连接. 这个新的套接字不会具有端口80. 因为端口80已经绑定了一个套接字去处理TCP连接请求.

#### R9.在我们的rdt协议中，为什么需要引入序号?
 
因为如果一个NAK或者ACK分组受损, 发送方无法确定接收方是否正确的接收了上一次发送的分组. 就算是重发上一次所发送的分组, 接收方也不清楚这次的分组是否为冗余分组, 还是新的分组.

####  R10.在我们的rdt 协议中，为什么需要引入定时器?

因为如果发送方发送的分组丢失或其他原因不能到达接收方或者是接收方受到了数据但是接收方发送的ACK或NAK无法到达发送方, 这时, 发送方就无法确认接收方是否是正常接收到了分组还是没有, 从而陷入一直等待. 定时器就是为了防止这个情况出现, 在发送了分组的一段时间内如果没有收到ACK则重传上一次发送的分组.

#### R11.假定发送方和接收方之间的往返时延是固定的并且为发送方所知。假设分组能够丢失的话，在协议rdt3.0中，一个定时器仍是必需的吗?试解释之。

不是必须的, 如果知道固定的往返时延则可以计算出每个分组发送的时间点, 并且在这个时间点时判断对方是否接收成功以进行重发或发送下一个分组.

#### R12.在配套网站上使用Go- Back-N (回退N步) Java 小程序。

网站进不去.

#### R13.重复复习题R12，但是现在使用Selective Repeat ( 选择重传) Java 小程序。选择重传和回退N步有什么不同?

网站进不去emm

#### R14.是非判断题:  
##### a. 主机A经过一条TCP连接向主机B发送一个大文件。假设主机B没有数据发往主机A。因为主机B不能随数据捎带确认，所以主机B将不向主机A发送确认。

错. 需要发送确认.

##### b. 在连接的整个过程中，TCP的rwnd的长度决不会变化。  

错. rwnd会实时变化.

##### c. 假设主机A通过-条TCP连接向主机B发送一个大文件。主机A发送但未被确认的字节数不会超过接收缓存的大小。

对. 

##### d.假设主机A通过一条TCP连接向主机B发送一个大文件。如果对于这条连接的一个报文段的序号为m,则对于后继报文段的序号将必然是m+1。  

错. m+MSS.

##### e. TCP报文段在它的首部中有一个rwnd字段。

错. 其在接收窗口字段中, 没有独立出来.

##### f. 假定在一条TCP连接中最后的SampleRTT等于1秒，那么对于该连接的TimeoutInterval 的当前值必定大于等于1秒。

对. 因为TimeoutInterval的初始值为1, 当出现丢包时, 这个值只会增长而不会减小以增加等待时间.

##### g. 假设主机A通过一条TCP连接向主机B发送一个序号为38的4个字节的报文段。在这个相同的报文段中，确认号必定是42。

错. 确认号是接收方期望接收方发送的序号.

#### R15.假设主机A通过一条TCP连接向主机B发送两个紧挨着的TCP报文段. 第一个报文段的序号为90, 第二个报文段序号为110.

##### a. 第一个报文段中有多少数据?

110 - 90 = 20 bit

##### b. 假设第一个报文段丢失而第二个报文段到达主机B. 那么在主机B发往主机A的确认报文中, 确认号应该是多少?

90.

#### R16.考虑在3.5节中讨论的Telnet的例子。在用户键入字符C数秒之后，用户又键入字符R。那么在用户键入字符R之后，总共发送了多少个报文段，这些报文段中的序号和确认字段应该填入什么?

1. 用户键入'C': Seq=42, ACK=79, data='C'  
2. 主机确认收到'C'并回显: Seq=79, ACK=43, data='C'
3. 主机确认收到回显'C': Seq=43, ACK=80
4. 用户输入'R': Seq=44, ACK=81, data='R'
5. 主机确认收到'R'并回显: Seq=81, ACK=44, data='R'
6. 主机确认收到回显'C': Seq=44, ACK=82

#### R17.假设两条TCP连接存在于一个带宽为R bps的瓶颈链路上。它们都要发送一个很大的文件(以相同方向经过瓶颈链路)，并且两者是同时开始发送文件。那么TCP将为每条连接分配什么样的传输速率? 

$\frac{R}{2}$ ~ $R$

#### R18.是非判断题。考虑TCP的拥塞控制。当发送方定时器超时时，其ssthresh的值将被设置为原来值的一半。

错, 其为cwnd的一半.

#### R19.在3.7 节的“TCP 分岔”讨论中，对于TCP分岔的响应时间，断言大约是4*$RTT_{FE}$ +$RTT_{BE}$ +处理时间。评价该断言。

可行, 前端与后端分离, 让前端尽可能的离用户近, 那么就访问三个TCP窗口而言则用户和前端只要建立连接的RTT+三个窗口的RTT, 而前端到后端只需要一个RTT.