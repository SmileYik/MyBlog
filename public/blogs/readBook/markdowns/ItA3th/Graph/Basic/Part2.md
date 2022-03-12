### 22_2_3

当为Gray时, 此结点将会放入队列, 当这个结点从队列中出队时, 此结点的颜色将会从Gray变为Black, 而此时这个结点的颜色不为白色, 那么就不会再次入对, 而出队后结点颜色从Gray变为Black时, Black这个值并未涉及之后的任何操作, 而只对于Gray与White有关, 所以可以用一个位来储存结点的颜色.

### 22_2_4
matrix 为图 G=(V, E) 的邻接矩阵, vex 为图G 的点集, vexIndex 为开始的点的下标. 其中用 **$vex_i.d$** 代表第i个点的距离, -1代表不可达, **$vex_i.p$** 代表第i个点的父节点, **$vex_i.checked$** 代表这个结点是否被发现.

时间复杂度为 **θ($V^2$)**


```
BFS-MATRIX(matrix, vex, vexIndex)
  len = vex.length
  for i = 1 to len
    vex[i].d = -1
    vex[i].p = NIL
    vex[i].checked = false
  Q = Ø
  vex[vexIndex].d = 0
  ENQUEUE(Q, vexIndex)
  while Q != Ø
    vexIndex = DEQUEUE(Q)
    for i = 1 to len
      if matrix[vexIndex][i] == 1 and vex[i].checked == false
        ENQUEUE(Q, i)
        vex[i].checked = true
        vex[i].p = vex[vexIndex]
        vex[i].d = vex[vexIndex].d + 1
```

java代码实现如下:
```java
package part.six.graph.bfs;

import java.util.LinkedList;
import java.util.List;

public class e2_4 {
  public static void main(String[] args) {
    int[][] matrix = {
            {0, 1, 0, 0, 1, 0, 0, 0},
            {1, 0, 0, 0, 0, 1, 0, 0},
            {0, 0, 0, 1, 0, 1, 1, 0},
            {0, 0, 1, 0, 0, 0, 1, 1},
            {1, 0, 0, 0, 0, 0, 0, 0},
            {0, 1, 1, 0, 0, 0, 1, 0},
            {0, 0, 1, 1, 0, 1, 0, 1},
            {0, 0, 0, 1, 0, 0, 1, 0}
    };
    char[] vex = "rstuvwxy".toCharArray();
    System.out.println(bfsMatrix(matrix, vex, 1));
  }

  public static List<Character> bfsMatrix(int[][] matrix, char[] vex, int startIndex) {
    boolean[] checked = new boolean[matrix.length];
    LinkedList<Integer> queue = new LinkedList<>();
    LinkedList<Character> list = new LinkedList<>();
    queue.add(startIndex);
    checked[startIndex] = true;
    while (!queue.isEmpty()) {
      startIndex = queue.removeFirst();
      list.add(vex[startIndex]);
      for (int i = 0; i < matrix.length; ++i) {
        if (matrix[startIndex][i] == 1 && !checked[i]) {
          queue.add(i);
          checked[i] = true;
        }
      }
    }
    return list;
  }
}
```

### 22_2_5

因为图的邻接链表为链表形式存储, 那么以图22-3为例子, 其的邻接链表如下形式:
```
r->v->s
s->r->w
t->w->x->u
u->t->x->y
v->r
w->s->t->x
x->w->t->u->y
y->x->u
```

广度优先搜索先将初始顶点出度的顶点加入队列中, 而在邻接链表中, 顶点指向的点就为出度到的点, 因为链表不具有随机读取的能力, 那么就得从头开始一个一个加入队列中, 先加入队列的结点则在下一次寻找邻接顶点时越先寻找, 那么就以以上邻接链表的r开始, 首先入队的为`v`, 然后是`s`, 这时候队列中具有2个元素, 下一步将首先入队的元素出队, 即 `v` 先出队,然后搜寻它的邻接的结点, 但是如果为`r->s->v`, 那么将先搜索`s`周围相邻接的结点.
