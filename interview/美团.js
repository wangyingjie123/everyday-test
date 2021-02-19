/*
* @file 两个已排序数组中找出第k小的数，返回数组index，数组内的index
* @return [index, index]
* */
function searchK(arr1, arr2, k) {
    let index1 = 0;
    let index2 = 0;
    let nums = 1;
    let i = 0;
    while (i < k) {
        if (arr1[index1] < arr2[index2]) {
            index1++;
            nums = 1;
        } else {
            index2++;
            nums = 2;
        }
        console.log(index1, index2);
        i++;
    }
    return [nums, nums === 1 ? index1 : index2];
}
// console.log(searchK([1, 5, 6, 7], [2], 3));