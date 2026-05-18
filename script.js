let sakktabla = [
    [1, 2, 3, 4, 5, 3, 2, 1],
    [6, 6, 6, 6, 6, 6, 6, 6],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    [12, 12, 12, 12, 12, 12, 12, 12],
    [7, 8, 9, 10, 11, 9, 8, 7]
]

let babuk = [
    { id: "1", nev: "bbastya", jel: "&#9820;" },
    { id: "2", nev: "bcsiko", jel: "&#9822;" },
    { id: "3", nev: "bfuto", jel: "&#9821;" },
    { id: "4", nev: "bkiralynő", jel: "&#9819;" },
    { id: "5", nev: "bkirály", jel: "&#9818;" },
    { id: "6", nev: "bparaszt", jel: "&#9823;" },
    { id: "7", nev: "wbasttya", jel: "&#9814;" },
    { id: "8", nev: "wcsiko", jel: "&#9816;" },
    { id: "9", nev: "wfuto", jel: "&#9815;" },
    { id: "10", nev: "wkiralynő", jel: "&#9813;" },
    { id: "11", nev: "wkiraly", jel: "&#9812;" },
    { id: "12", nev: "wparaszt", jel: "&#9817;" }
]

let aktualisJatekos = "feher";
let kijeloltMezo = null;
let ervenyesLepesek = [];
let jatekVege = false;

function tablaHataronBelul(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function babuSzine(darab) {
    if (darab === "") {
        return "nincs";
    }
    return darab <= 6 ? "fekete" : "feher";
}

function azonosMezo(a, b) {
    return a && b && a.x === b.x && a.y === b.y;
}

function tablaRajzolas() {
    let tabla = document.getElementById("sakktabla");
    tabla.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        for (let j = 0; j < 8; j++) {
            let cella = document.createElement("div");
            cella.classList.add("cella");
            cella.dataset.x = i;
            cella.dataset.y = j;
            if (i % 2 == j % 2) {
                cella.classList.add("feher");
            } else {
                cella.classList.add("fekete");
            }
            cella.addEventListener("click", () => cellaKattintas(i, j));
            sor.appendChild(cella);
        }
        tabla.appendChild(sor);
    }
}

function darabRajzolas(darab, x, y) {
    let cella = document.getElementById("sakktabla").children[x].children[y];
    cella.innerHTML = babuk[darab - 1].jel;
}

function tablaFrissites() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let cella = document.getElementById("sakktabla").children[i].children[j];
            cella.innerHTML = "";
            cella.classList.remove("kijelolt");
            cella.classList.remove("lepheto");
        }
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (sakktabla[i][j] != "") {
                darabRajzolas(sakktabla[i][j], i, j);
            }
        }
    }

    if (kijeloltMezo) {
        let cella = document.getElementById("sakktabla").children[kijeloltMezo.x].children[kijeloltMezo.y];
        cella.classList.add("kijelolt");
        for (const lepes of ervenyesLepesek) {
            let lephetoCella = document.getElementById("sakktabla").children[lepes.x].children[lepes.y];
            lephetoCella.classList.add("lepheto");
        }
    }

    allapotFrissites();
}

function lepes(x1, y1, x2, y2) {
    let darab = sakktabla[x1][y1];
    let celDarab = sakktabla[x2][y2];

    sakktabla[x1][y1] = "";
    sakktabla[x2][y2] = darab;

    if (celDarab === 5 || celDarab === 11) {
        jatekVege = true;
    }

    if (darab === 6 && x2 === 7) {
        sakktabla[x2][y2] = 4;
    }
    if (darab === 12 && x2 === 0) {
        sakktabla[x2][y2] = 10;
    }

    kijeloltMezo = null;
    ervenyesLepesek = [];

    if (!jatekVege) {
        aktualisJatekos = aktualisJatekos === "feher" ? "fekete" : "feher";
    }

    tablaFrissites();
}

function iranyLepesek(x, y, iranyok, egyLepes = false) {
    const lepesek = [];
    const sajatSzin = babuSzine(sakktabla[x][y]);

    for (const [dx, dy] of iranyok) {
        let nx = x + dx;
        let ny = y + dy;

        while (tablaHataronBelul(nx, ny)) {
            const cel = sakktabla[nx][ny];
            if (cel === "") {
                lepesek.push({ x: nx, y: ny });
            } else {
                if (babuSzine(cel) !== sajatSzin) {
                    lepesek.push({ x: nx, y: ny });
                }
                break;
            }

            if (egyLepes) {
                break;
            }

            nx += dx;
            ny += dy;
        }
    }

    return lepesek;
}

function ervenyesLepesLista(x, y) {
    const darab = sakktabla[x][y];
    if (darab === "") {
        return [];
    }

    const szin = babuSzine(darab);
    const lepesek = [];

    if (darab === 1 || darab === 7) {
        return iranyLepesek(x, y, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
    }

    if (darab === 3 || darab === 9) {
        return iranyLepesek(x, y, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
    }

    if (darab === 4 || darab === 10) {
        return iranyLepesek(x, y, [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1]
        ]);
    }

    if (darab === 5 || darab === 11) {
        return iranyLepesek(x, y, [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1]
        ], true);
    }

    if (darab === 2 || darab === 8) {
        const ugrasok = [
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
            [1, 2],
            [1, -2],
            [-1, 2],
            [-1, -2]
        ];

        for (const [dx, dy] of ugrasok) {
            const nx = x + dx;
            const ny = y + dy;
            if (!tablaHataronBelul(nx, ny)) {
                continue;
            }

            const cel = sakktabla[nx][ny];
            if (cel === "" || babuSzine(cel) !== szin) {
                lepesek.push({ x: nx, y: ny });
            }
        }

        return lepesek;
    }

    if (darab === 6 || darab === 12) {
        const irany = darab === 6 ? 1 : -1;
        const kezdoSor = darab === 6 ? 1 : 6;

        const nx = x + irany;
        if (tablaHataronBelul(nx, y) && sakktabla[nx][y] === "") {
            lepesek.push({ x: nx, y: y });

            const nx2 = x + irany * 2;
            if (x === kezdoSor && tablaHataronBelul(nx2, y) && sakktabla[nx2][y] === "") {
                lepesek.push({ x: nx2, y: y });
            }
        }

        const atlok = [y - 1, y + 1];
        for (const ny of atlok) {
            if (!tablaHataronBelul(nx, ny)) {
                continue;
            }
            const cel = sakktabla[nx][ny];
            if (cel !== "" && babuSzine(cel) !== szin) {
                lepesek.push({ x: nx, y: ny });
            }
        }

        return lepesek;
    }

    return [];
}

function lepesVizsgalat(x1, y1, x2, y2) {
    let darab = sakktabla[x1][y1];
    if (darab == "") {
        return false;
    }

    if (babuSzine(darab) !== aktualisJatekos) {
        return false;
    }

    const lehetseges = ervenyesLepesLista(x1, y1);
    return lehetseges.some((mezo) => mezo.x === x2 && mezo.y === y2);

    return true;
}

function lepesVegrehajtas(x1, y1, x2, y2) {
    if (lepesVizsgalat(x1, y1, x2, y2)) {
        lepes(x1, y1, x2, y2);
    } else {
        alert("Érvénytelen lépés!");
    }
}

function cellaKattintas(x, y) {
    if (jatekVege) {
        return;
    }

    const kattintottDarab = sakktabla[x][y];
    const kattintottSzin = babuSzine(kattintottDarab);

    if (!kijeloltMezo) {
        if (kattintottDarab !== "" && kattintottSzin === aktualisJatekos) {
            kijeloltMezo = { x, y };
            ervenyesLepesek = ervenyesLepesLista(x, y);
            tablaFrissites();
        }
        return;
    }

    if (azonosMezo(kijeloltMezo, { x, y })) {
        kijeloltMezo = null;
        ervenyesLepesek = [];
        tablaFrissites();
        return;
    }

    if (kattintottDarab !== "" && kattintottSzin === aktualisJatekos) {
        kijeloltMezo = { x, y };
        ervenyesLepesek = ervenyesLepesLista(x, y);
        tablaFrissites();
        return;
    }

    if (lepesVizsgalat(kijeloltMezo.x, kijeloltMezo.y, x, y)) {
        lepesVegrehajtas(kijeloltMezo.x, kijeloltMezo.y, x, y);
    }
}

function allapotFrissites() {
    let allapot = document.getElementById("allapot");
    if (!allapot) {
        allapot = document.createElement("div");
        allapot.id = "allapot";
        document.body.insertBefore(allapot, document.getElementById("sakktabla"));
    }

    if (jatekVege) {
        const nyertes = aktualisJatekos === "feher" ? "Fehér" : "Fekete";
        allapot.textContent = `Játék vége! Nyertes: ${nyertes}`;
        return;
    }

    const kovetkezo = aktualisJatekos === "feher" ? "Fehér" : "Fekete";
    allapot.textContent = `Következő játékos: ${kovetkezo}`;
}



document.addEventListener("DOMContentLoaded", () => {
    tablaRajzolas();
    tablaFrissites();
});