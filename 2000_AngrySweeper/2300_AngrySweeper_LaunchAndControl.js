'use strict'

infoAngrySweeper.preshow();

cellAngrySweeper.setInitialStatus();
cellAngrySweeper.try();

fieldAngrySweeper.show(cellAngrySweeper.dataToShowField);
infoAngrySweeper.show(cellAngrySweeper.dataToShowInfo);
// switchTextOfBtnRetry(false);