'use strict'

// Field上での左クリックと右クリックのイベント
const configClickEventFieldSmileAll = {

    clickLeftEvent: (pos) => {
        cellSmileAll.pushCell(pos);
        fieldSmileAll.show(cellSmileAll.dataToShowField);
        infoSmileAll.show(cellSmileAll);
        cellSmileAll.isClearedAndDoEvent();
        switchTextOfBtnRetry(cellSmileAll.isCleared());
    },

    clickRightEvent: (pos) => {
        logConsole.event("Clicked R.");
    }
}
