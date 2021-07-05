> 定义阶乘 $ n! = 1 × 2 × 3 × · · · × n $
>
> 请问 $100!$ （100 的阶乘）有多少个正约数。

### 题解

除一以外的任何一个非质数正整数都能用质数相乘来表示,

根据约数个数定理有

当对于任意一个大于1的正整数可以分解质因数: 
$$n = \prod_{1}^{k}{p_i^{a_i}} = {p_1^{a_1} + p_2^{a_2} + \cdots + p_k^{a_k}}$$
则n的正约数个数为 
$$f(n) = \prod_{1}^{k}{(a_i + 1)}$$

那么 $100!$ 可以将 $1 - 100$ 分解质因数并统计数量来计算出 $100!$ 的正约数数量.

```java

import java.math.BigInteger;
import java.util.HashMap;

/**
 * Java C problem id: 1020.

 * @author MiSkYle
 *
 */
public class Main {
  
  /**
   * run.

   * @param args args
   */
  public static void main(String[] args) {
    HashMap<Integer, Integer> map = new HashMap<>();
    for (int i = 1; i <= 100; ++i) {
      int num = i;
      for (int j = 2; j <= num; ++j) {
        while (num % j == 0 && isPrime(j)) {
          map.put(j, map.getOrDefault(j, 0) + 1);
          num /= j;
        }
      }
    }
    BigInteger ans = BigInteger.ONE;
    for (int num : map.values()) {
      ans = ans.multiply(new BigInteger(num + 1 + ""));
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