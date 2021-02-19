// 比较两个元素是否相等
function defaultEquals(a, b) {
    return a === b
}
class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}
export class LinkedList {
    // 可以自定义传入比较元素相等的方法，如果没有使用defaultEquals
    constructor(equalsFn = defaultEquals) {
        this.count = 0; // 存储链biao数量
        this.head = undefined; // 第一个元素
        this.equalsFn = equalsFn; // 判断两个元素是否相等
    }
    // 向链表尾部添加一个元素
    push(element) {
        const node = new Node(element);
        let current;
        // 头部为空
        if (this.head == null) {
            this.head = node;
            // 头部不为空
        } else {
            current = this.head; // 当前元素
            while (current.next != null) { // 获取最后一项
                current = current.next;
            }
            // 将next赋值为新元素，建立链接
            current.next = node;
        }
        this.count++;
    }
    // 从链表中移除元素，并返回移除项
    removeAt(index) {
        // 检查越界值
        if (index >= 0 && index < this.count) {
            let current = this.head;
            // 移除第一项
            if (index === 0) {
                this.head = current.next;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    // 查找元素位置
    getElementAt(index) {
        if (index >= 0 && index < this.count) {
            let node = this.head;
            for (let i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }
    // 在任意处插入元素
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) { // 在第一个位置添加
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                node.next = current;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    // 查找元素位置
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    // 从链表中移除元素
    remove(element) {
        const index = this.getElementAt(element);
        return this.removeAt(index);
    }
    // size
    size() {
        return this.count;
    }
    isEmpty() {
        return this.size() === 0;
    }
    // toString
    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
}
const list = new LinkedList();
list.push(12);
list.push(11);
list.push(13);
list.push(14);
list.insert(3, 3);
// list.removeAt(2);
console.log(list);
const fibonacci = (n) => {
    let a = 0;
    let b = 1;
    let i = 1;
    while (i++ <= n) {
        [a, b] = [b, a + b];
    }
    return a;
};
console.log(fibonacci(8));
// 双向链表
class DoublyNode extends Node {
    constructor(element, node, prev) {
        super(element, next);
        this.prev = prev;
    }
}
class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.tail = undefined;
    }
    inset(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element);
            let curent = this.head;
            // 0
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    curent.prev = node;
                    this.head = node;
                }
                // 最后一个
            } else if (index === this.count) {
                curent = this.tail;
                curent.next = node;
                node.prev = curent;
                this.tail = node;
                // 中间
            } else {
                const previous = this.getElementAt(index - 1);
                curent = previous.next;
                node.next = curent;
                previous.next = node;
                curent.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = undefined;
                } else {
                    const removed = this.head;
                    current = this.getElementAt(this.size());
                    this.head = this.head.next;
                    current.next = this.head;
                    current = removed;
                }
            } else {
                // 不需要修改循环链表最后一个元素
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}
const Doublylink = new DoublyLinkedList();
Doublylink.push(1);
Doublylink.push(2);
Doublylink.insert(3, 2);
console.log(Doublylink);