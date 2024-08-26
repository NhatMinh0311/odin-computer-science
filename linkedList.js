class Node {
    nextNode = null;
    constructor(value) {
        this.value = value;
    }
}

class LinkedList {
    firstNode = null;
    append(value) {
        if (this.firstNode  === null) {
            this.prepend(value);
        }
        else {
            let temp = this.firstNode ;
            while (temp.nextNode !== null) {
                temp = temp.nextNode;
            }
            temp.nextNode = new Node(value);
        }
    }
    prepend(value) {
        let temp = this.firstNode ;
        this.firstNode  = new Node(value);
        this.firstNode .nextNode = temp;
    }
    size() {
        let temp = this.firstNode ;
        let cnt = 0;
        while (temp !== null) {
            cnt += 1;
            temp = temp.nextNode;
        }
        return cnt;
    }
    head() {
        return this.firstNode;
    }
    tail() {
        if (this.firstNode === null) return null;
        else {
            let temp = this.firstNode;
            while (temp.nextNode !== null) {
                temp = temp.nextNode;
            }
            return temp;
        }
        
    }
    at(index) {
        if (index >= this.size()) {
            return null;
        }
        let cnt = 0;
        let temp = this.firstNode;
        while (cnt < index) {
            temp = temp.nextNode;
            cnt += 1;
        }
        return temp;
    }
    pop(){
        let temp = this.firstNode;
        if (temp === null) return;
        else if (temp.nextNode === null) {
            this.firstNode = null;
        }
        else {
            while (temp.nextNode.nextNode !== null) {
                temp = temp.nextNode;
            }
            temp.nextNode = null;
        }
    }
    contains(value) {
        let temp = this.firstNode;
        while (temp !== null) {
            if (temp.value === value) {
                return true;
            }
            temp = temp.nextNode;
        }
        return false;
    }
    find(value) {
        let cnt = 0;
        let temp = this.firstNode;
        while (temp !== null) {
            if (temp.value === value) {
                return cnt;
            }
            temp = temp.nextNode;
            cnt += 1;
        }
        return null;
    }
    toString() {
        let listString = "";
        let temp = this.firstNode;
        while (temp !== null) {
            listString += `(${temp.value}) -> `;
            temp = temp.nextNode;
        }
        listString += "null";
        return listString;
    }
    insertAt(value, index) {
        if (index >= this.size()){
            this.append(value);
        }
        else if (index <= 0) {
            this.prepend(value);
        }
        else {
            let cnt = 0;
            let temp = this.firstNode;
            while (cnt < index - 1) {
                temp = temp.nextNode;
                cnt += 1;
            }
            let newNode = new Node(value);
            newNode.nextNode = temp.nextNode;
            temp.nextNode = newNode;
        }
    }
    removeAt(index) {
        if (index >= this.size() || index < 0) return;
        else if (index === 0) {
            this.firstNode = this.firstNode.nextNode;
        }
        else {
            let temp = this.firstNode;
            let cnt = 0;
            while (cnt < index - 1) {
                temp = temp.nextNode;
                cnt += 1;
            }
            temp.nextNode = temp.nextNode.nextNode;
        }
    }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());