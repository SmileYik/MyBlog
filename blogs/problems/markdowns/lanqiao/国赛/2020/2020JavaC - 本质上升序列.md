> 小蓝特别喜欢单调递增的事物。
> 
> 在一个字符串中，如果取出若干个字符，将这些字符按照在字符串中的顺序排列后是单调递增的，则成为这个字符串中的一> 个单调递增子序列。
> 
> 例如，在字符串 lanqiao 中，如果取出字符 n 和 q，则 nq 组成一个单调递增子序列。类似的单调递增子序列还有 lnq、i、ano 等等。 小蓝发现，有些子序列虽然位置不同，但是字符序列是一样的，例如取第二个字符和最后一个字符可以取到 ao，取最后两个字符也可以取到 ao。小蓝认为他们并没有本质不同。
> 
> 对于一个字符串，小蓝想知道，本质不同的递增子序列有多少个？ 例如，对于字符串 lanqiao，本质不同的递增子序列有 21 个。它们分别是 l、a、n、q、i、o、ln、an、lq、aq、nq、ai、lo、ao、no、io、lnq、anq、lno、ano、aio。

> 求以下字符串的本质不同的递增子序列(200 个小写英文字母, 分四行显示)

```
tocyjkdzcieoiodfpbgcncsrjbhmugdnojjddhllnofawllbhf
iadgdcdjstemphmnjihecoapdjjrprrqnhgccevdarufmliqij
gihhfgdcmxvicfauachlifhafpdccfseflcdgjncadfclvfmad
vrnaaahahndsikzssoywakgnfjjaihtniptwoulxbaeqkqhfwl
```

### 题解1 - DFS 暴力搜索

```java
  /**
   * dfs暴力.
   * 耗时: 361810ms

   * @author MiSkYle
   *
   */
  private static class Solution1 {
    private static final String str = "tocyjkdzcieoiodfpbgcncsrjbhmugdno"
                                    + "jjddhllnofawllbhfiadgdcdjstemphmn"
                                    + "jihecoapdjjrprrqnhgccevdarufmliqi"
                                    + "jgihhfgdcmxvicfauachlifhafpdccfse"
                                    + "flcdgjncadfclvfmadvrnaaahahndsikz"
                                    + "ssoywakgnfjjaihtniptwoulxbaeqkqhfwl";
    private static HashSet<String> checked = new HashSet<>();
    private long ans = 0;
    
    public void main() {
      search(0, new StringBuilder());
      System.out.println(ans);
    }
    
    public void search(int index, StringBuilder sb) {
      if (index == str.length()) {
        if (sb.length() > 0 
            && !checked.contains(sb.toString())) {
          checked.add(sb.toString());
          ++ans;
        }
        return;
      }
      
      // 如果当前字符串为0
      // 或者字符串长度不为0并且最后一个字符与index对应字符为递增关系, 则可以选择添加这个字符
      if (sb.length() > 0 && sb.charAt(sb.length() - 1) < str.charAt(index) 
          || sb.length() == 0) {
        StringBuilder temp = new StringBuilder(sb);
        temp.append(str.charAt(index));
        search(index + 1, temp);
      }
      // 共有操作, 即不选此字符
      search(index + 1, sb);
    }
  }
```

### 题解2 - 动态规划

```java
  /**
   * 题解2: 动态规划.

   * @author MiSkYle
   *
   */
  private static class Solution2 {
    private static final String str = "tocyjkdzcieoiodfpbgcncsrjbhmugdno"
                                    + "jjddhllnofawllbhfiadgdcdjstemphmn"
                                    + "jihecoapdjjrprrqnhgccevdarufmliqi"
                                    + "jgihhfgdcmxvicfauachlifhafpdccfse"
                                    + "flcdgjncadfclvfmadvrnaaahahndsikz"
                                    + "ssoywakgnfjjaihtniptwoulxbaeqkqhfwl";
    
    public void main() {
      // 每一个字符都可以独自组成一个递增队列.
      int[] dp = new int[str.length()];
      Arrays.fill(dp, 1);
      /*
       * 从字符串起始下标0到当前下标i时, 
       * 当字符小于下标i的字符时, 则在字符i对应的递增数列为 dp[i] = dp[i] + dp[j];
       * 当字符等于下标i的字符时, 则在字符i对应的递增数列为 dp[i] = dp[i] - dp[j];
       */
      for (int i = 1; i < str.length(); ++i) {
        for (int j = 0; j < i; ++j) {
          if (str.charAt(i) > str.charAt(j)) {
            dp[i] += dp[j];
          } else if (str.charAt(i) == str.charAt(j)) {
            dp[i] -= dp[j];
          }
        }
      }
      
      long ans = 0;
      for (int i : dp) {
        ans += i;
      }
      System.out.println(ans);
    }
  }
```
