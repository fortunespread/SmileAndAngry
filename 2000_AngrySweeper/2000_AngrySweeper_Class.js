'use strict'

class CellAngrySweeper extends CellBase {
    // ======== フィールド ========
    #initialStatus = []; // そのステージの最初のセル配置情報
    isFailed;
    initialNumOfAngry; // Angryの初期の数


    // ======== プロパティ ========

    // #initialStatus へのアクセス
    get initialStatus() { return this.#initialStatus; }
    get dataToShowInfo() {
        return {
            cSize: this.cSize,
            numOfAngry: this.numOfAngry,
            countOfPush: this.countOfPush,
            numOfHide: this.numOfHide,
            numOfFlag: this.numOfFlag,
            numOfCheck: this.numOfCheck
        };
    }

    // ======== コンストラクタ ========

    constructor(configCell) {
        super(configCell);
    }


    // ==== メソッド ====

    // ステージの最初にinitialStatusを読み込む
    setInitialStatus() {
        // 一旦全セルsmileに
        this.#initialStatus = [];
        for (let i = 0; i < this.cSize; i++) this.#initialStatus.push(statusNum.smile);

        // Angryの数決定を決めてセットする・・・セル数の1/4
        this.initialNumOfAngry = Math.floor(this.cSize / 4);
        for (let i = 0; i < this.initialNumOfAngry; i++) {
            let num;
            while (true) {
                num = Math.floor(Math.random() * this.cSize);
                if (this.#initialStatus[num] === statusNum.smile) { break; }
            }
            this.#initialStatus[num] = statusNum.angry;
        }
        logConsole.report(`Initial status setting completed successfully.`);
        console.log(this.makeStatusString(this.#initialStatus))
    }

    // ステージ開始とリセット
    tryOrRetry(str) {
        this.status = [];
        for (let i = 0; i < this.cSize; i++) this.status[i] = this.#initialStatus[i];
        this.mask = [];
        for (let i = 0; i < this.cSize; i++) this.mask[i] = maskNum.hide;

        this.isFailed = false;
        logConsole.report(`Stage ready.`);
        loggerAngrySweeper.show(str);
    }
    try() {
        this.tryOrRetry(`Now you try.`);
    }
    retry() {
        this.tryOrRetry(`Now you retry again.`);
    }


    // プッシュ処理
    pushCell(pos) {
        const cellName = this.getCellName(pos);
        logConsole.report(`${cellName} clicked left.`);
        this.sweepCell(pos, this.direct8.self);
        if (this.isFailed) {
            loggerAngrySweeper.show(`${charaSymbol[charaNum.angry]} is at ${cellName}`);
        }
    }

    sweepCell(pos, dirNum) {
        if (!this.isInField8(pos, dirNum)) { return; }
        const actualPos = pos + dirNum;
        const staNum = this.status[actualPos];
        const mskNum = this.mask[actualPos];

        // mskNum = show,flag,check,showの処理
        if (mskNum <= 0 || mskNum === maskNum.flag || mskNum === maskNum.check) { return; }

        // mskNum = hideの処理

        // staNum = Angryの処理
        if (staNum === statusNum.angry) {
            this.isFailed = true;
            return;
        }
        // staNum != Angryの処理
        const count = this.countOfAngryArround(actualPos);
        this.mask[actualPos] = -count;
        console.log(`pos = ${pos} / dirNum = ${dirNum} / actualPos = ${actualPos} / count = ${count}`);
        if (count > 0) { return; }
        for (const key in this.direct8) {
            if (key !== "self") { this.sweepCell(actualPos, this.direct8[key]); }
        }

    }

    actClickRightEvent(pos) {
        const cellName = this.getCellName(pos);
        logConsole.report(`${cellName} clicked right.`);
        if (this.mask[pos] <= 0) this.sweepArround(pos);
        this.raiseFlag(pos);
    }

    sweepArround(pos) {
        const mskNum = this.mask[pos];
        if (mskNum > 0) return;

        let numOfFlagArround = 0;
        for (const key in this.direct8) {
            const dirNum = this.direct8[key];
            if (!this.isInField4(pos, dirNum)) continue;
            if (this.mask[pos + dirNum] === maskNum.flag) numOfFlagArround++;
        }
        if (-mskNum !== numOfFlagArround) return;
        for (const key in this.direct8) {
            const dirNum = this.direct8[key];
            if (dirNum === this.direct8.self) continue;
            this.sweepCell(pos,dirNum);
        }
    }

    raiseFlag(pos) {
        switch (this.mask[pos]) {
            case maskNum.hide: {
                this.mask[pos] = maskNum.flag;
                return;
            }
            case maskNum.flag: {
                this.mask[pos] = maskNum.check;
                return;
            }
            case maskNum.check: {
                this.mask[pos] = maskNum.hide;
                return;
            }
        }
        return;
    }
    //プッシュ処理の反転処理
    countOfAngryArround(pos) {
        let countOfAngry = 0;
        for (const key in this.direct8) {
            const dirN = this.direct8[key];
            if (!this.isInField8(pos, dirN)) continue;
            // console.log(pos, dirN, pos + dirN, charaSymbol[this.status[pos + dirN]]);
            if (this.status[pos + dirN] === statusNum.angry) { countOfAngry++; }
        }
        return countOfAngry;
    }

    // クリア条件 numOfAngry=0かどうか
    isCleared() {
        return this.numOfFlag === this.initialNumOfAngry && this.numOfHide === 0;
    }

    isFinished() {
        return this.isCleared() || this.isFailed;
    }

    isClearedAndDoEvent() {
        if (!this.isCleared()) return false;
        loggerAngrySweeper.show("!! CONGRATURATIONS !!", "Stage cleared!!");
        return true;
    }

    // 次のステージへ行く処理
    goToNextStage() {
        this.setInitialStatus();
        loggerAngrySweeper.show(`Now you try new stage again!`);
    }
}

