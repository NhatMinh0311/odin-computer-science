class HashMap {
    constructor(loadFactor) {
        this.buckets = [];
        this.capacity = 16;
        this.size = 0;
        this.loadFactor = (loadFactor !== undefined && loadFactor > 0.75 && loadFactor < 1) ? loadFactor : 0.75;
        this.initBuckets();
    }
    initBuckets() {
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = [];
        }
    }
    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
        }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.size++;
        
        if (this.size >= (this.capacity * this.loadFactor)) {
            this.grows();
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }
    
    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.initBuckets();
        this.size = 0;
    }

    keys() {
        let allKeys = [];
        for (let i = 0; i < this.capacity; i++) {
            const bucket = this.buckets[i];
            for (let j = 0; j < bucket.length; j++) {
                allKeys.push(bucket[j][0]);
            }
        }
        return allKeys;
    }

    entries() {
        let allEntries = [];
        for (let i = 0; i < this.capacity; i++) {
            const bucket = this.buckets[i];
            for (let j = 0; j < bucket.length; j++) {
                allEntries.push([bucket[j][0], bucket[j][1]]);
            }
        }
        return allEntries;
    }

    grows() {
        const oldBuckets = this.copy();
        this.capacity *= 2;
        this.clear();
        for (let i = 0; i < oldBuckets.length; i++) {
            const oldBucket = oldBuckets[i];
            for (let j = 0; j < oldBucket.length; j++) {
                const index = this.hash(oldBucket[j][0]);
                this.buckets[index].push([oldBucket[j][0], oldBucket[j][1]]);
                this.size++;
            }
        }
    }

    copy() {
        let copiedArray = [];
        for (let i = 0; i < this.capacity; i++) {
            copiedArray[i] = [];
            const bucket = this.buckets[i];
            for (let j = 0; j < bucket.length; j++) {
                copiedArray[i].push([bucket[j][0], bucket[j][1]]);
            }
        }
        return copiedArray;
    }
}


const test = new HashMap()

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')


