'use strict'

// Field上での左クリックと右クリックのイベント
const configClickEventFieldAngrySweeper = {

    clickLeftEvent: (pos) => {
        cellAngrySweeper.actClickLeftEvent(pos);
        fieldAngrySweeper.show(cellAngrySweeper.dataToShowField);
        infoAngrySweeper.show(cellAngrySweeper.dataToShowInfo);
        cellAngrySweeper.isClearedAndDoEvent();
    },

    clickRightEvent: (pos) => {
        cellAngrySweeper.actClickRightEvent(pos);
        fieldAngrySweeper.show(cellAngrySweeper.dataToShowField);
        infoAngrySweeper.show(cellAngrySweeper.dataToShowInfo);
        cellAngrySweeper.isClearedAndDoEvent();
    }

}