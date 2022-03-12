[原贴](https://leetcode-cn.com/leetbook/read/linked-list/jjhf6/)

给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 `null`。

为了表示给定链表中的环，我们使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 `0` 开始）。 如果 `pos` 是 `-1`，则在该链表中没有环。注意，`pos` 仅仅是用于标识环的情况，并不会作为参数传递到函数中。

**说明：不允许修改给定的链表。**


### 题解1 - 利用HashSet

一边遍历节点, 一边检查HashSet中是否存在相同节点.

```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
        HashSet<ListNode> set = new HashSet<>();
        while (head != null) {
            // 如果set中存在则直接返回head.
            // 否则将现在这个节点加入set中.
            if (set.contains(head)) {
                return head;
            }
            set.add(head);
            head = head.next;
        }
        // 代表不存在.
        return null;
    }
}
```


### 题解2 - 双指针

先利用双指针判断是否有环, 快指针比慢指针快一步, 之后判断开始进入环的节点.

令进入环前的一段距离为 **a** , 环的长度为 **d**, 假设快指针遇到了慢指针时, 慢指针在环中的距离离开始进入环的节点的距离为 **b** , 其没有走过的距离为 **c**.

当快指针与慢指针相遇时, 快指针比慢指针多跑一圈, 此时慢指针行走过的距离为 `a + b`, 快指针行走的距离为 `a + b + c + b`. 

因为快指针比慢指针快一步, 那么当慢指针走一步时, 快指针走2步. 所以快指针行走的距离为慢指针行走距离的2倍, 即 $2 * (a + b) = a + b + c + b$, 推导出可得 `a = c`

接下来另一个制作在开头开始走, 步伐与快指针步伐一样, 都调整为1, 则两者相遇时, 刚好是在环入口相遇.

代码如下: 
``` java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
    	ListNode slow = head;
    	ListNode fast = head;
    	boolean isCycle = false;
    	while (fast != null && fast.next != null) {
    		fast = fast.next.next;
    		slow = slow.next;
    		if (fast == slow) {
    			isCycle = true;
    			break;
    		}
    	}
    	if (!isCycle) {
    		return null;
    	}
    	
      // 开始进行下一步相遇.
    	slow = head;
    	while (slow != fast) {
    		slow = slow.next;
    		fast = fast.next;
    	}
    	return fast;
    }
}
```