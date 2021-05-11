给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

### 题解1

先确定倒数第 n 个节点是顺序第几个节点, 然后再次遍历以删除.

代码如下: 

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // 特殊情况判断.
        if (head.next == null) {
            return null;
        }
        // 获取倒数第n个节点在正数第几个位置上.
        ListNode list = head;
        int length = 0;
        while (head != null) {
            ++length;
            head = head.next;
        }
        head = list;
        // 将链表循环到对应位置节点上.
        // 对节点进行删除.
        ListNode pre = head;
        for (int i = 0; i < length - n; ++i) {
            pre = head;
            head = head.next;
        }
        if (head.next != null) {
            head.val = head.next.val;
            head.next = head.next.next;
        } else {
            pre.next = null;
        }
        return list;
    }
}
```

### 题解2

利用双指针.

先将指针a前进n个节点.

指针b为当前给与的节点

当指针a的下一个节点为null时, 此时b指针就是要删除的节点.

具体代码如下:

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode slow = head;
        ListNode fast = head;
        // 让fast指针前进n个节点.
        for (int i = 0; i < n; ++i) {
        	fast = fast.next;
        }
        // 循环定位要删除的节点位置.
        while (fast != null 
        		&& fast.next != null) {
        	slow = slow.next;
        	fast = fast.next;
        }
        // 当fast为null时, 代表要删除的节点为首个节点.
        if (fast == null) {
          // 此时slow节点就是第一个节点,
          // 如果第一个节点指向的下一个节点为null,
          // 则代表这个链表只有一个节点, 并且需要删除这个节点,
          // 那么直接返回null;
        	if (slow.next == null) {
                return null;
        	} else {
            // 更改首个节点的值为第二个节点的值.
        		slow.val = slow.next.val;
        	}
        }
        // 否则当前slow节点直接指向下一个节点所指向的节点.
        slow.next = slow.next.next;
        return head;
    }
}
```