# 两个数组的交集 II
  
给定两个数组，编写一个函数来计算它们的交集。
  
说明：
  
  * 输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。
  * 不考虑输出结果的顺序。

# 题解1
  
* 先对给予的2个数组进行排序.
* 遍历较小长度的数组.
* 用二分法对另一个数组(未被遍历的数组)进行查找.
  * 若未查找到, 直接进入下一次迭代.
  * 若查找到, 则搜索被查找数组中目标数字出现的次数, 同时搜索正在遍历的数组中目标数字出现的次数, 取两者较小值作为目标数字个数, 存入列表中.
* 依照列表中的元素生成相应数组.
  
```
class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
		//对nums1, nums2进行排序.
        Arrays.sort(nums1);
        Arrays.sort(nums2);
		//选择出长度较小的数组, 并使其作为nums1, 另一个作为nums2.
        if (nums1.length > nums2.length) {
            int[] temp = nums1;
            nums1 = nums2;
            nums2 = temp;
        }
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < nums1.length; ++i) {
			//二分查找当前下标i所对应数字在nums2中是否存在.
            int index = Arrays.binarySearch(nums2, nums1[i]);
            if (index >= 0) {
				// 对应数字在nums2中存在.
				//对应数字在nums2中出现的次数.
                int sum = 0;
				//对应数字在nums1中出现的次数
                int sum1 = 0;
                int j = index;
				// 对nums2向前搜索目标数字出现次数.
                while (j >= 0 && nums2[j] == nums1[i]) {
                    ++sum;
                    --j;
                }
				// 对nums2向后搜索目标数字出现次数.
                j = index + 1;
                while (j < nums2.length && nums2[j] == nums1[i]) {
                    ++sum;
                    ++j;
                }
				// 向后搜索目标数字在nums1中的个数.
                while (i < nums1.length && nums1[i] == nums2[index]) {
                    ++sum1;
                    ++i;
                }
				// 上面那个循环多加了一个1, 这里得减个1.
                --i;
				//取2个出现次数的最小值, 并将该数量的目标数字存入list列表中.
                sum = Math.min(sum, sum1);
                for (int k = 0; k < sum; ++k) {
                    list.add(nums2[index]);
                }
            }
        }
        int[] out = new int[list.size()];
        int i = 0;
        for (int num : list) {
            out[i++] = num;
        }
        return out;
    }
}
```