'use strict'

const statusName = ["empty", "smile", "angry", "wall"];
const statusNum = arrayToObject(statusName);

const maskNum = { "show": 9, "hide": 4, "flag": 5, "check": 6, "miss": 7, "num": 8 }

const charaName = ["empty", "smile", "angry", "wall", "hide", "flag", "check", "miss", "num", "show"]
const charaNum = arrayToObject(charaName);
const charaSymbol = ["🟩", "😀", "😡", "🚫", "🟩", "🚩", "❔", "❌"];
const charaBgColor = [
    "lightgreen",   // 0 empty
    "#FFFFBF",      // 1 smile
    "violet",       // 2 angry
    "gray",         // 3 wall
    "#BFBFBF",      // 4 hide
    "#BFBFBF",      // 5 flag
    "#BFBFBF",      // 6 check
    "#BFBFBF",      // 7 miss
    "#FFFFBF"       // 8 number(数値表示)
];

const tableAppearanceNotFinished = {
    "empty": { "show": "empty", "hide": "hide", "flag": "flag", "check": "check", "num": "num" },
    "smile": { "show": "smile", "hide": "hide", "flag": "flag", "check": "check", "num": "num" },
    "angry": { "show": "angry", "hide": "hide", "flag": "flag", "check": "check", "num": "num" },
    "wall": { "show": "wall", "hide": "wall", "flag": "wall", "check": "wall", "num": "wall" }
}
const tableAppearanceFinished = {
    "empty": { "show": "empty", "hide": "hide", "flag": "miss", "check": "check", "num": "num" },
    "smile": { "show": "smile", "hide": "hide", "flag": "miss", "check": "check", "num": "num" },
    "angry": { "show": "angry", "hide": "angry", "flag": "flag", "check": "angry", "num": "num" },
    "wall": { "show": "wall", "hide": "wall", "flag": "wall", "check": "wall", "num": "wall" }
}

function getCharaObject(staNum, mskNum, isFinished) {
    const staName = charaName[staNum];
    const mskName = charaName[mskNum];

    // シンボル＝数字を返す処理
    if (mskNum <= 0) {
        return { "name": charaName[charaNum.num], "num": charaNum.num, "symbol": -mskNum, "bgColor": charaBgColor[charaNum.num] }
    }

    // シンボル＝キャラを返す処理
    let chrName;
    let chrNum;
    let chrSymbol;
    let chrBgColor;
    if (!isFinished) {
        chrName = tableAppearanceNotFinished[staName][mskName];
    } else {
        chrName = tableAppearanceFinished[staName][mskName];
    }
    chrNum = charaNum[chrName];
    chrSymbol = charaSymbol[chrNum];
    chrBgColor = charaBgColor[chrNum];
    return { "name": chrName, "num": chrNum, "symbol": chrSymbol, "bgColor": chrBgColor }
}


