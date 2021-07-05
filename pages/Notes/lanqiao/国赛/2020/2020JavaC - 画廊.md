> 小蓝办了一个画展，在一个画廊左右两边陈列了他自己的作品。为了使画展更有意思，小蓝没有等距陈列自己的作品，而是按照更有艺术感的方式陈列。

> 在画廊的左边陈列了 L 幅作品，在画廊的右边陈列了 R 幅作品，左边的作品距离画廊的起点依次为 u_1, u_2, · · · , u_Lu  ，右边的作品距离画廊起点依次为 v_1, v_2, · · · ,v_Rv 
> 每周，小蓝要整理一遍自己的每一幅作品。整理一幅作品的时间是固定的，但是要带着沉重的工具。从一幅作品到另一幅作品之间的距离为直线段的长度。
>
> 小蓝从画廊的起点的正中央（左右两边的中点）出发，整理好每一幅画，最终到达画廊的终点的正中央。已知画廊的宽为 ww。
> 
> 请问小蓝最少带着工具走多长的距离？
>
>
> 输入描述
> 输入的第一行包含四个整数 L,R,d,w，表示画廊左边和右边的作品数量，以及画廊的长度和宽度。

> 第二行 L 个代表左边作品位置

> 第三行 R 个代表右边作品位置
>

> 输出描述
> 输出一个实数，四舍五入保留两位小数，表示小蓝最少带着工具走的距离。

### 题解

  动态规划.
 
  用 dp[i][j][k] 表示已经走的距离,  
  其中 i 为左边画的下标  
      j 为右边画的下标  
      k 为目前是在左边(0)还是在右边(1);  
  记录的距离为在扶正左边第i幅或右边第j幅画后所走的总距离.  
  初始化为从起始点(w / 2, 0) 分别到左右第一幅画的距离  
  之后如果在完成dp[i][j][0]幅画时, 要想进行整理下一幅画, 有2种情况:   
  1. 去左边前面一幅画那里整理:   
      dp[i + 1][j][0] = dp[i][j][0] + (left[i] -> left[i + 1])距离
  2. 去右边前面一幅画那里整理:   
      dp[i][j + 1][1] = dp[i][j][0] + (left[i] -> right[j + 1])距离

  同理, 在完成dp[i][j][1]幅画时, 要想整理下一副画时, 也有2种情况:  
  1. 去左边前面一副画那里整理:   
      dp[i + 1][j][0] = dp[i][j][0] + (right[j] -> left[i + 1])距离
  2. 去右边前面一幅画那里整理:   
      dp[i][j + 1][1] = dp[i][j][0] + (right[j] -> right[j + 1])距离
  分别取情况中的最小值即可.

```java
import java.util.Scanner;

/**
 * 动态规划.
 * <br>
 * 用 dp[i][j][k] 表示已经走的距离,
 * 其中 i 为左边画的下标
 *     j 为右边画的下标
 *     k 为目前是在左边(0)还是在右边(1);
 * 记录的距离为在扶正左边第i幅或右边第j幅画后所走的总距离.
 * 初始化为从起始点(w / 2, 0) 分别到左右第一幅画的距离
 * 之后如果在完成dp[i][j][0]幅画时, 要想进行整理下一幅画, 有2种情况: 
 * 1. 去左边前面一幅画那里整理: 
 *     dp[i + 1][j][0] = dp[i][j][0] + (left[i] -> left[i + 1])距离
 * 2. 去右边前面一幅画那里整理: 
 *     dp[i][j + 1][1] = dp[i][j][0] + (left[i] -> right[j + 1])距离
 * 同理, 在完成dp[i][j][1]幅画时, 要想整理下一副画时, 也有2种情况:
 * 1. 去左边前面一副画那里整理: 
 *     dp[i + 1][j][0] = dp[i][j][0] + (right[j] -> left[i + 1])距离
 * 2. 去右边前面一幅画那里整理: 
 *     dp[i][j + 1][1] = dp[i][j][0] + (right[j] -> right[j + 1])距离
 * 分别取情况中的最小值即可.

 * @author miSkYle
 *
 */
public class Main {
  private static int l;
  private static int r;
  private static int d;
  private static int w;
  
  /**
   * run.

   * @param args args
   */
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    l = in.nextInt();
    r = in.nextInt();
    d = in.nextInt();
    w = in.nextInt();
    
    double[] left = new double[l + 1];
    for (int i = 0; i < l; ++i) {
      left[i + 1] = in.nextInt();
    }
    double[] right = new double[r + 1];
    for (int i = 0; i < l; ++i) {
      right[i + 1] = in.nextInt();
    }
    in.close();

    // 初始化dp
    // 为了确保取最小值不会取到0(无效数据)的情况
    double[][][] dp = new double[l + 1][r + 1][2];
    for (int i = 0; i < left.length; ++i) {
      for (int j = 0; j < right.length; ++j) {
        dp[i][j][0] = Integer.MAX_VALUE;
        dp[i][j][1] = Integer.MAX_VALUE;
      }
    }
    // 初始化, 分别从原点走向左边第一幅或者右边第一幅画
    dp[1][0][0] = distance(0, left[1], w / 2.0);
    dp[0][1][1] = distance(0, right[1], w / 2.0);
    
    for (int i = 0; i < left.length; ++i) {
      for (int j = 0; j < right.length; ++j) {
        if (i + j <= 1) {
          continue;
        }
        if (i > 0) {
          dp[i][j][0] = Math.min(
              dp[i - 1][j][0] + distance(left[i - 1], left[i], 0),
              dp[i - 1][j][1] + distance(left[i], right[j], w)
            );
        }
        if (j > 0) {
          dp[i][j][1] = Math.min(
              dp[i][j - 1][0] + distance(left[i], right[j], w),
              dp[i][j - 1][1] + distance(right[j - 1], right[j], 0)
            );
        }
      }
    }
    System.out.printf("%.2f\n", Math.min(
          dp[left.length - 1][right.length - 1][0] + distance(left[left.length - 1], d, w / 2.0), 
          dp[left.length - 1][right.length - 1][1] + distance(right[right.length - 1], d, w / 2.0)
        ));
  }
  
  /**
   * 求两点距离.

   * @param locY1   第一个点的y坐标
   * @param locY2   第二个点的y坐标
   * @param x       宽度
   * @return        两点距离
   */
  private static double distance(double locY1, double locY2, double x) {
    return Math.sqrt(Math.pow(locY1 - locY2, 2) + Math.pow(x, 2));
  }
}
```