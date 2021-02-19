class queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    // 向尾部插入新项
    enqueue(element) {
        this.items[this.count] = element;
        this.count++;
    }
    dequeue() {
        if (this.empty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    empty() {
        return this.count - this.lowestCount === 0;
    }
    toString() {
        if (this.empty()) {
            return ''
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`
        }
        return objString;
    }
}