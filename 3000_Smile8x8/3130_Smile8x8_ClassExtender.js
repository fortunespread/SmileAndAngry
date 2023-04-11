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
    attackerCharaNum = [];
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
        this.td[1][1].innerText = dataToShow.who[0];
        this.td[1][2].innerText = dataToShow.who[1];
        this.td[3][1].innerText = dataToShow.face[0];
        this.td[3][2].innerText = dataToShow.face[1];
        this.td[5][1].innerText = dataToShow.count[0];
        this.td[5][2].innerText = dataToShow.count[1];
        this.td[6][1].innerText = dataToShow.turn[0];
        this.td[6][2].innerText = dataToShow.turn[1];
    }

}
