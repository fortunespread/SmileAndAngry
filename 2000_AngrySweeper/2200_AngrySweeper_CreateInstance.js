'use strict'
// ================================================================================
//    ! IMPORTANT ! 
//  Common instance creation
//  Don't touch this page. 
// ================================================================================

const loggerAngrySweeper = new Logger(configLogAngrySweeper);

const cellAngrySweeper = new CellAngrySweeper(configCellAngrySweeper);

const fieldAngrySweeper = new Field(configFieldAngrySweeper, configClickEventFieldAngrySweeper);

const infoAngrySweeper = new Info(configInfoAngrySweeper, configButtonAngrySweeper);
