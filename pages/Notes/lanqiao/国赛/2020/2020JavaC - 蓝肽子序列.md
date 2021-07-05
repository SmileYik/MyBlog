> L 星球上的生物由蛋蓝质组成，每一种蛋蓝质由一类称为蓝肽的物资首尾连接成一条长链后折叠而成。
> 
> 生物学家小乔正在研究 L 星球上的蛋蓝质。她拿到两个蛋蓝质的蓝肽序列，想通过这两条蓝肽序列的共同特点来分析两种蛋蓝质的相似性。
> 
> 具体的，一个蓝肽可以使用 1 至 5 个英文字母表示，其中第一个字母大写，后面的字母小写。一个蛋蓝质的蓝肽序列可以用蓝肽的表示顺序拼接而成。
> 
> 在一条蓝肽序列中，如果选取其中的一些位置，把这些位置的蓝肽取出，并按照它们在原序列中的位置摆放，则称为这条蓝肽的一个子序列。蓝肽的子序列不一定在原序列中是连续的，中间可能间隔着一些未被取出的蓝肽。
> 
> 如果第一条蓝肽序列可以取出一个子序列与第二条蓝肽序列中取出的某个子序列相等，则称为一个公共蓝肽子序列。
> 
> 给定两条蓝肽序列，找出他们最长的那个公共蓝肽子序列的长度。
> 
>>  输入描述
>> 
>>  输入两行，每行包含一个字符串，表示一个蓝肽序列。字符串中间没有空格等分隔字符。
> 
>>  其中有 ，两个字符串的长度均不超过 1000。
> 
> 
>> 输出描述
>>
>> 输出一个整数，表示最长的那个公共蓝肽子序列的长度。

### 题解

实际上求最长相同子序列, 蓝肽代表一个单位

``` java

import java.util.LinkedList;
import java.util.Scanner;

/**
 * description.

 * @author miSkYle
 *
 */
public class Main {
  
  /**
   * run.

   * @param args args
   */
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    String[] s1 = getLanTai(in.nextLine());
    String[] s2 = getLanTai(in.nextLine());
    in.close();
    
    int[][] dp = new int[s1.length][s2.length];
    /*
     * 初始化, 
     * 如果s1[0]能够与s2中对应下标相匹配, 
     * 那么dp[0][i]则最少有1个相同子序列.
     * 如果不匹配, 
     * 则为s2[i-1]对应的dp[0][i-1]的子序列数目.
     */
    for (int i = 0; i < s2.length; ++i) {
      if (s1[0].equals(s2[i])) {
        dp[0][i] = 1;
      } else {
        // i 越界则为0.
        dp[0][i] = (i == 0 ? 0 : dp[0][i - 1]);
      }
    }
    
    /*
     * 如果s1[i]与s2[j]相匹配,
     * 那么数量为dp[i][j] = dp[i - 1][j - 1] + 1;
     * 如果不匹配那么
     * 则为 dp[i - 1][j], dp[i][j - 1] 中最大的一个.
     */
    for (int i = 1; i < s1.length; ++i) {
      for (int j = 0; j < s2.length; ++j) {
        if (s1[i].equals(s2[j])) {  
          dp[i][j] = (j == 0 ? 0 : dp[i - 1][j - 1]) + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], j == 0 ? 0 : dp[i][j - 1]);
        }
      }
    }
    System.out.println(dp[s1.length - 1][s2.length - 1]);
  }

  /**
   * 获取蓝肽.

   * @param s   蛋蓝质.
   * @return    存有蓝肽的数组.
   */
  public static String[] getLanTai(String s) {
    LinkedList<String> list = new LinkedList<>();
    int index = 0;
    for (int i = 1; i < s.length(); ++i) {
      char c = s.charAt(i);
      if (c >= 'A' && c <= 'Z') {
        list.add(s.substring(index, i));
        index = i;
      }
    }
    list.add(s.substring(index));
    return list.toArray(new String[list.size()]);
  }
  
}
```