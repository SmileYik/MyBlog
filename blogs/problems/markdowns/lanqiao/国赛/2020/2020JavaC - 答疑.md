> 有 n 位同学同时找老师答疑。每位同学都预先估计了自己答疑的时间。

> 老师可以安排答疑的顺序，同学们要依次进入老师办公室答疑。 一位同学答疑的过程如下：

> 首先进入办公室，编号为 i 的同学需要 s 毫秒的时间。
> 然后同学问问题老师解答，编号为 i 的同学需要 a毫秒的时间。
> 答疑完成后，同学很高兴，会在课程群里面发一条消息，需要的时间可 以忽略。
> 最后同学收拾东西离开办公室，需要 e 毫秒的时间。一般需要 10 秒、20 > 秒或 30 秒，即 e 取值为 10000，20000 或 30000。
> 一位同学离开办公室后，紧接着下一位同学就可以进入办公室了。

> 答疑从 00 时刻开始。老师想合理的安排答疑的顺序，使得同学们在课程群 > 里面发消息的时刻之和最小。

> 输入描述
> 输入第一行包含一个整数 n，表示同学的数量。
> 接下来m行每一行都是s, a, e


> 输出描述
> 输出一个整数，表示同学们在课程群里面发消息的时刻之和最小是多少。

### 题解

因为要发送消息的时刻之和最小, 那么就让一套流程下来所花费时间小的学生先, 这样的话时间增加量也就小, 时间增加量小了时刻也就小了. 

什么是时刻, 分析输入输出示例(省略0):  
* 学生1: 1 1 1
* 学生2: 2 5 2
* 学生3: 3 2 3  
开始时记当前时刻为 0,
1. 从学生1进入到发送完消息后, 时间过了 1 + 1 = 2 个单位, 当前时刻为 0 + 2 = 2;
2. 从学生1离开到学生2发送完消息后, 时间过了 1 + 2 + 5 = 8 个单位, 当前时刻为 2 + 8 = 10;
3. 从学生2离开到学生3发送完消息后, 时间过了 2 + 3 + 2 = 7 个单位, 当前时刻为 10 + 7 = 17;  
从而按1~3顺序问答后时刻和为 2 + 10 + 17 = 29

按照同样的方法, 以学生1, 学生3 学生2的顺序进行的话 时刻和为 2 + 8 + 18 = 28.

不难发现如果从学生i发消息 到 学生i-1发消息间的时间越小, 时刻增加的越小, 时刻就越小.

```java
package problem1025;

import java.util.LinkedList;
import java.util.Scanner;

/**
 * description.
 * 因为要发送消息的时刻之和最小, 
 * 那么就让一套流程下来所花费时间小的学生先,
 * 这样的话时间增加量也就小,
 * 时间增加量小了时刻也就小了. 
 * 
 * <p>什么是时刻, 分析输入输出示例(省略0):
 * 学生1: 1 1 1
 * 学生2: 2 5 2
 * 学生3: 3 2 3
 * 开始时记当前时刻为 0,
 * 从学生1进入到发送完消息后, 时间过了 1 + 1 = 2 个单位, 当前时刻为 0 + 2 = 2;
 * 从学生1离开到学生2发送完消息后, 时间过了 1 + 2 + 5 = 8 个单位, 当前时刻为 2 + 8 = 10;
 * 从学生2离开到学生3发送完消息后, 时间过了 2 + 3 + 2 = 7 个单位, 当前时刻为 10 + 7 = 17;
 * 从而按1~3顺序问答后时刻和为 2 + 10 + 17 = 29
 * 按照同样的方法, 以学生1, 学生3 学生2的顺序进行的话 时刻和为 2 + 8 + 18 = 28.
 * 
 * <p>不难发现如果从学生i发消息 到 学生i-1发消息间的时间越小, 时刻增加的越小, 时刻就越小.
 *  

 * @author miSkYle
 *
 */
public class Main {
  private static class Student {
    long millS;
    long millA;
    long millE;
    
    /**
     * 初始化学生.

     * @param millS 进入办公室时间.
     * @param millA 答疑时间.
     * @param millE 离开办公室时间.
     */
    public Student(long millS, long millA, long millE) {
      super();
      this.millS = millS;
      this.millA = millA;
      this.millE = millE;
    }
  }
  
  /**
   * run.

   * @param args args
   */
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    LinkedList<Student> list = new LinkedList<>();
    final int n = in.nextInt();
    for (int i = 0; i < n; ++i) {
      list.add(new Student(
          in.nextLong(), 
          in.nextLong(), 
          in.nextLong()
      ));
    }
    in.close();
    
    // 学生花费总时间排序 (升序)
    list.sort((a, b) -> {
      return (int) Math.signum(
          a.millA + a.millE + a.millS 
        - b.millA - b.millE - b.millS
      );
    });
    
    // 记录当前时刻
    long tick = list.peek().millA + list.peek().millS;
    // 记录时刻和
    long allTick = tick;
    while (!list.isEmpty()) {
      Student stu = list.poll();
      if (list.isEmpty()) {
        break;
      }
      tick += list.peek().millA + list.peek().millS + stu.millE;
      allTick += tick;
    }
    System.out.println(allTick);
  }
}
```