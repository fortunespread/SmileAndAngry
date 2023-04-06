'use strict'

const configButtonAngrySweeper = {
    Retry: {
        vhOfInfo: [5, 0],
        text: "Retry this",
        event: "click",
        func: () => {
            logConsole.event("Button \"Retry\" clicked.");
            cellAngrySweeper.retry();
            fieldAngrySweeper.show(cellAngrySweeper.dataToShowField);
            infoAngrySweeper.show(cellAngrySweeper.dataToShowInfo);
        }
    },
    TryNew: {
        vhOfInfo: [5, 1],
        text: "Try new",
        event: "click",
        func: () => {
            logConsole.event("Button \"Try Next\" clicked.");
            // if (!cellAngrySweeper.isCleared) return;
            cellAngrySweeper.setInitialStatus();
            cellAngrySweeper.try();
            fieldAngrySweeper.show(cellAngrySweeper.dataToShowField);
            infoAngrySweeper.show(cellAngrySweeper.dataToShowInfo);
        }
    },
    Exit: {
        vhOfInfo: [6, 1],
        text: "Exit",
        event: "click",
        func: () => {
            logConsole.alert("Button \"Exit \" clicked.");
            const result = window.confirm("Do you really exit this game?");
            logConsole.event(`Dialog closed and result is \'${result}\'.`);
            if (result) {
                loggerAngrySweeper.show("Please come back soon.", "See you again! ");
                logConsole.event("This game \'Angry Sweeper\' is closing.")
                document.location.href = "../index.html";
            }
        }
    }
}
