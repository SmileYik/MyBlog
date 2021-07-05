
[原贴](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/xnr003/)

实现 **strStr()** 函数。

给定一个 `haystack` 字符串和一个 `needle` 字符串，在 `haystack` 字符串中找出 `needle` 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  `-1`。

说明: 对于本题, 当 `needle` 为空字符串时, 我们应该返回 `0`.

### 题解1

使用Java, String中的indexOf方法.

```java
class Solution {
    public int strStr(String haystack, String needle) {
        return haystack.indexOf(needle);
    }
}
```

### 题解2

逐个判断.

```java
class Solution {
  public int strStr(String haystack, String needle) {
    // 首先判断需要查找的字符串
	// 如果为空则直接返回0
    if (needle.length() == 0) {
      return 0;
    }
    // haystack 的下标
    int i1 = 0;
	// needle 的下标
    int i2 = 0;
    int index = -1;
    while (i1 < haystack.length() && i2 < needle.length()) {
      if (haystack.charAt(i1) == needle.charAt(i2)) {
	    // 如果两个字符串相应下标对应字符相等
		// 则判断index是否为-1,
		// 若为-1则将当前haystack下标值赋值给index
        if (index == -1) {
          index = i1;
        }
		// 2个下标分别加1
        ++i1;
        ++i2;
      } else if (index != -1) {
	    // 当index不为1, 下标对应字符不等时,
		// 重置i1到index + 1
		// 重置index为-1
		// 重置needle下标为0
		// 出现这种情况是2个字符串前几个字符相等, 后几个不等
        i1 = index + 1;
        i2 = 0;
        index = -1;
      } else {
	    // 其余情况下i1+1
        ++i1;
      }
    }
	// 如果i2未到needle的长度, 则代表只有前几个字母相等,
	// 		这表明并未查找成功, 应该返回-1
	// 否则则返回index.
    return  i2 == needle.length() ? index : -1;
  }
}
```

### 题解3

循环截取字符串与needle进行比对.

```java
class Solution {
  public int strStr(String haystack, String needle) {
    if (needle.length() == 0) {
      return 0;
    }
    for (int i = 0; i <= haystack.length() - needle.length(); ++i) {
      if (haystack.substring(i, i + needle.length()).equals(needle)) {
        return i;
      }
    }
    return -1;
  }
}
```