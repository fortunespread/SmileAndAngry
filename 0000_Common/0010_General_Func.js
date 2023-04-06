'use strict'

// object1にobject2を加える。結果は参照渡し
function addObject(object1, object2) {
    for (const key in object2) object1[key] = object2[key];
}


// 大きさを確定させた2次元配列を作成する
function createBoxArray(vSize, hSize) {
    const array = [];
    for (let v = 0; v < vSize; v++) {
        const arrayH = [];
        for (let h = 0; h < hSize; h++) arrayH.push("");
        array.push(arrayH);
    }
    return array;
}

// 配列中の対象の数を数える
function countSomethingInArray(something, array) {
    let count = 0;
    array.forEach(x => { if (x === something) count++; });
    return count;
}

// 配列の要素をセパレータを介してつないた文字列を返す
function joinString(separator, ...array) {
    const n = array.length;
    if (n === 0) return "";
    if (n === 1) return array[0];
    let str = array[0];
    for (let i = 1; i < n; i++) str += separator + array[i];
    return str;
}

// 数値の桁数を揃える
function padZeroToNum(num, fig) {
    return num.toString().padStart(fig, "0");
}

// consolo.logに色を付けて表示する
const logConsole = {
    black: "\u001b[30m",
    red: "\u001b[31m",
    green: "\u001b[32m",
    yellow: "\u001b[33m",
    blue: "\u001b[34m",
    magenta: "\u001b[35m",
    cyan: "\u001b[36m",
    white: "\u001b[37m",

    report: (str) => console.log(logConsole.green + "[Report] " + str),
    event: (str) => console.log(logConsole.yellow + "[Event] " + str),
    alert: (str) => console.log(logConsole.red + "[Alert] " + str)
}