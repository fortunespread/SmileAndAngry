'use strict'

const attackerName = ["player", "comp1", "comp2"];
const attackerNum = arrayToObject(attackerName);
const situationName = ["setting", "playing", "finished"];
const situationNum = arrayToObject(situationName);

class CellSmile8x8 extends CellBase {
    // ======== フィールド ========
    #initialStatus = []; // そのステージの最初のセル配置情報
    attacker = [];
    attackerCharaNum = [];
    turn;
    me;
    you;

    // ======== プロパティ ========
    get turnOpponent() { return 1 - this.turn; }


    // #initialStatus へのアクセス
    get initialStatus() { return this.#initialStatus; }
    get dataToShowInfo() {
        const count = [];
        const turn = [];
        if (this.attackerCharaNum[0] === statusNum.smile) {
            count[0] = this.numOfSmile
            count[1] = this.numOfAngry;
        } else {
            count[0] = this.numOfAngry;
            count[1] = this.numOfSmile;
        }
        if (this.turn === 0) {
            turn[0] = charaSymbol[charaNum.flag];
            turn[1] = "";
        } else {
            turn[0] = "";
            turn[1] = charaSymbol[charaNum.flag];
        }
        return {
            who: [
                attackerName[this.attacker[0]],
                attackerName[this.attacker[1]]
            ],
            face: [
                charaSymbol[this.attackerCharaNum[0]],
                charaSymbol[this.attackerCharaNum[1]]
            ],
            count: count,
            turn: turn
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
        for (let i = 0; i < this.cSize; i++) {
            this.initialStatus[i] = statusNum.empty;
            this.mask[i] = maskNum.show;
        }
        {
            // 左上
            const v = this.vSize / 2 - 1;
            const h = this.hSize / 2 - 1;
            this.#initialStatus[this.vhToPos(v, h)] = statusNum.smile;
            this.#initialStatus[this.vhToPos(v, h + 1)] = statusNum.angry;
            this.#initialStatus[this.vhToPos(v + 1, h)] = statusNum.angry;
            this.#initialStatus[this.vhToPos(v + 1, h + 1)] = statusNum.smile;
        }

        // 先攻・後攻 player,computer;
        this.attacker[0] = attackerNum.player;
        this.attacker[1] = attackerNum.player;
        // 先攻・後攻 😀😡
        this.attackerCharaNum[0] = statusNum.smile;
        this.attackerCharaNum[1] = statusNum.angry;
        console.log("set ", this.attackerCharaNum);
        // 先攻ターン
        this.turn = 0;

        this.me = this.attackerCharaNum[this.turn];
        this.opponent = this.attackerCharaNum[this.turnOpponent];

        logConsole.report(`Initial status setting completed successfully.`);
        console.log(this.makeStatusString(this.#initialStatus))
    }

    // ステージ開始とリセット
    try() {

        this.status = [];
        for (let i = 0; i < this.cSize; i++) this.status[i] = this.#initialStatus[i];

        logConsole.report("Stage ready.");
        loggerSmile8x8.show("Lets begin the game.");
    }


    // 左クリック処理
    actClickLeftEvent(pos) {
        this.showClickCellName("left", pos);
        this.pushCell(pos);
    }

    // 右クリック処理
    actClickRightEvent(pos) {
        this.showClickCellName("right", pos);
        return;
    }

    turnNext() {
        this.turn = 1 - this.turn;
        this.me = this.attackerCharaNum[this.turn];
        this.opponent = this.attackerCharaNum[this.turnOpponent];
    }

    // セルposが1方向にリバースできるセル数を計数
    countGainOnDirect1(pos, dirNum) {
        let currentPos = pos;
        let countGain = 0;
        while (true) {
            if (!this.isInField8(currentPos, dirNum)) return 0;
            currentPos += dirNum;
            if (this.status[currentPos] === this.me) return countGain;
            if (this.status[currentPos] !== this.opponent) return 0;
            countGain++;
        }
    }
    // セルposが8方向にリバースできるセル数を計数
    countGainOnDirect8(pos) {
        let countGain = 0;
        for (const key in this.direct8) countGain += this.countGainOnDirect1(pos, this.direct8[key]);
        return countGain;
    }

    // セルposから1方向にリバース可能かどうか
    // 高速処理重視　posがmeの確認、ゲイン数の確認をしない
    isReversibleOnDirect1(pos, dirNum) {
        let currentPos = pos;
        while (true) {
            if (!this.isInField8(pos, dirNum)) return false;
            if (this.status[currentPos + dirNum] === this.me) return currentPos !== pos; // 1つ以上相手を挟んでいるか
            currentPos += dirNum;
            if (this.status[currentPos] !== this.opponent) return false;
        }
    }

    // そのセルはリバース可能か
    isReversibleOnDirect8(pos) {
        if (this.status[pos] !== statusNum.empty) return false;
        for (const key in this.direct8) {
            if (this.countGainOnDirect1(pos, this.direct8[key]) > 0) return true;
        }
        return false;
    }

    // リバースさせる
    reverseCellOnDirect1(pos, dirNum) {
        let currentPos = pos;
        const numOfGain = this.countGainOnDirect1(pos, dirNum);
        for (let i = 0; i < numOfGain; i++) {
            currentPos += dirNum;
            this.status[currentPos] = this.me;
        }
        return numOfGain;
    }

    reverseCellOnDirect8(pos) {
        let numOfGain = 0;
        for (const key in this.direct8) numOfGain += this.reverseCellOnDirect1(pos, this.direct8[key]);
        if (numOfGain === 0) return 0;
        this.status[pos] = this.me;
        this.turnNext();
        return numOfGain;
    }


    // プッシュ処理
    pushCell(pos) {
        // for (const key in this.direct8) {
        //     const numOfGain = this.countGainOnDirect1(pos, this.direct8[key]);
        //     const isReversible = this.isReversibleOnDirect1(pos, this.direct8[key]);
        //     console.log(`${key} : ${numOfGain} -- ${isReversible}.`);
        // }
        if (!this.isReversibleOnDirect8(pos)) return 0;
        return this.reverseCellOnDirect8(pos);
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
        loggerSmile8x8.show("!! CONGRATURATIONS !!", "Stage cleared!!");
        return true;
    }

    // 次のステージへ行く処理
    goToNextStage() {
        this.setInitialStatus();
        loggerSmile8x8.show(`Now you try new stage again!`);
    }
}

