'use strict'

class CellBase {
    // ======== フィールド ========
    configCell;
    #status = []; // 現在のセル配置情報
    #mask = []; // maskNum.showで不変
    #countOfPush; // プッシュ回数

    // ======== クロージャ関数 (カリー化) ========
    vhToPos;
    posToV;
    posToH;
    getCellName;
    direct4; // 4方向
    direct5; // 4方向∔自己
    direct8; // 8方向
    direct9; // 8方向∔事故
    isInField4; // フィールド内
    isInField8;

    // ======== プロパティ ========

    // #vSize, #hSize, #cSize へのアクセス
    get vSize() { return this.configCell.vSize; }
    get hSize() { return this.configCell.hSize; }
    get cSize() { return this.vSize * this.hSize; }

    // #status へのアクセス
    get status() { return this.#status; }
    set status(value) { this.#status = value; }

    // #mask へのアクセス
    get mask() { return this.#mask; }
    set mask(value) { this.#mask = value; }

    // #countOfPush へのアクセス
    get countOfPush() { return this.#countOfPush; }
    set countOfPush(value) { this.#countOfPush = value; }

    // smile,angryの計数
    get numOfSmile() { return countSomethingInArray(statusNum.smile, this.#status); }
    get numOfAngry() { return countSomethingInArray(statusNum.angry, this.#status); }
    get numOfHide() { return countSomethingInArray(charaNum.hide, this.#mask); }
    get numOfFlag() { return countSomethingInArray(charaNum.flag, this.#mask); }
    get numOfCheck() { return countSomethingInArray(charaNum.check, this.#mask); }

    // Fieldでのshow用
    get dataToShowField() {
        return { status: this.#status, mask: this.#mask, isFinished: this.isFinished() }
    }


    // ======== コンストラクタ =========

    constructor(configCell) {
        this.configCell = configCell;
        this.vhToPos = getFuncVhToPos(this.hSize);
        this.posToV = getFuncPosToV(this.hSize);
        this.posToH = getFuncPosToH(this.hSize);
        this.getCellName = getFuncGetCellName(this.hSize);
        this.direct4 = getObjDirect4(this.hSize);
        this.direct5 = getObjDirect5(this.hSize);
        this.direct8 = getObjDirect8(this.hSize);
        this.direct9 = getObjDirect9(this.hSize);
        this.isInField4 = getFuncIsInField4(this.vSize, this.hSize);
        this.isInField8 = getFuncIsInField8(this.vSize, this.hSize);
    }


    // ======== メソッド ========

    logClickCellName(click, pos) {
        const cellName = this.getCellName(pos);
        logConsole.event(`${cellName} clicked ${click}.`);
    }

    makeStatusString(status) {
        let resultStr = "";
        for (let v = 0; v < this.vSize; v++) {
            if (v > 0) resultStr += "\n";
            for (let h = 0; h < this.hSize; h++) {
                const staNum = status[this.vhToPos(v, h)];
                resultStr += charaSymbol[staNum];
            }
        }
        return resultStr;
    }

    makeCharaString(status, mask, isFinished) {
        let resultStr = "";
        for (let v = 0; v < this.vSize; v++) {
            if (v > 0) resultStr += "\n";
            for (let h = 0; h < this.hSize; h++) {
                const staNum = status[this.vhToPos(v, h)];
                const mskNum = mask[this.vhToPos(v, h)];
                resultStr += getCharaObject(staNum, mskNum, isFinished).symbol;
            }
        }
        return resultStr;
    }
}