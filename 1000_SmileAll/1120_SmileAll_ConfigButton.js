'use strict'

const configButtonSmileAll = {
    Retry: {
        vhOfInfo: [4, 0],
        text: "Retry",
        event: "click",
        func: () => {
            logConsole.event("Button \"Retry\" clicked.");
            cellSmileAll.retry();
            fieldSmileAll.show(cellSmileAll.dataToShowField);
            infoSmileAll.show(cellSmileAll);
            switchTextOfBtnRetry(false);
        }
    },

    TryNext: {
        vhOfInfo: [4, 1],
        text: "Try Next",
        event: "click",
        func: () => {
            logConsole.event("Button \"Try Next\" clicked.");
            if (!cellSmileAll.isCleared) return;
            cellSmileAll.goToNextStage();
            cellSmileAll.try();
            fieldSmileAll.show(cellSmileAll.dataToShowField);
            infoSmileAll.show(cellSmileAll);
            switchTextOfBtnRetry(false);
        }
    },

    Exit: {
        vhOfInfo: [5, 1],
        text: "Exit",
        event: "click",
        func: () => {
            logConsole.alert("Button \"Exit \" clicked.");
            const result = window.confirm("Do you really exit this game?");
            logConsole.event(`Dialog closed and result is \'${result}\'.`);
            if (result) {
                loggerSmileAll.show("Please come back soon.", "See you again! ");
                logConsole.event("This game \'Smile All\' is closing.")
                document.location.href = "../index.html";
            }
        }
    }
}

// リトライボタンは状態で活性、不活性化
function switchTextOfBtnRetry(isCleared) {
    const el = infoSmileAll.eBtn.TryNext;
    if (!isCleared && !el.disabled) { //クリアしてない 且つ 活性状態
        el.disabled = true;
        el.style.backgroundColor = "lightgrey";
        logConsole.report("Set Button \"Retry\" diabled.");
    } else if (isCleared && el.disabled) {
        el.disabled = false;
        el.style.backgroundColor = "pink";
        logConsole.report("Set Button \"Retry\" abled.");
    }
}