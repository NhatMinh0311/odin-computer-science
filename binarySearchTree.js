class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array = []) {
        this.root = this.buildTree(array);
    }

    buildTree(array, firstTime = true) {
        if (array.length === 0) return null;
        if (firstTime){
            array.sort((a, b) => a - b);
            for (let i = 0; i < array.length; i++) {
                if (array[i] === array[i + 1]) {
                    array.splice(i, 1);
                    i--;
                }
            }
        }
        let mid = Math.floor(array.length / 2);
        const newNode = new Node(array[mid]);
        newNode.left = this.buildTree(array.slice(0, mid), false);
        newNode.right = this.buildTree(array.slice(mid + 1), false);
        return newNode;
    }

    insert(value) {
        let temp = this.root;
        if (temp === null) {
            this.root = new Node(value);
            return;
        }
        while (true) {
            if (value === temp.value) {
                return;
            }
            else if (value < temp.value) {
                if (temp.left === null) {
                    temp.left = new Node(value);
                    break;
                }
                temp = temp.left;
            }
            else {
                if (temp.right === null) {
                    temp.right = new Node(value);
                    break;
                }
                temp = temp.right;
            }
        }
    }

    delete(value) {
        if (this.root.value !== value) {
            let ptr1 = this.root;
            let ptr2 = (value < ptr1.value) ? ptr1.left : ptr1.right;
            while (ptr2 !== null) {
                if (value === ptr2.value){
                    if (ptr2.left === null || ptr2.right === null) {
                        if (ptr2.left === null) {
                            ptr2 = ptr2.right;
                        }
                        else {
                            ptr2 = ptr2.left;
                        }
                        if (ptr1.left.value === value) {
                            ptr1.left = ptr2;
                        }
                        else {
                            ptr1.right = ptr2;
                        }
                    }
                    else {
                        const succesorValue = this.getSuccesorValue(ptr2);
                        this.delete(succesorValue)
                        ptr2.value = succesorValue;
                    }
                    return true;
                }
                else {
                    ptr1 = ptr2;
                    ptr2 = (value < ptr2.value) ? ptr2.left : ptr2.right;
                }
            }
            return false;
        }
        else {
            if (this.root.left === null) {
                this.root = this.root.right;
                return;
            }
            else if (this.root.right === null) {
                this.root = this.root.left;
                return;
            }
            else {
                const succesorValue = this.getSuccesorValue(this.root);
                this.delete(succesorValue)
                this.root.value = succesorValue;
            }
            return true;
        }   
    }

    getSuccesorValue(node) {
        node = node.right;
        while(node.left) {
            node = node.left;
        }
        return node.value;
    }

    find(value) {
        let temp = this.root;
        while (temp !== null && temp.value !== value) {
            if (value < temp.value) {
                temp = temp.left;
            }
            else {
                temp = temp.right;
            }
        }
        return temp;
    }

    levelOrder(callback, ptr = this.root) {
        if (ptr === null) {
            return;
        }
        if (!callback) {
            throw new Error("Callback function not passed as parameter.");
        }
        const queue = [];
        queue.push(ptr);
        for (let i = 0; i < queue.length; i++) {
            if (queue[i].left !== null) {
                queue.push(queue[i].left);
            }
            if (queue[i].right !== null) {
                queue.push(queue[i].right);
            }
        }
        queue.forEach((node) => callback(node));
    }

    inOrder(callback, ptr = this.root) {
        if (ptr === null) return;
        if (!callback) {
            throw new Error("Callback function not passed as parameter.");
        }
        this.inOrder(callback, ptr.left);
        callback(ptr);
        this.inOrder(callback, ptr.right);
    }

    preOrder(callback, ptr = this.root) {
        if (ptr === null) return;
        if (!callback) {
            throw new Error("Callback function not passed as parameter.");
        }
        callback(ptr);
        this.preOrder(callback, ptr.left);
        this.preOrder(callback, ptr.right);
    }

    postOrder(callback, ptr = this.root) {
        if (ptr === null) return;
        if (!callback) {
            throw new Error("Callback function not passed as parameter.");
        }
        this.postOrder(callback, ptr.left);
        this.postOrder(callback, ptr.right);
        callback(ptr);
    }

    height(node) {
        if (node === null) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(node) {
        if (node === null || this.find(node.value) === null) return -1;
        let currentDepth = 0;
        let ptr = this.root;
        while (ptr.value !== node.value) {
            ptr = (node.value > ptr.value) ? ptr.right : ptr.left;
            currentDepth++;
        }
        return currentDepth;

    }

    isBalanced(node = this.root) {
        if (node === null) {
            return true;
        }
        else {
            if (Math.abs(this.height(node.left) - this.height(node.right)) > 1)  {
                return false;
            }
            return this.isBalanced(node.left) && this.isBalanced(node.right);
        }
    }

    rebalance() {
        const allValues = [];
        this.inOrder((node) => allValues.push(node.value));
        this.root = this.buildTree(allValues);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }     
 }

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function creatArray() {
    let thisArray = [];
    let length = getRandomNumber(10, 20);
    for (let i = 0; i < length; i++) {
        thisArray.push(getRandomNumber(1, 100));
    }
    return thisArray;
}

function printValue(node) {
    console.log(node.value);
}

const myArray = creatArray();

const test = new Tree(myArray);

test.prettyPrint();