'use strict'

class FieldBase extends TableCreator {
    // ======== コンストラクタ ========
    constructor(configField, configClickEvent) {
        super(configField);

        // FieldのTableのidタグ、classタグの命名関数
        const configTable = {
            id: (v, h) => "cell" + padZeroToNum(v * this.hSize + h, 2),
            className: (v, h) => "cell",
        }

        this.createTable(configTable);
        this.addClickEvent(configClickEvent);
    }


    // ======== メソッド ========

    // 表示する
    show(dataToShow) {
        for (let i = 0; i < this.cSize; i++) {
            const v = this.posToV(i);
            const h = this.posToH(i);
            const staN = dataToShow.status[i];
            const mskN = dataToShow.mask[i];
            const charaObject = getCharaObject(staN, mskN, dataToShow.isFinished);
            this.td[v][h].innerText = charaObject.symbol;
            this.td[v][h].style.backgroundColor = charaObject.bgColor;
        }
    }
}