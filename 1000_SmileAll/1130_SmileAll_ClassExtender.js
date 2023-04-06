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
    // 必要ならここにコードを書く
    preset(){

    }

    preshow() {
        this.td[0][0].innerText = "Stage";
        this.td[1][0].innerText = "Push";
        this.td[2][0].innerText = charaSymbol[charaNum.smile];
        this.td[3][0].innerText = charaSymbol[charaNum.angry];
    }
    
    show(argCell) {
        this.td[0][1].innerText = argCell.stage;
        this.td[1][1].innerText = argCell.countOfPush;
        this.td[2][1].innerText = argCell.numOfSmile;
        this.td[3][1].innerText = argCell.numOfAngry;
    }

}
