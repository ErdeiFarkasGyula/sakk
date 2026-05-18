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

function tablaRajzolas() {
    let tabla = document.getElementById("sakktabla");
    for (let i = 0; i < 8; i++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        for (let j = 0; j < 8; j++) {
            let cella = document.createElement("div");
            cella.classList.add("cella");
            if (i % 2 == j % 2) {
                cella.classList.add("feher");
            } else {
                cella.classList.add("fekete");
            }
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
            if (sakktabla[i][j] != "") {
                console.log(sakktabla[i][j]);
                darabRajzolas(sakktabla[i][j], i, j);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    tablaRajzolas();
    tablaFrissites();
});