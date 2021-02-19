// 散列表
import { defaultToString, ValuePair } from './util.js';
import { LinkedList } from './linkedlist';

// 通过分离链接、线性探查、双散列法处理冲突
class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    loseHashCode(key) {
        if (typeof key === 'number') return key;
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        // 目的是得到这个key的ASCII值，防止数值过大和任意一个数取余
        return hash % 37;
    }
    hashCode(key) {
        return this.loseHashCode(key);
    }
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.table[position] == null) {
                // 分离链接法处理hashtable冲突--借助链表
                this.table[position] = new LinkedList();
            }
            this.table[position].push(new ValuePair(key, value));
            return true;
        }
        return false;
    }
    remove(key) {
        const position = this.hashCode(key);
        const linkedlist = this.table[position];
        if (linkedlist && !linkedlist.isEmpty()) {
            let current = linkedlist.getHead();
            while(current != null) {
                if (current.element.key === key) {
                    linkedlist.remove(current.element);
                    if (linkedlist.isEmpty) {
                        delete this.table[position];
                    }
                    return true;
                }
                current = current.next;
            }
        }
        return false;
    }
    get(key) {
        const valuePair = this.table[this.hashCode(key)];
        const linkedlist = this.table[position];
        if (linkedlist && !linkedlist.isEmpty()) {
            let current = linkedlist.getHead();
            // 递归链表
            while(current != null) {
                if (current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }
        }
        return undefined;
    }
    isEmpty() {
        return Object.keys(this.table).length === 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
        for (let i = 1; i < keys.length; i++) {
            objString = `${objString}, {${keys[i]} => ${this.table[keys[i]].toString()}}`
        }
        return objString;
    }
}
const hash = new HashTable();
hash.put('Ygritte', 'Ygritte@qq.com');
hash.put('Jonathan', 'Jonathan@qq.com');
hash.put('Jamie', 'Jamie@qq.com');
hash.put('Jack', 'Jack@qq.com');
hash.put('Jasmine', 'Jasmine@qq.com');
hash.put('Jake', 'Jake@qq.com');
hash.put('Nathan', 'Nathan@qq.com');
hash.put('Athelstan', 'Athelstan@qq.com');
hash.put('Sue', 'Sue@qq.com');
hash.put('Aethelwulf', 'Aethelwulf@qq.com');
hash.put('Sargeras', 'Sargeras@qq.com');
console.log(hash.toString());
// console.log(hash.hashCode('Ygritte') + '-Ygritte');
// console.log(hash.hashCode('Jonathan') + '-Jonathan');
// console.log(hash.hashCode('Jamie') + '-Jamie');
// console.log(hash.hashCode('Jack') + '-Jack');
// console.log(hash.hashCode('Jasmine') + '-Jasmine');
// console.log(hash.hashCode('Jake') + '-Jake');
// console.log(hash.hashCode('Nathan') + '-Nathan');
// console.log(hash.hashCode('Athelstan') + '-Athelstan');
// console.log(hash.hashCode('Sue') + '-Sue');
// console.log(hash.hashCode('Aethelwulf') + '-Aethelwulf');
// console.log(hash.hashCode('Sargeras') + '-Sargeras');



