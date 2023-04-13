'use strict'

// Field上での左クリックと右クリックのイベント
const configClickEventFieldSmile8x8 = {

    clickLeftEvent: (pos) => {
        // 必要ならここにコードを書く
        cellSmile8x8.actClickLeftEvent(pos);
        fieldSmile8x8.show(cellSmile8x8.dataToShowField);
        infoSmile8x8.show(cellSmile8x8.dataToShowInfo);
        cellSmile8x8.isClearedAndDoEvent();
        logConsole.report("\n"+cellSmile8x8.makeStatusString(cellSmile8x8.status));
    },

    clickRightEvent: (pos) => {
        cellSmile8x8.actClickRightEvent(pos);
        fieldSmile8x8.show(cellSmile8x8.dataToShowField);
        infoSmile8x8.show(cellSmile8x8.dataToShowInfo);
        cellSmile8x8.isClearedAndDoEvent();
    }

}