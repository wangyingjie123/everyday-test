/*
* 快速排序一
* 简易版
* */
import {example, swap} from "./utils.js";

function quickSort(array) {
    if (array.length <= 1) {
        return array
    }
    const index = Math.floor(array.length / 2);
    const pivot = array.splice(index, 1)[0];
    let left = [];
    let right = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i])
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}

/*
* 快速排序二
* 时间复杂度O(n*logn)
* 空间复杂度O（logn）
* */
const sortArray = function (nums) {
    if (nums.length < 2) return nums;
    return quickSort2(nums, 0, nums.length - 1);
};

function quickSort2(nums, left, right) {
    if (left >= right) return;
    let pivotIndex = partition(nums, left, right); // 找主元，双指针移动，比主元小的放左边
    quickSort2(nums, left, pivotIndex - 1); // 排序左半部分
    quickSort2(nums, pivotIndex + 1, right); // 排序有半部分
    return nums;
}

function partition(nums, left, right) {
    let end = right;
    let leftIndex = left;
    for (let i = left; i < right; i++) {
        if (nums[i] < nums[end]) {
            [nums[leftIndex], nums[i]] = [nums[i], nums[leftIndex]];
            leftIndex++;
        }
    }
    [nums[leftIndex], nums[end]] = [nums[end], nums[leftIndex]];
    return leftIndex;
}
// console.time();
// const res = sortArray(example);
// console.timeEnd();

/*
* 快速排序三
* 时间复杂度O(n*logn)
* 空间复杂度O（logn）
* */
const quickSort3 = (arr) => {
    if(arr.length <= 1) return arr;
    sort(arr, 0, arr.length - 1);
    return arr;
}
const sort = (arr, l, r) => {
    if (l >= r) return;
    let mid = (l + r) / 2 >> 0;
    swap(arr, mid, r);
    let ln = l + 1, rn = r;
    while(true) {
        while(ln < r && arr[ln] < arr[l]) {
            ln++;
        }
        while(rn >= l && arr[rn] > arr[l]) {
            rn--;
        }
        if (ln > rn) {
            break;
        } else {
            swap(arr, ln, rn);
            ln++;
            rn--;
        }
    }
    console.log(ln, rn);
}
console.log(example);
quickSort3(example);