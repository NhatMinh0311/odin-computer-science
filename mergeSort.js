function merge(leftHalf, rightHalf) {
    let mergedArray = [];
    while (leftHalf.length > 0 && rightHalf.length > 0) {
        if (leftHalf[0] < rightHalf[0]) {
            mergedArray.push(leftHalf[0]);
            leftHalf.shift();
        }
        else {
            mergedArray.push(rightHalf[0]);
            rightHalf.shift();
        }
            
    }
    if (rightHalf.length > 0) {
        return mergedArray.concat(rightHalf);
    }
    else if (leftHalf.length > 0) {
        return mergedArray.concat(leftHalf);
    }
    return mergedArray;
}

function mergeSort(array) {
    if (array.length <= 1) return array;
    let mid = Math.floor(array.length / 2);
    let leftHalf = mergeSort(array.slice(0, mid));
    let rightHalf = mergeSort(array.slice(mid, array.length));
    return merge(leftHalf, rightHalf);
}