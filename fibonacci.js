function fibs(n) {
    if (n <= 0) return [];
    else if (n === 1) return [0];
    let fibArray = [0, 1];
    for (let i = 2; i < n; i++) {
        fibArray.push(fibArray[i - 1] + fibArray[i - 2]);
    }
    return fibArray;
}

function fibsRec(n) {
    if (n > 2) {
        let Fibs = fibsRec(n - 1);
        Fibs.push(Fibs[n - 2] + Fibs[n - 3]);
        return Fibs;
    }
    else if (n === 2) return [0, 1];
    else if (n === 1) return [0];
    else {
        return [];
    }     
}