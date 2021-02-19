function sku(list) {
    let res = [];
    /*
    * @params chunkIndex要处理的list属性下标，如颜色1
    * @params prev 前一个拼接好的数组，如[iphone xs, 白色]
    * */
    function helper(chunkIndex, prev) {
        let curList = list[chunkIndex];
        let isLatest = chunkIndex === list.length - 1;
        for (let v of curList) {
            let cur = prev.concat(v);
            if (isLatest) {
                res.push(cur);
            } else {
                helper(chunkIndex + 1, cur);
            }
        }
    }
    helper(0, []);
    return res;
}
let skuList = [
    ['iPhone X', 'iPhone XS'],
    ['黑色', '白色'],
    ['64g', '256g']
];
console.log(sku(skuList));