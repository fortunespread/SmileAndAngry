'use strict'

function getFuncVhToPos(hSize) { return (v, h) => v * hSize + h; }
function getFuncPosToV(hSize) { return (pos) => Math.floor(pos / hSize); }
function getFuncPosToH(hSize) { return (pos) => pos % hSize; }
function getFuncPosToVh(hSize) { return (pos) => { return { v: Math.floor(pos / hSize), h: pos % hSize }; }; }

function getObjDirect4(hSize) {
    return { upper: -hSize, left: -1, self: 0, right: +1, lower: +hSize, };
}

function getObjDirect8(hSize) {
    return {
        UpL: -hSize - 1, upper: -hSize, UpR: -hSize + 1,
        left: -1, self: 0, right: +1,
        LoL: +hSize - 1, lower: +hSize, LoR: +hSize + 1
    };
}


// その方向がフィールドの中かを返す関数を返す
function getFuncIsInField4(vSize, hSize) {
    const direct4 = getObjDirect4(hSize);
    return (pos, dirNum) => {
        if (dirNum === direct4.upper && pos < hSize) return false;
        if (dirNum === direct4.left && pos % hSize === 0) {return false;}
        if (dirNum === direct4.right && pos % hSize === hSize - 1) return false;
        if (dirNum === direct4.lower && pos >= hSize * (vSize - 1)) return false;
        return true;
    }
}

function getFuncIsInField8(vSize, hSize) {
    const direct8 = getObjDirect8(hSize);
    return (pos, dirNum) => {
        if (dirNum === direct8.UpL && (pos < hSize || pos % hSize === 0)) return false;
        if (dirNum === direct8.upper && pos < hSize) return false;
        if (dirNum === direct8.UpR && (pos < hSize || pos % hSize === hSize - 1)) return false;

        if (dirNum === direct8.left && pos % hSize === 0) return false;
        if (dirNum === direct8.right && pos % hSize === hSize - 1) return false;

        if (dirNum === direct8.LoL && (pos >= hSize * (vSize - 1) || pos % hSize === 0)) return false;
        if (dirNum === direct8.lower && pos >= hSize * (vSize - 1)) return false;
        if (dirNum === direct8.LoR && (pos >= hSize * (vSize - 1) || pos % hSize === hSize - 1)) return false;
        return true;
    }
}

function getFuncGetCellName(hSize, fig) {
    return (pos) => {
        const vh = getFuncPosToVh(hSize)(pos);
        return `Cell#${padZeroToNum(vh.v, fig)}-${padZeroToNum(vh.h, fig)}`;
    }
}