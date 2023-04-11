'use strict'

const configButtonSmile8x8 = {
    Change1stAttacker: {
        vhOfInfo: [2, 1],
        text: "Change",
        event: "click",
        func: () => {
            logConsole.event("Button \"Change 1st attacker\" clicked.");
            cellSmile8x8.retry();
            fieldSmile8x8.show(cellSmile8x8.dataToShowField);
            infoSmile8x8.show(cellSmile8x8.dataToShowInfo);
        }
    },
    Change2ndAttacker: {
        vhOfInfo: [2, 2],
        text: "Change",
        event: "click",
        func: () => {
            logConsole.event("Button \"Change 2nd attacker\" clicked.");
            cellSmile8x8.retry();
            fieldSmile8x8.show(cellSmile8x8.dataToShowField);
            infoSmile8x8.show(cellSmile8x8.dataToShowInfo);
        }
    },
    ChangeFace: {
        vhOfInfo: [4, 1],
        text: "Change",
        event: "click",
        func: () => {
            logConsole.event("Button \"Change Face\" clicked.");
            cellSmile8x8.retry();
            fieldSmile8x8.show(cellSmile8x8.dataToShowField);
            infoSmile8x8.show(cellSmile8x8.dataToShowInfo);
        }
    },
    Start: {
        vhOfInfo: [7, 1],
        text: "Start",
        event: "click",
        func: () => {
            logConsole.event("Button \"Start\" clicked.");
            cellSmile8x8.try();
            fieldSmile8x8.show(cellSmile8x8.dataToShowField);
            infoSmile8x8.show(cellSmile8x8.dataToShowInfo);
        }
    },
    Restart: {
        vhOfInfo: [7, 2],
        text: "Restart",
        event: "click",
        func: () => {
            logConsole.event("Button \"Restart\" clicked.");
            // if (!cellSmile8x8.isCleared) return;
            cellSmile8x8.setInitialStatus();
            cellSmile8x8.try();
            fieldSmile8x8.show(cellSmile8x8.dataToShowField);
            infoSmile8x8.show(cellSmile8x8.dataToShowInfo);
        }
    },
    Exit: {
        vhOfInfo: [8, 2],
        text: "Exit",
        event: "click",
        func: () => {
            logConsole.alert("Button \"Exit \" clicked.");
            const result = window.confirm("Do you really exit this game?");
            logConsole.event(`Dialog closed and result is \'${result}\'.`);
            if (result) {
                loggerSmile8x8.show("Please come back soon.", "See you again! ");
                logConsole.event("This game \'Angry Sweeper\' is closing.")
                document.location.href = "../index.html";
            }
        }
    }
}
