> 一个数如果除了 `1` 和自己还有其他约数，则称为一个合数。例如： `1, 2, 3` 不是合数，`4, 6` 是合数。
>
> 请问从 `1` 到 `2020` 一共有多少个合数。

### 题解

也是简单的遍历即可, 遍历过程中判断这个数是否为质数, 如果不是质数那么这个数一定为合数 (1除外)

```java
/**
 * Java C problem id: 1028.

 * @author MiSkYle
 *
 */
public class Main {
  
  /**
   * run.

   * @param args args
   */
  public static void main(String[] args) {
    boolean[] flags = new boolean[2021];
    flags[1] = true;
    int ans = 0;
    for (int i = 2; i <= 2020; ++i) {
      if (!isPrime(i)) {
        ++ans;
      }
    }
    System.out.println(ans);
  }
  
  /**
   * 检查一个数是否为质数.

   * @param num 需要判断的数.
   * @return    如果是质数则返回true, 否则为false
   */
  public static boolean isPrime(int num) {
    num = (int) Math.sqrt(num) + 1;
    for (int i = 2; i < num; ++i) {
      if (num % i == 0) {
        return false;
      }
    }
    return true;
  }
}
```