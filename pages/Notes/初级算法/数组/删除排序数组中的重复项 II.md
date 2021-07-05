[原贴](https://leetcode-cn.com/leetbook/read/all-about-array/x9nivs/)

给你一个有序数组 `nums` ，请你 **原地** 删除重复出现的元素，使每个元素 **最多出现两次** ，返回删除后数组的新长度。

不要使用额外的数组空间，你必须在 **原地** 修改输入数组 并在使用 `O(1)` 额外空间的条件下完成。

### 题解1

用辅助数组.

代码如下:

``` java
class Solution {
    public int removeDuplicates(int[] nums) {
       如果 nums 的长度为0, 则直接返回0
      if (nums.length == 0) {
        return 0;
      }
      // 初始化信息
      // length 代表最终数组长度.
      int length = 1;
      int[] out = new int[nums.length];
      // times 代表元素出现的次数
      int times = 1;
      out[0] = nums[0];
      
      for (int i = 1; i < nums.length; ++i) {
        // 如果 nums 中第 i 个元素 与 out 中 末尾元素相等时
        // 判断这个元素的个数是否超过了2, 如果超过了则跳过,
        // 没有超过则将值赋值到out数组末尾, 并且更新这个数字
        // 在out数组间出现的次数.
        if (nums[i] == out[length - 1]) {
          if (times < 2) {
            out[length++] = nums[i];
            ++times;
          }
        } else {
          // 如果当前元素与out末尾元素不是同一个
          // 那么则更新out末尾元素,
          // 并且更新这个元素出现的次数.
          out[length++] = nums[i];
          times = 1;
        }
      }
      // 将out数组前length个元素赋值到nums数组中.
      for (int i = 0; i < length; ++i) {
        nums[i] = out[i];
      }
      // 返回记录的out数组长度.
      return length;
    }
}
```