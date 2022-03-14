[跳转到题解](#题解)

122. 买卖股票的最佳时机 II

难度：中等

给定一个数组 prices ，其中 prices[i] 表示股票第 i 天的价格。

在每一天，你可能会决定购买和/或出售股票。你在任何时候 **最多** 只能持有 **一股** 股票。你也可以购买它，然后在 **同一天** 出售。<br>
返回 <em>你能获得的 **最大** 利润</em> 。



**示例 1:**

```
输入: prices = [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。

```


**示例 2:**

```
输入: prices = [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。

```


**示例 3:**

```
输入: prices = [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```




**提示：**

- 1 <= prices.length <= 3 * 10<sup>4</sup>
- 0 <= prices[i] <= 10<sup>4</sup>


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


### 题解

(跳转到题目)(#page)

#### 解法1,

当天卖出后可以买当天的股票, 那么可以看成是只要两天内前一天买入后一天卖出能有收益时,
在后一天卖出的同时, 买入当天的股票.

```java
class Solution {
    public int maxProfit(int[] prices) {
        int[] dp = new int[prices.length];
        int min = prices[0];
        int max = 0;
        for (int i = 1; i < prices.length; ++i) {
            dp[i] = Math.max(dp[i - 1], prices[i] - min);
            // 如果当天的股票比前一天涨了, 卖掉昨天的, 买今天的
            // 重新更新股票的最低价为今天买到的股票价格
            if (dp[i] > dp[i - 1]) {
                max += dp[i];
                min = prices[i];
                dp[i] = 0;
            } else {
                min = Math.min(min, prices[i]);
            }
        }
        return max;
    }
}
```

#### 结法2

每天可以持有股票, 也可以不持有股票, 第二天如果要持有股票,
那么可以是前一天持有股票时的最大利润值, 也可以是前一天没
有持有股票的最大利润值减去今天股票价格(也就是购买今天的股
票)的差值.

同理, 第二天如果没有持有股票, 那么今天的没有持有股票的值是
前一天没有持有股票的最大利润值, 也可以是今天卖出股票后的利
润与前一天持有股票的最大利润的总和.

```java
class Solution {
    public int maxProfit(int[] prices) {
        //[][0] 未持有股票的最大利润, [][1] 持有股票的 最大利润.
        int[][] dp = new int[prices.length][2];
        dp[0][1] = -prices[0];
        for (int i = 1; i < prices.length; ++i) {
            // 第i天未持有股票则将前一天的股票卖掉
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
            // 第i天持有股票最大值, 则为前一天没拿股票再买今天的股票
            dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
        }
        return dp[prices.length - 1][0];
    }
}
```

这里dp数组的当前值只依赖于上一个值, 那么可以做出以下优化去
减小空间复杂度:

```java
class Solution {
    public int maxProfit(int[] prices) {
        //[][0] 未持有股票的最大利润, [][1] 持有股票的 最大利润.
        int lastDayHand = -prices[0];
        int lastDaySold = 0;
        for (int i = 1; i < prices.length; ++i) {
            // 第i天未持有股票则将前一天的股票卖掉
            lastDaySold = Math.max(lastDaySold, lastDayHand + prices[i]);
            // 第i天持有股票最大值, 则为前一天没拿股票再买今天的股票
            lastDayHand = Math.max(lastDayHand, lastDaySold - prices[i]);
        }
        return lastDaySold;
    }
}
```
