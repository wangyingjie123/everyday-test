/*
* @file 判断一个点是否在给定三角形内
**/
// 根据重心坐标定义
// x = a * x12 + b * x2 + c * x3;
// y = a * y1 + b * y2 + c * y3;
// a + b + c = 1;
function pointInTriangle(x1, y1, x2, y2, x3, y3, x, y) {
    // a = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
    // b = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
    // c = 1 - a - b;
    let divisor = ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
    let a = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / divisor;
    let b = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / divisor;
    let c = 1 - a - b;
    return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1;
}
let res = pointInTriangle(400, 300, 500, 100, 300, 300, 300, 200);
// console.log(res);
