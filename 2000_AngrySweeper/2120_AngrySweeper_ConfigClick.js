'use strict'

// Field上での左クリックと右クリックのイベント
const configClickEventFieldAngrySweeper = {

    clickLeftEvent: (pos) => {
        // 必要ならここにコードを書く
        if (cellAngrySweeper.isFinished()) { 
            cellAngrySweeper.setInitialStatus();
            cellAngrySweeper.try();            
        } else {
            cellAngrySweeper.pushCell(pos);
        }
        fieldAngrySweeper.show(cellAngrySweeper.dataToShowField);
        infoAngrySweeper.show(cellAngrySweeper.dataToShowInfo);
        cellAngrySweeper.isClearedAndDoEvent();
        // switchTextOfBtnRetry(cellAngrySweeper.isCleared());
    },

    clickRightEvent: (pos) => {
        if (cellAngrySweeper.isFinished()) {
            cellAngrySweeper.setInitialStatus();
            cellAngrySweeper.try();
        } else {
            cellAngrySweeper.actClickRightEvent(pos);
        }
        fieldAngrySweeper.show(cellAngrySweeper.dataToShowField);
        infoAngrySweeper.show(cellAngrySweeper.dataToShowInfo);
        cellAngrySweeper.isClearedAndDoEvent();
    }

}