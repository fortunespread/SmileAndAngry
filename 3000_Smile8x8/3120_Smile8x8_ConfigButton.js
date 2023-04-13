'use strict'

const configButtonSmile8x8 = {
    Change1stAttacker: {
        vhOfInfo: [2, 1],
        text: "Change",
        event: "click",
        func: () => {
            logConsole.event("Button \"Change 1st attacker\" clicked.");
            cellSmile8x8.changeAttacker(0);
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
            cellSmile8x8.changeAttacker(1);
            fieldSmile8x8.show(cellSmile8x8.dataToShowField);
            infoSmile8x8.show(cellSmile8x8.dataToShowInfo);
        }
    },
    SwapFace: {
        vhOfInfo: [4, 1],
        text: "Swap",
        event: "click",
        func: () => {
            logConsole.event("Button \"Swap Face\" clicked.");
            cellSmile8x8.swapFace();
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
            cellSmile8x8.start();
            fieldSmile8x8.show(cellSmile8x8.dataToShowField);
            infoSmile8x8.show(cellSmile8x8.dataToShowInfo);
        }
    },
    Restart: {
        vhOfInfo: [7, 2],
        text: "Reset",
        event: "click",
        func: () => {
            logConsole.event("Button \"Resset\" clicked.");
            cellSmile8x8.reset();
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
