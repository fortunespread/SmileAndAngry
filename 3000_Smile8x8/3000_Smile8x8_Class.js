'use strict'

const attackerName = ["player", "comp1"];
const attackerNum = arrayToObject(attackerName);
const modeName = ["setting", "playing", "finished"];
const modeNum = arrayToObject(modeName);

class CellSmile8x8 extends CellBase {
    // ======== フィールド ========
    // #initialStatus = []; // そのステージの最初のセル配置情報
    attacker = []; // 0先手、1後手がplayerかcomか attackerNumが対応
    attackerStatusNum = []; // 0先手、1後手が😀か😡か statusNumが対応
    #turn;
    staNumSelf; // ターン側の自己statusNum;
    staNumOppo; // ターン側の相手statusNum
    mode;

    // ======== プロパティ ========
    get dataToShowInfo() {
        return {
            attacker: this.attacker,
            attackerStatusNum: this.attackerStatusNum,
            mode: this.mode,
            numOfSmile: this.numOfSmile,
            numOfAngry: this.numOfAngry,
            turn: this.turn
        };
    }
    get turn() { return this.#turn; }

    // ======== コンストラクタ ========

    constructor(configCell) {
        super(configCell);
        for (let i = 0; i < this.cSize; i++) this.mask[i] = maskNum.show; // 常時全てshow
    }

    // ==== メソッド ====
    // コンストラクタの次に原則1回実施
    initialize() {
        // モード
        this.mode = modeNum.setting;

        // 先攻・後攻 player,computer;
        this.attacker[0] = attackerNum.player;
        this.attacker[1] = attackerNum.comp1;

        // 先攻・後攻 😀😡
        this.attackerStatusNum[0] = statusNum.smile;
        this.attackerStatusNum[1] = statusNum.angry;

        // 先攻ターン
        this.#turn = 0;
    
        this.#setStaNumSelfOppo();
        this.#setStatus();
 
        logConsole.report(`Initial setting completed successfully.`);
    }

    // プライベート initializeから1回呼び出し #initialStatus初期状態(通称4目)を生成
    #setStatus() {
        // 一旦全セルsmileに
        for (let i = 0; i < this.cSize; i++) this.status[i] = statusNum.empty;
        const pos = this.vhToPos(this.vSize / 2 - 1, this.hSize / 2 - 1);
        this.status[pos] = this.staNumOppo;
        this.status[pos + this.direct8.right] = this.staNumSelf;
        this.status[pos + this.direct8.lower] = this.staNumSelf;
        this.status[pos + this.direct8.LoR] = this.staNumOppo;
        this.logStatusString();
    }

    reset() {
        this.mode=modeNum.setting;
        // 先攻ターン
        this.#turn = 0;
    
        this.#setStaNumSelfOppo();
        this.#setStatus();
    }

    // 自己・相手のstatusNumを変数単独で呼べるようにする
    #setStaNumSelfOppo() {
        this.staNumSelf = this.attackerStatusNum[this.turn];
        this.staNumOppo = this.attackerStatusNum[1 - this.turn];
    }

    // 次のターンへ
    turnNext() {
        this.#turn = 1 - this.#turn;
        this.#setStaNumSelfOppo();
    }


    // ステージ開始とリセット
    start() {
        this.#setStatus(); // status通称4目
        this.#turn = 0; // 先攻(1st attacker)選択
        this.#setStaNumSelfOppo();
        this.mode = modeNum.playing;
        this.logMode();
        logConsole.report("Stage ready.");
        loggerSmile8x8.show("Lets start the game.");
        this.controlPlaying();
    }

    controlPlaying() {
        while (this.attacker[this.turn] !== attackerNum.player) {
            sleep(200);
            this.letComp1Push();
            showFieldInfo();           
        }
    }

    letComp1Push() {
        const array = this.getArrayOfReversibleCell();
        let maxGainPos = -1;
        let maxGain = -1;
        logConsole.report(`ArrayOfReversibleCell : ${array}`);
        for (const subArray of array) {
            if (subArray[1] > maxGain) {
                maxGainPos = subArray[0];
                maxGain = subArray[1];
            }
        }
        // ********* com1の打ち手確定部 ********
        this.pushCell(maxGainPos);
        this.logPushCell(maxGainPos);
        this.turnNext();
    }



    // ======== ======== ======== ======== ======== ======== ======== ======== ======== ========
    //  コンソール ・・・ マウスクリック、ログ画面
    // ======== ======== ======== ======== ======== ======== ======== ======== ======== ========

    // 左クリック処理
    actClickLeftEvent(pos) {
        this.logClickCellName("left", pos);
        if (this.mode === modeNum.setting) {
            console.log("AAAAAA")
            this.start();
            return;
        }
        // ********* playerの打ち手確定部 ********
        if (this.pushCell(pos) === 0) return;
        this.logPushCell(pos);
        this.turnNext();
        // showFieldInfo();
        this.controlPlaying();
    }

    // 右クリック処理
    actClickRightEvent(pos) {
        this.logClickCellName("right", pos);
        return;
    }

    //
    logStatusString() {
        logConsole.report("\n" + this.makeStatusString(this.status));
    }


    // モード(mode)が変わったことををログ画面に表示
    logMode() {
        logConsole.report(`Mode is changed to ${modeName[this.mode]}.`);
    }

    logPushCell(pos) {
        loggerSmile8x8.show(`${charaSymbol[this.staNumSelf]} put ${this.getCellName(pos)}.`);
    }

    // ======== ======== ======== ======== ======== ======== ======== ======== ======== ========
    //  ボード状況の関数
    // ======== ======== ======== ======== ======== ======== ======== ======== ======== ========

    // セルposが1方向にリバースできるセル数を計数
    countGainOnDirect1(pos, dirNum) {
        let currentPos = pos;
        let countGain = 0;
        while (true) {
            if (!this.isInField8(currentPos, dirNum)) return 0;
            currentPos += dirNum;
            if (this.status[currentPos] === this.staNumSelf) return countGain;
            if (this.status[currentPos] !== this.staNumOppo) return 0;
            countGain++;
        }
    }
    // セルposが8方向にリバースできるセル数を計数
    countGainOnDirect8(pos) {
        let countGain = 0;
        if (this.status[pos] !== statusNum.empty) return;
        for (const key in this.direct8) countGain += this.countGainOnDirect1(pos, this.direct8[key]);
        return countGain;
    }

    // セルposから1方向にリバース可能かどうか
    // 高速処理重視　posがmeの確認、ゲイン数の確認をしない
    isReversibleOnDirect1(pos, dirNum) {
        let currentPos = pos;
        while (true) {
            if (!this.isInField8(pos, dirNum)) return false;
            if (this.status[currentPos + dirNum] === this.staNumSelf) return currentPos !== pos; // 1つ以上相手を挟んでいるか
            currentPos += dirNum;
            if (this.status[currentPos] !== this.staNumOppo) return false;
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

    // selfは打てるセルがあるか？
    hasReversibleCell() {
        for (let pos = 0; pos < this.cSize; pos++) {
            if (this.isReversibleOnDirect8(pos)) return true;
        }
        return false;
    }
    // selfは打てるせるが何個あるか？
    countReversibleCell() {
        const count = 0;
        for (let pos = 0; pos < this.cSize; pos++) {
            if (this.isReversibleOnDirect8(pos)) count++;
        }
        return count;
    }
    // selfが打てるセルのposとgainの配列の配列を返す
    // [ [pos0, gain0], [pos1, gain1], ... ]
    getArrayOfReversibleCell() {
        const array = [];
        for (let pos = 0; pos < this.cSize; pos++) {
            const count = this.countGainOnDirect8(pos);
            if (count > 0) array.push([pos, count]);
        }
        return array;
    }


    // ======== ======== ======== ======== ======== ======== ======== ======== ======== ========
    //  ボード操作の関数
    // ======== ======== ======== ======== ======== ======== ======== ======== ======== ========

    // 1方向リバースさせてリバースした合計を返す(リバースさせるところがなければ変化なしでゼロを返す)
    reverseCellOnDirect1(pos, dirNum) {
        let currentPos = pos;
        const numOfGain = this.countGainOnDirect1(pos, dirNum);
        for (let i = 0; i < numOfGain; i++) {
            currentPos += dirNum;
            this.status[currentPos] = this.staNumSelf;
        }
        return numOfGain;
    }

    // 8方向リバースさせてリバースした合計を返す(リバースさせるところがなければ変化なしでゼロを返す)
    reverseCellOnDirect8(pos) {
        if (this.status[pos] !== statusNum.empty) {
            loggerSmile8x8.show(`${this.getCellName(pos)} is not empty.`);
            return 0;
        }
        let numOfGain = 0;
        for (const key in this.direct8) numOfGain += this.reverseCellOnDirect1(pos, this.direct8[key]);
        if (numOfGain === 0) return 0;
        this.status[pos] = this.staNumSelf;
        return numOfGain;
    }

    // プッシュ処理
    // リバースした合計を返す(リバースできなかったらゼロを返す＝結果がfalse的な意味合いを持つ)
    pushCell(pos) {
        return this.reverseCellOnDirect8(pos);
    }

    // ======== ======== ======== ======== ======== ======== ======== ======== ======== ========
    //  ゲーム状況判定
    // ======== ======== ======== ======== ======== ======== ======== ======== ======== ========

    // クリア条件 numOfAngry=0かどうか
    isCleared() {
        return this.numOfFlag === this.initialNumOfAngry && this.numOfHide === 0;
    }

    isFinished() {
        return this.isCleared() || this.hasNoReversibleCell;
    }

    isClearedAndDoEvent() {
        if (!this.isCleared()) return false;
        loggerSmile8x8.show("!! CONGRATURATIONS !!", "Stage cleared!!");
        return true;
    }


    // ======== ======== ======== ======== ======== ======== ======== ======== ======== ========
    //  setting操作関係
    // ======== ======== ======== ======== ======== ======== ======== ======== ======== ========

    // player,comなどを序列順に変更
    changeAttacker(num) {
        this.attacker[num] = (this.attacker[num] + 1) % attackerName.length;
    }

    // 先攻後攻の😀😡を交換
    swapFace() {
        // 三項演算子 先攻後攻のstatusNumを交換
        this.attackerStatusNum[0] = this.attackerStatusNum[0] === statusNum.smile ? statusNum.angry : statusNum.smile;
        this.attackerStatusNum[1] = this.attackerStatusNum[1] === statusNum.smile ? statusNum.angry : statusNum.smile;
        this.#setStaNumSelfOppo(); // selfとoppoのstatusNum再セット
        this.swapAllFace(); // セルの😀😡交換
    }

    swapAllFace() {
        for (let pos = 0; pos < this.cSize; pos++) {
            if (this.status[pos] === statusNum.smile) {
                this.status[pos] = statusNum.angry;
            } else if (this.status[pos] === statusNum.angry) {
                this.status[pos] = statusNum.smile;
            }
        }
        this.logStatusString();
    }



}

