'use strict'

class InfoBase extends TableCreator {
    // ==== コンストラクタ ====
    constructor(configInfo, configButton) {
        super(configInfo);

        const configTable = {
            id: (v, h) => "info" + padZeroToNum(h, 2),
            className: (v, h) => "info" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt[v] + padZeroToNum(h, 2)
        }

        this.createTable(configTable,{});
        console.log(configButton)
        this.createAllButtons(configButton);
    }
}
