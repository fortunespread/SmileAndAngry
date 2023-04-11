'use strict'

class TableCreator {
    // ======== フィールド ========
    configConstructor;
    configTable; // FieldのTable同士、infoのTable同士で同じ、Fieldなのかinfoなのか
    configClickEvent; //各AppliのFieldのみ
    configButton; // 各AppliのInfoのみ

    eBtn = {}; // ボタン

    pos;

    // ======== プライベートフィールド ========
    #parent;
    #table;
    #tbody;
    #tr = [];
    #td = [];


    // ======== クロージャ関数 (カリー化) ========
    vhToPos;
    posToV;
    posToH;
    direct;
    isInField;


    // ======== プロパティ ========
    get vSize() { return this.configConstructor.vSize; }
    get hSize() { return this.configConstructor.hSize; }
    get cSize() { return this.vSize * this.hSize; }

    get parent() { return this.#parent; }
    get table() { return this.#table; }
    get tbody() { return this.#tbody; }
    get tr() { return this.#tr; }
    get td() { return this.#td; }


    // ======== コンストラクタ ========
    constructor(configConstructor) {
        this.configConstructor = configConstructor;

        this.vhToPos = getFuncVhToPos(this.hSize);
        this.posToV = getFuncPosToV(this.hSize);
        this.posToH = getFuncPosToH(this.hSize);
        // this.direct = getObjDirect4;
        // this.isInField = getFuncIsInField(this.vSize, this.hSize);
    }


    // ======== メソッド ========

    // Table作成 
    createTable(configTable) {
        this.configTable = configTable;

        this.#parent = document.getElementById(this.configConstructor.area);

        this.#table = document.createElement("table");
        this.#table.id = "fieldTable";
        this.#table.border = 1;
        this.#tbody = document.createElement("tbody");

        this.#tr = [];
        this.#td = [];
        this.#td = createBoxArray(this.vSize, this.hSize);

        for (let v = 0; v < this.vSize; v++) {
            this.#tr[v] = document.createElement("tr");
            for (let h = 0; h < this.hSize; h++) {
                this.pos = this.vhToPos(v, h);
                this.#td[v][h] = document.createElement("td");
                this.#td[v][h].id = this.configTable.id(v, h);//`cell${c}`;
                this.#td[v][h].className = this.configTable.className(v, h);
                //this.#td[v][h].oncontextmenu = "return false";
                this.#tr[v].appendChild(this.#td[v][h]);
            }
            this.#tbody.appendChild(this.#tr[v]);
        }
        this.#table.appendChild(this.#tbody);
        this.#parent.appendChild(this.#table);
    }

    addClickEvent(configClickEvent) {
        this.configClickEvent = configClickEvent;
        for (let v = 0; v < this.vSize; v++) {
            for (let h = 0; h < this.hSize; h++) {
                const clickLeftEvent = configClickEvent.clickLeftEvent;
                const clickRightEvent = configClickEvent.clickRightEvent;
                const pos = this.vhToPos(v, h);
                this.#td[v][h].addEventListener("click", () => clickLeftEvent(pos), false);
                this.#td[v][h].addEventListener("contextmenu", () => clickRightEvent(pos), false);
            }
        }
    }

    disactivate

    // ボタン一括作成
    createAllButtons(configButton) {
        this.configButton = configButton;
        for (const key in this.configButton) {
            this.eBtn[key] = this.createOneButton(this.configButton[key]);
        }
    }

    // ボタン作成
    createOneButton(btnObj) {
        const el = document.createElement("button");
        el.innerText = btnObj.text;
        el.addEventListener(btnObj.event, btnObj.func, false);
        this.td[btnObj.vhOfInfo[0]][btnObj.vhOfInfo[1]].appendChild(el);
        return el;
    }
}
