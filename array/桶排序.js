import { insertionSort } from './插入排序.js';
import { example } from './utils.js';
/*
* @file 桶排序
*/
function bucketSort(array, bucketSize = 3) {
    if (array.length < 2) return array;
    const buckets = createBuckets(array, bucketSize);
    return sortBuckets(buckets);
}
/*
* 创建桶，并将元素分布到不同桶中
* @return 返回一个二维数组
*/
function createBuckets(array, bucketSize) {
    let minValue = array[0];
    let maxValue = array[0];
    // 找最大、最小值
    for (let i = 0; i < array.length; i++) {
        minValue = Math.min(minValue, array[i]);
        maxValue = Math.max(maxValue, array[i]);
    }
    // 桶的数量
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    const buckets = Array.from(new Array(bucketCount), () => []);
    // const buckets = [];
    // for (let i = 0; i < bucketCount; i++) {
    //     buckets[i] = [];
    // }
    // 将元素放入对应的桶中
    for (let i = 0; i < array.length; i++) {
        const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
        buckets[bucketIndex].push(array[i]);
    }
    return buckets;
}
/*
* 将每个桶进行排序
*/
function sortBuckets(buckets) {
    const sortedArray = [];
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] != null) {
            // 选用插入排序
            insertionSort(buckets[i]);
            sortedArray.push(...buckets[i]);
        }
    }
    return sortedArray;
}
console.time('桶排序');
const res = bucketSort(example);
console.timeEnd('桶排序');
// console.log(res);