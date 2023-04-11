'use strict'

class CellSmileAll extends CellBase {
    // ======== フィールド ========
    #stage = 0; // ステージ番号
    #initialStatus; // そのステージの最初のセル配置情報


    // ======== プロパティ ========

    // #stage へのアクセス
    get stage() { return this.#stage; }
    set stage(num) { this.#stage = num; }
    get stageName() { return `Stage#${this.#stage}`; }


    // ======== コンストラクタ =========

    constructor(configCell) {
        super(configCell);
        for (let i = 0; i < this.cSize; i++) this.mask[i] = maskNum.show;
        console.log(this.mask)
    }


    // ======== メソッド ========

    // ステージの最初にinitialStatusを読み込む
    setInitialStatus() {
        this.#initialStatus = createInitialCell(this.#stage, this.vSize, this.hSize);
        for (let i = 0; i < this.cSize; i++) this.mask[i] = maskNum.show;
        logConsole.report(`${this.stageName} initial status data setting completed successfully.`);
        console.log(this.makeStatusString(this.#initialStatus));
    }

    // ステージ開始とリセット
    tryOrRetry(str) {
        for (let i = 0; i < this.cSize; i++) this.status[i] = this.#initialStatus[i];
        this.countOfPush = 0;
        logConsole.report(`${this.stageName} ready.`);
        loggerSmileAll.show(str);
    }
    try() {
        this.tryOrRetry(`Now you try ${this.stageName}.`);
    }
    retry() {
        this.tryOrRetry(`Now you retry ${this.stageName} again.`);
    }

    //プッシュ処理
    pushCell(pos) {
        const cellName = this.getCellName(pos);
        logConsole.event(`${cellName} clicked.`);
        if (!this.isReversible(pos, this.direct5.self)) return;
        let log = "";
        loggerSmileAll.clearAdd(`Push ${cellName}, counter increased to ${++this.countOfPush}.`);
        for (const key in this.direct5) { this.reverseCell(pos, this.direct5[key]); }
        loggerSmileAll.show();
    }

    //プッシュ処理の反転処理
    reverseCell(pos, dirNum) {
        if (!this.isReversible(pos, dirNum)) return false;

        const targetPos = pos + dirNum;
        let statusBefore;
        let statusAfter;
        switch (this.status[targetPos]) {
            case statusNum.smile: {
                statusBefore = statusNum.smile;
                statusAfter = statusNum.angry;
                break;
            }
            case statusNum.angry: {
                statusBefore = statusNum.angry;
                statusAfter = statusNum.smile;
                break;
            }
            default: return;
        }
        this.status[targetPos] = statusAfter;
        loggerSmileAll.addln(`${this.getCellName(targetPos)} ${charaSymbol[statusBefore]} turned into ${charaSymbol[statusAfter]}.`);
    }

    isReversible(pos, dirNum) {
        if (!this.isInField4(pos, dirNum)) return false;
        const status = this.status[pos + dirNum];
        if (status === statusNum.smile || status === statusNum.angry) return true; else false;
    }

    // クリア条件 numOfAngry=0かどうか
    isCleared() {
        return this.numOfAngry === 0;
    }
    // クリア、失敗条件
    isFinished() {
        return this.numOfAngry === 0;
    }

    isClearedAndDoEvent() {
        if (this.numOfAngry !== 0) return false;
        loggerSmileAll.show("!! CONGRATURATIONS !!", `Stage ${this.#stage} cleared!!`);
        return true;
    }

    // 次のステージへ行く処理
    goToNextStage() {
        this.#stage++;
        this.setInitialStatus();
        loggerSmileAll.show(`Now you try stage ${this.#stage}!`);
    }
}