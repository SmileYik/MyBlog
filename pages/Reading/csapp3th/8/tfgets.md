这里是在做csapp3th中, 第八章课外系统8.25遇到的, 原题大致如下:  
> 编写一个fgets的5秒钟内输入版本的tfgets, 如果5秒钟内用户没有输入数据, 则返回NULL, 其余行为与fgets一样.

在这里引入**非本地跳转**方法.
```
#include <setjmp.h>

int setjmp(jmp_buf env);
int sigsetjmp(jmp_buf env, int savesigs);

void longjmp(jmp_buf env, int retval);
void siglongjmp(jmp_buf env, int retval);
```

其中`set`类都大致为保存当前调用环境, 而`long`类则返回上一次使用`set`时候的位置, 并从缓冲区中加载调用环境. 但是`sigsetjmp`与`setjmp`最大的区别就是`sigsetjmp`可以被信号处理程序使用**(即在用`signal(int, sighandler_t)`绑定的处理函数中可以正常使用)** 而`setjmp`不能.

所以因为这道题是要在5秒内获取输入, 超过5秒后返回NULL值. 这里要用到如下函数:  
```
#include <unistd.h>
// 当secs为0时取消所有预定闹钟,
// 其余情况下在指定时间过后给自己一个SIGALRM信号.
unsigned int alarm(unsigned int secs);
```

用这个函数能够在指定时间后向自己发送一个**SIGALRM**信号, 我们就可以通过**signal**函数来捕获这个信号, 捕获完后利用非本地跳转方式提醒自己已经超时了, 而这个跳转是在处理**SIGALRM**信号方法里的, 所以我们得选择**sigsetjmp**这个方式. 所以这道题的解法就如下所示:  
```
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <setjmp.h>

#define MAX_LENGTH 1024
#define TIMEOUT    1
#define TIME       5

static sigjmp_buf env;

void tfgets_handler(int sign) {
  siglongjmp(env, TIMEOUT);
}

char* tfgets(char* str, int size, FILE* stream) {
  if (signal(SIGALRM, tfgets_handler) == SIG_ERR) {
    return NULL;
  }
  if (sigsetjmp(env, 5) != TIMEOUT) {
    alarm(TIME);
    return fgets(str, size, stream);
  }
  return NULL;
}

int main() {
  char buf[MAX_LENGTH];
  while (1) {
    if (tfgets(buf, MAX_LENGTH, stdin) != NULL) {
      printf("echo: %s", buf);
    } else {
      printf("时间到啦emm, 下一次要记得在5秒内输入哦~\n");
    }
  }
  return 0;
}
```

运行结果如下:   
```
❯ cd /home/miskyle/workspace/clearn/csapp3th/8
❯ gcc tfgetsecho.c -o tfgetsecho.out
❯ ./tfgetsecho.out
时间到啦emm, 下一次要记得在5秒内输入哦~
时间到啦emm, 下一次要记得在5秒内输入哦~
abc
echo: abc
aaa
echo: aaa
ccc
echo: ccc
时间到啦emm, 下一次要记得在5秒内输入哦~
^C
❯
```
