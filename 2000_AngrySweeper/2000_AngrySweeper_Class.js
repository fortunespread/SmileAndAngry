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
        this.initialNumOfAngry = configCell.initialNumOfAngry;
    }


    // ==== メソッド ====

    // ステージの最初にinitialStatusを読み込む
    setInitialStatus() {
        // 一旦全セルsmileに
        this.#initialStatus = [];
        for (let i = 0; i < this.cSize; i++) this.#initialStatus.push(statusNum.smile);

        // Angryの数決定を決めてセットする・・・セル数の1/4
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

    // 左クリック処理
    actClickLeftEvent(pos) {
        this.showClickCellName("left", pos);

        if (this.isFinished()) {
            this.setInitialStatus();
            this.try();
            return;
        }
        this.pushCell(pos);
    }

    // 右クリック処理
    actClickRightEvent(pos) {
        this.showClickCellName("right", pos);

        if (this.isFinished()) {
            this.setInitialStatus();
            this.try();
            return;
        }
        if (this.mask[pos] <= 0) this.sweepArround(pos); else this.raiseFlag(pos);
    }


    // プッシュ処理
    pushCell(pos) {
        this.sweepCell(pos, this.direct9.self);
        if (this.isFailed) {
            const cellName = this.getCellName(pos);
            loggerAngrySweeper.show(`${charaSymbol[charaNum.angry]} is at ${cellName}`);
        }
    }

    sweepCell(pos, dirNum) {
        if (!this.isInField8(pos, dirNum)) { return; }
        const actualPos = pos + dirNum;
        const staNum = this.status[actualPos];
        const mskNum = this.mask[actualPos];

        // mskNum = 数字(<=0),flag,check,showの処理
        if (mskNum <= 0 || mskNum === maskNum.flag || mskNum === maskNum.check) { return; }

        // 以降、mskNum = hideの処理

        // staNum = Angryの処理
        if (staNum === statusNum.angry) {
            this.isFailed = true;
            return;
        }
        // staNum != Angryの処理
        const count = this.countOfAngryArround(actualPos);
        this.mask[actualPos] = -count;
        {
            const cellName = this.getCellName(pos);
            const actualCellName = this.getCellName(actualPos);
            logConsole.report(`${cellName} + dirNum = ${dirNum} => actual = ${actualCellName} / countOfAngry = ${count}`);
        }
        if (count > 0) { return; }
        for (const key in this.direct8) {
            this.sweepCell(actualPos, this.direct8[key]);
        }
    }

    sweepArround(pos) {
        const mskNum = this.mask[pos];
        if (mskNum > 0) { return; }

        let numOfFlagArround = 0;
        for (const key in this.direct8) {
            const dirNum = this.direct8[key];
            if (!this.isInField8(pos, dirNum)) continue;
            if (this.mask[pos + dirNum] === maskNum.flag) numOfFlagArround++;
        }
        if (-mskNum !== numOfFlagArround) return;
        for (const key in this.direct8) {
            const dirNum = this.direct8[key];
            this.sweepCell(pos, dirNum);
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

