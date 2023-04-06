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
        this.td[0][0].innerText = "Cells";
        this.td[1][0].innerText = charaSymbol[charaNum.angry];
        this.td[2][0].innerText = charaSymbol[charaNum.hide];
        this.td[3][0].innerText = charaSymbol[charaNum.flag];
        this.td[4][0].innerText = charaSymbol[charaNum.check];
    }
    
    show(dataToShow) {
        this.td[0][1].innerText = dataToShow.cSize;
        this.td[1][1].innerText = dataToShow.numOfAngry;
        this.td[2][1].innerText = dataToShow.numOfHide;
        this.td[3][1].innerText = dataToShow.numOfFlag;
        this.td[4][1].innerText = dataToShow.numOfCheck;
    }

}
