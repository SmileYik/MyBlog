> 小蓝在一张无限大的特殊画布上作画。
> 
> 这张画布可以看成一个方格图，每个格子可以用一个二维的整数坐标表示。
> 
> 小蓝在画布上首先点了一下几个点： `(0, 0), (2020, 11), (11, 14), (2000, 2000)`。
> 
> 只有这几个格子上有黑色，其它位置都是白色的。
> 
> 每过一分钟，黑色就会扩散一点。具体的，如果一个格子里面是黑色，它就会扩散到上、下、左、右四个相邻的格子中，使> 得这四个格子也变成黑色（如果原来就是黑色，则还是黑色）。
>
> 请问，经过 `2020` 分钟后，画布上有多少个格子是黑色的。

### 题解1 - BFS

BFS暴力搜索, 会超时

在搜索时记录点是什么时间产生的, 如果是2020分时产的的点, 那么这个点就不再具有扩散的能力.

除了用对象存储时间, 还可以用HashMap来储存.

```java
  /**
   * 第一种解法, 主要思想是BFS.
   * <br>
   * 如果直接提交给蓝桥云客改的话会超时.
   * <br>
   * 用的时间为 173964ms

   * @author MiSkYle
   *
   */
  private static class Solution1 {
    /**
     * 记录点与当前点出现的时间.

     * @author MiSkYle
     *
     */
    private class Point {
      int locX;
      int locY;
      int time;
      
      public Point(int x, int y, int time) {
        locX = x;
        locY = y;
        this.time = time;
      }
      
      /**
       * 以当前坐标为基准与另一个坐标相加并返回一个新的坐标.

       * @param p   需要相加的目标坐标
       * @return    返回当前坐标加上目标坐标后的副本
       */
      public Point add(Point p) {
        return new Point(locX + p.locX, locY + p.locY, time + p.time);
      }
      
      /**
       * 重写 hashCode 方法,
       * 因为在这个方法中得用到HashSet.
       */
      @Override
      public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + locX;
        result = prime * result + locY;
        return result;
      }
      
      /**
       * 重写 equals 方法,
       * 因为在这个方法中得用到HashSet.
       * 不过值得注意的是, 只要比对坐标, 而不需要比对时间.
       */
      @Override
      public boolean equals(Object obj) {
        if (this == obj) {
          return true;        
        }
        if (obj == null) {
          return false;        
        }
        if (getClass() != obj.getClass()) {
          return false;        
        }
        Point other = (Point) obj;
        if (locX != other.locX 
            || locY != other.locY) {
          return false;        
        }
        return true;
      }
    }
    
    
    public void main() {
      // 方向向量
      Point[] vectors = {
        new Point(1, 0, 1),
        new Point(-1, 0, 1),
        new Point(0, 1, 1),
        new Point(0, -1, 1)
      };
      
      // 初始化队列
      LinkedList<Point> queue = new LinkedList<>();
      queue.add(new Point(0, 0, 0));
      queue.add(new Point(2020, 11, 0));
      queue.add(new Point(11, 14, 0));
      queue.add(new Point(2000, 2000, 0));
      // 记录点是否被记录
      HashSet<Point> set = new HashSet<>(queue);
      long size = 4;
      while (!queue.isEmpty()) {
        Point p = queue.poll();
        // 如果该点对应出现的时间为 2020, 则这个点不需要继续扩散了.
        if (p.time == 2020) {
          continue;
        }
        for (Point vec : vectors) {
          Point temp = p.add(vec);
          // 记录没有被记录的点, 并更新时间.
          if (!set.contains(temp)) {
            queue.add(temp);
            set.add(temp);
            ++size;
          }
        }
      }
      System.out.println(size);
    }
  }
```

### 题解2

从扩散到扩散完毕, 产生的图案是一个关于x轴与y轴都对称的图像.

具体看代码注释.


```java
  /**
   * 解法2.
   * <br>
   * 耗时: 139ms

   * @author MiSkYle
   *
   */
  private static class Solution2 {
    // 因为数组不允许负数下标, 画布大小无限制
    // 那么就得将原来的坐标移动, 这里设置的是移动2020格
    private final int offXy = 2020;
    // 持续时间.
    private final int duration = 2020;
    // 记录这个点是否扩散过.
    private boolean[][] checked = new boolean[offXy << 2][offXy << 2];
    long ans = 0;
    
    public void main() {
      start(0, 0);
      start(2020, 11);
      start(11, 14);
      start(2000, 2000);
      System.out.println(ans);
    }
    
    /**
     * 对某点位置进行扩散, 持续时间为duration.

     * @param x x坐标
     * @param y y坐标
     */
    public void start(int x, int y) {
      // 如果当前坐标没有被记录上, 则记录这个坐标.
      if (!checked[x + offXy][y + offXy]) {
        checked[x + offXy][y + offXy] = true;
        ++ans;
      }
      
      // 扩散开始至完毕, 因为只能在上下左右四个点进行扩散,
      // 不难想象, 扩散完后的图像是一个关于x轴与y轴都对称的菱形
      // 对于扩散前起始点为(0, 0)的点经过扩散后.
      // 以x轴方向看, x轴的端点上当且只有当y=0时有扩散后的点
      // 而与端点相邻的点上则仅有当y=-1, 0, 1时才有扩散后的点.
      // 一直到当x=0时, y = {x|x∈[-duration, duration]} 时才有扩散后的点.
      // 那么就可以先计算x轴坐标的增减量, 再计算y轴坐标的增减量.
      // 最后求出扩散后的点的坐标.
      int height = 0;
      for (int i = -duration; i <= duration; ++i) {
        for (int j = -height; j <= height; ++j) {
          if (!checked[x + offXy + i][y + offXy + j]) {
            ++ans;
            checked[x + offXy + i][y + offXy + j] = true;
          }
        }
        height += (i < 0 ? 1 : -1);
      }
    }
  }
```