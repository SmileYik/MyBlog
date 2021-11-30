### 22_1_1  

假设为图 G=(V, E) 的邻接链表, 则至少需要 **θ(V+E)** 计算每个节点的出度,
至少需要 **θ(V+E)** 计算出每个节点的入度.

根据邻接链表可以知道, 每个链表中的节点都是对应下标所代表元素所指向的元素节点,
那么这个链表的长度就是这个下标代表元素的出度.  
```
OUT-DEGREE(linkedlists)
  len = linkedlists.length;
  let out-degree[1...len] be a new array
  for i = 1 to len
    for each node ∈ linkedlists[i] // 下标对应链表中的所有节点.
      out-degree[i] += 1
  return out-degree
```

从上面可以知道链表中的元素都是下标对应节点到该元素的路径, 那么链表中的节点被指向一次那么这个节点所代表的元素的入度数加一, 即一个顶点在链表中出现多少次, 那么它的入度就为多少, 那么就有如下算法.  
```
IN-DEGREE(linkedlists)
  len = linkedlists.length
  let in-degree[1...len] be a new array
  for i = 1 to len
    for each node ∈ linkedlists[i]
      in-degree[node.key] += 1
  return in-degree
```

### 22_1_2  

有7个节点的完全二叉树的邻接链表为:
```
1->2->3
2->4->5
3->6->7
```
则它对应的邻接矩阵表示为
```
0 1 1 0 0 0 0
0 0 0 1 1 0 0
0 0 0 0 0 1 1
0 0 0 0 0 0 0
0 0 0 0 0 0 0
0 0 0 0 0 0 0
0 0 0 0 0 0 0
```

### 22_1_3

#### 矩阵版
时间复杂度为 **θ($V^2$)**
```
MATRIX-T(matrix)
  len = matrix.length
  let matrix-t[len][len] as a new matrix
  i = 1
  j = len
  while i < j
    m = 1
    n = len
    while m < len
      matrix-t[m][i] = matrix[i][m]
      matrix-t[n][j] = matrix[j][n]
      m += 1
      n -= 1
    i += 1
    j -= 1
  return matrix-t
```

#### 邻接链表版
时间复杂度为 **θ(V+E)**
```
MATRIX-T-LINKEDLIST(linkedlists)
  len = linkedlists.length
  let lists-t[1..len] be a new linkedlist array
  for i = 1 to len
    for each node ∈ linkedlists[i]
      LIST-INSEART(list-t[node.key], i)
  return lists-t
```

### 22_1_4

```
MULTIPLE-TO-UNDIRECTED-GRAPH(linkedlists)
  len = linkedlists.length
  let lists[1..len] be a new linkedlist array
  let checked[1..len][1..len] as a new matrix
  for i = 1 to len
    for each node ∈ linkedlists[i]
      if node.key != i and !checked[i][node.key]
        checked[i][node.key] = true
        LIST-INSEART(lists[i], node.key)
  return lists
```

### 22_1_5

#### 邻接矩阵版
时间复杂度为 **θ($V^3$)**

```
SQUARE-GRAPH-MATRIX(matrix)
  len = matrix.length
  let squared[1..len][1..len] be a new matrix
  for i = 1 to len
    for j = 1 to len
      for k = 1 to len
        squared[i][j] += matrix[i][k] * matrix[k][j]
      squared[i][j] = squared[i][j] == 0 ? 0 : 1
  return squared
```

#### 邻接链表版
时间复杂度为 **θ($V+E^2$)**

```
SQUARE-GRAPH-LIST(lists)
  len = lists.length
  let squared[1..len] be a new list array
  for i = 1 to len
    for each node ∈ lists[i]
      temp-list = lists[node.key]
      for each sub-node ∈ temp-list
        if LIST-SEARCH(squared[i], sub-node.key) == NIL
          LIST-INSEART(squared[i], sub-node.key)
  return squared;
```

### 22_1_6

共同汇点的暂时不知道怎么在 **O(V+E)** 时间内完成.

### 22_1_7

根据我自己列了几个例子来看, 首先
$$B=b_{ij}=|V|\times|E|$$
则有
$$1 \leq i \leq V$$
$$1 \leq j \leq E$$

$$BB^T = b_{mn}$$
$$1 \leq m, n \leq V$$
$b_{mn} \geq 1 \text{时, 代表从m结点向n结点发出一条边}$  
$b_{mn} = 0 \text{时, 代表从m结点与n结点之间没有任何联系}$  
$b_{mn} \leq -1 \text{时, 代表从n结点向m结点发出一条边}$  
