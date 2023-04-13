'use strict'
// ================================================================================
//    ! IMPORTANT ! 
//  Configuration for each of games
//  The configuration which is set here is used in this game control. 
// ================================================================================

// FieldBaseに個別追加する必要があるフィールド、プロパティ、メソッドがあればここに記述する
class Field extends FieldBase {
    // 必要ならここにコードを書く

}


// InfoBaseに個別追加する必要があるフィールド、プロパティ、メソッドがあればここに記述する
class Info extends InfoBase {
    // attackerNum = { player: 0, comp1: 1, comp2: 2 };
    // attackerName = ["player", "comp1", "comp2"];
    attacker = [];
    attackerStatusNum = [];
    turn;
    me;
    you;
    // 必要ならここにコードを書く
    preset() {

    }

    preshow() {
        this.td[0][1].innerText = "1st attacker";
        this.td[0][2].innerText = "2nd attacker";
        this.td[1][0].innerText = "Who";
        this.td[2][0].innerText = "";
        this.td[3][0].innerText = "Face";
        this.td[5][0].innerText = "Count";
        this.td[6][0].innerText = "Turn";
    }

    show(dataToShow) {
        // Who
        this.td[1][1].innerText = attackerName[dataToShow.attacker[0]];
        this.td[1][2].innerText = attackerName[dataToShow.attacker[1]];

        // Face
        this.td[3][1].innerText = charaSymbol[dataToShow.attackerStatusNum[0]];
        this.td[3][2].innerText = charaSymbol[dataToShow.attackerStatusNum[1]];

        // Count;
        this.td[5][1].innerText = dataToShow.attackerStatusNum[0] === statusNum.smile ? dataToShow.numOfSmile : dataToShow.numOfAngry;
        this.td[5][2].innerText = dataToShow.attackerStatusNum[1] === statusNum.smile ? dataToShow.numOfSmile : dataToShow.numOfAngry;

        // Turn
        this.td[6][1].innerText = dataToShow.turn === 0 ? charaSymbol[charaNum.flag] : "";
        this.td[6][2].innerText = dataToShow.turn === 1 ? charaSymbol[charaNum.flag] : "";

        switch (dataToShow.mode) {
            case modeNum.setting: { this.eBtn["Start"].disabled = false; break; }
            case modeNum.playing: { this.eBtn["Start"].disabled = true; break; }
        }
    }

}
