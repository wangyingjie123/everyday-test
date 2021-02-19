// 创建一个机遇数组的栈
class Stack {
    constructor() {
        this.count = 0
        this.items = {}
    }
    // 向栈顶添加元素
    push(element) {
        this.items[this.count] = element
        this.count++
    }
    size() {
        return this.count
    }
    // 移除栈顶元素，返回被移除元素
    pop() {
        if (this.isEmpty()) {
            return undefined
        }
        this.count--;
        const result = this.items[this.count]
        delete this.items[this.count];
        return result;
    }
    // 查看栈顶元素
    peek() {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.count - 1]
    }
    // 检查栈是否为空
    isEmpty() {
        return this.count === 0
    }
    // 清空栈元素
    clear() {
        this.items = {}
    }
    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let objstring = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            objstring = `${objstring},${this.items[i]}`
        }
        return objstring
    }
}
// 十进制转二进制
function erjinzhi(decnumber, base) {
    const stack = new Stack();
    let number = decnumber;
    let rem;
    let binaryString = '';
    while (number > 0) {
        rem = Math.floor(number % 2);
        stack.push(rem);
        number = Math.floor(number / 2);
    }
    while (!stack.isEmpty()) {
        binaryString += stack.pop().toString()
    }
    return binaryString
}
// console.log(erjinzhi(233))
// 十进制转其他进制
function zhaun(decnumber, base) {
    const stack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let number = decnumber;
    let rem;
    let binaryString = '';
    if (!(base >= 2 && base <= 36)) {
        return ''
    }
    while (number > 0) {
        rem = Math.floor(number % base);
        stack.push(rem);
        number = Math.floor(number / base);
    }
    while (!stack.isEmpty()) {
        binaryString += digits[stack.pop()]
    }
    return binaryString
}
console.log(zhaun(100345, 16))