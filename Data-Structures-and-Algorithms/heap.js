/**
 * there is an open issue regarding the performance of the destructuring operation
 * being slower than the normal assignment
 */
// const swap = (array, a, b) => [array[a], array[b]] = [array[b], array[a]];
function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

const Compare = {
    LESS_THAN: -1,
    EQUALS: 0,
    BIGGER_THAN: 1
};

function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS;
    }

    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a);
}

class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.heap = [];
    }

    getLeftIndex(index) {
        return 2 * index + 1;
    }

    getRightIndex(index) {
        return 2 * index + 2;
    }

    getParentIndex(index) {
        if (index === 0) {
            return undefined;
        }

        return Math.floor((index - 1) / 2);
    }

    insert(value) {
        if (value == null) {
            return false;
        }

        this.heap.push(value);
        this.siftUp(this.heap.length - 1);
        return true;
    }

    siftUp(index) {
        let parent = this.getParentIndex(index);
        while(
            index > 0 && 
            this.compareFn(this.heap[index], this.heap[parent]) === Compare.LESS_THAN
        ) {
            swap(this.heap, parent, index);
            index = parent;
            parent = this.getParentIndex(index);
        }
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0]
    }

    extract() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }

        const removedValue = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.siftDown(0);
        return removedValue;
    }

    siftDown(index) {
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();

        if (
            left < size && 
            this.compareFn(this.heap[left], this.heap[element]) === Compare.LESS_THAN
        ) {
            element = left;
        }
        if (
            right < size && 
            this.compareFn(this.heap[right], this.heap[element]) === Compare.LESS_THAN
        ) {
            element = right;
        }

        if (element != index) {
            swap(this.heap, index, element);
            this.siftDown(element);
        }
    }
}

class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = reverseCompare(compareFn);
    }
}