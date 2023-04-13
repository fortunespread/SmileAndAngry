'use strict'

infoSmile8x8.preshow();
cellSmile8x8.initialize();
fieldSmile8x8.show(cellSmile8x8.dataToShowField);
infoSmile8x8.show(cellSmile8x8.dataToShowInfo);

// cellSmile8x8.start();
// cellSmile8x8.controlPlaying();


// function showFieldInfo() {
//     fieldSmile8x8.show(cellSmile8x8.dataToShowField);
//     infoSmile8x8.show(cellSmile8x8.dataToShowInfo);
// }

async function showFieldInfo() {
    new Promise((resolve) => {
        fieldSmile8x8.show(cellSmile8x8.dataToShowField);
    }).then(() => {
        infoSmile8x8.show(cellSmile8x8.dataToShowInfo);
    })
    await repaint();
    await repaint();
}