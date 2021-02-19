// 实现instanceof
function Instanceof(obj, target) {
    obj = obj._proto_;
    // 判断对象的类型是否等于类型的原型
    while (true) {
        // 如果__proto__ === null 说明原型链遍历完毕
        if (obj === null) {
            return false;
        }
        // 如果存在 obj.__proto__ === target.prototype
        // 说明对象是该类型的实例
        if (obj === target.prototype) {
            return true;
        }
        // 原型链上查找
        obj = obj.__proto__
    }
}

// 寄生组合式继承1
function extend(son, parent) {
    var F = function () {};
    F.prototype = parent.prototype;
    son.prototype = new F();
    son.prototype.constructor = son;
    son.parent = parent.prototype;
    if (parent.prototype.constructor === Object.prototype.constructor) {
        parent.prototype.constructor = parent;
    }
}
// 寄生组合式继承2
function extend2(son, father) {
    let prototype = Object(father.prototype);
    prototype.constructor = son;
    son.prototype = prototype;
}
// 示例
function Father(name) {
    this.name = name;
    console.log('father');
    this.colors = ["red", "blue", "green"];
}
Father.prototype.sayName = function () {
    console.log('father.prototype：' + this.name);
};
function Son(name, age) {
    Father.call(this, name); // 继承实例属性，第一次调用Father()
    this.age = age;
}
// 寄生组合式继承--继承父类方法,此处并不会第二次调用Father()
// extend(Son, Father);

// 组合继承--会调用两次Father()
Son.prototype = new Father();
Son.prototype.constructor = Son;
Son.prototype.sayAge = function () {
    console.log(this.age);
};

var instance1 = new Son("louis", 5);
instance1.colors.push("black");
console.log(instance1.colors); // "red, blue, green, black"
instance1.sayName(); // father.prototype：louis
instance1.sayAge(); // 5
//
// var instance2 = new Son("zhai", 10);
// console.log(instance2.colors); //"red,blue,green"
// instance2.sayName(); // father.prototype：zhai
// instance2.sayAge(); // 10
