与之前发的 **填充每个节点的下一个右侧节点指针** 题目类似, 但是这次传入的参数并不是 ~~**完全二叉树**~~

### 题解1

与 **填充每个节点的下一个右侧节点指针** 的题解1相同, 使用 **广度优先搜索** 来解决.

代码与其一致.

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}
    
    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/

class Solution {
    public Node connect(Node root) {
    	Node returnRoot = root;
        if (root == null) {
        	return null;
        }
    	Queue<Node> queue = new LinkedList<>();
        int size = 1;
        int nextSize = 0;
        queue.add(root);
        while (!queue.isEmpty()) {
        	root = queue.poll();
        	--size;
        	if (root.left != null) {
        		queue.add(root.left);
        		++nextSize;
        	}
        	if (root.right != null) {
        		queue.add(root.right);
        		++nextSize;
        	}
        	if (size != 0) {
        		root.next = queue.peek();
        	} else {
        		size = nextSize;
        		nextSize = 0;
        	}
        }
        return returnRoot;
    }
}
```