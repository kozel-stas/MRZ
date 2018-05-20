var m;
var p;
var q;
var n;
var timeOperation = [];
var numberOperation = [];

var T1;
var Tn;
var R;
var Ky;
var E;

var A = [];
var B = [];

function main() {

    T1 = 0;
    Tn = 0;
    R = 0;

    m = parseInt(document.getElementById("inputM").value);
    p = parseInt(document.getElementById("inputP").value);
    q = parseInt(document.getElementById("inputQ").value);
    n = parseInt(document.getElementById("inputN").value);
    //n,p,m,q check
    if (isNaN(m) || m <= 0 || isNaN(p) || p <= 0 || isNaN(q) || q <= 0 || isNaN(n) || n <= 0) {
        alert("Некорректный ввод!");
        return;
    }
    timeOperation = [];
    timeOperation.push(parseInt(document.getElementById("inputT1").value));//сложение
    timeOperation.push(parseInt(document.getElementById("inputT2").value));//деление
    timeOperation.push(parseInt(document.getElementById("inputT3").value));//произведение
    timeOperation.push(parseInt(document.getElementById("inputT4").value));//модуль числа
    timeOperation.push(parseInt(document.getElementById("inputT5").value));//сравнение
    // time operation
    for (var i = 0; i < timeOperation.length; i++) {
        if (isNaN(timeOperation[i]) || timeOperation[i] <= 0) {
            alert("Некорректный ввод!");
            return;
        }
    }

    //i=0...p; j=0...q; k=0...m
    //t[0] - "+"
    //t[1] - "/"
    //t[2] - "*"
    //t[3] - "||"
    //t[4] - "<"

    numberOperation = [];
    for (var i = 0; i < timeOperation.length; i++) {
        numberOperation.push(0);
    }

    A = genMatrix(p, m);
    B = genMatrix(m, q);

    var D = calculateMatrixD();
    var C = calculateMatrixC(D);

    for (var i = 0; i < numberOperation.length; i++) {
        T1 += numberOperation[i] * timeOperation[i];
    }

    Ky = T1 / Tn;
    E = Ky / n;


    generateTables(C, D);
}

function generateTables(C, D) {
    var table = document.createElement("table");
    var tableRow = document.createElement("tr");
    var tableData = document.createElement("td");
    tableData.innerHTML += "<p align='center'>A=</p>";
    tableRow.appendChild(tableData);
    tableData = document.createElement("td");
    tableData.innerHTML += "<p align='center'>B=</p>";
    tableRow.appendChild(tableData);
    table.appendChild(tableRow);
    tableRow = document.createElement("tr");
    tableData = document.createElement("td");

    createTable(A, tableData);
    tableRow.appendChild(tableData);
    tableData = document.createElement("td");
    createTable(B, tableData);
    tableRow.appendChild(tableData);
    tableData = document.createElement("td");
    tableRow.appendChild(tableData);
    table.appendChild(tableRow);

    var body = document.querySelector("body");
    body.appendChild(table);


    table = document.createElement("table");
    tableRow = document.createElement("tr");
    for (var k = 0; k < m; k++) {
        tableData = document.createElement("td");
        tableData.innerHTML += "<p align='center'>D[" + k + "]=</p>";
        tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
    tableRow = document.createElement("tr");
    for (var k = 0; k < m; k++) {
        tableData = document.createElement("td");
        createTable(D[k], tableData);
        tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
    body = document.querySelector("body");
    body.appendChild(table);

    table = document.createElement("table");
    tableRow = document.createElement("tr");
    tableData = document.createElement("td");
    tableData.innerHTML += "<p align='center'>C=</p>";
    tableRow.appendChild(tableData);
    table.appendChild(tableRow);
    tableRow = document.createElement("tr");
    tableData = document.createElement("td");
    createTable(C, tableData);
    tableRow.appendChild(tableData);
    table.appendChild(tableRow);
    body = document.querySelector("body");
    body.appendChild(table);

    var oper = ["сложение", "деление", "произведение", "модуль", "сравнение"];

    table = document.createElement("table");
    table.setAttribute("bordercolor", "grey");
    table.setAttribute("border", "1px");
    tableRow = document.createElement("tr");
    var tableHeader = document.createElement("th");
    tableRow.appendChild(tableHeader);
    for (var i = 0; i < oper.length; i++) {
        tableHeader = document.createElement("th");
        var text = document.createTextNode(oper[i]);
        tableHeader.appendChild(text);
        tableRow.appendChild(tableHeader)
    }
    tableHeader = document.createElement("th");
    var text = document.createTextNode("Т1");
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);

    tableHeader = document.createElement("th");
    var text = document.createTextNode("Т" + n);
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
    table.appendChild(tableRow);

    tableHeader = document.createElement("th");
    var text = document.createTextNode("Ky");
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
    table.appendChild(tableRow);

    tableHeader = document.createElement("th");
    var text = document.createTextNode("e");
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
    table.appendChild(tableRow);

    tableHeader = document.createElement("th");
    var text = document.createTextNode("D");
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
    table.appendChild(tableRow);

    tableRow = document.createElement("tr");
    tableData = document.createElement("td");
    tableData.innerHTML += "<p align='center'>Время операции</p>";
    tableRow.appendChild(tableData);
    for (var i = 0; i < timeOperation.length; i++) {
        tableData = document.createElement("td");
        tableData.innerHTML += "<p align='center'>" + timeOperation[i] + "</p>";
        tableRow.appendChild(tableData);
    }
    tableData = document.createElement("td");
    tableData.setAttribute("rowspan", "2");
    tableData.innerHTML += "<p align='center'>" + T1 + "</p>";
    tableRow.appendChild(tableData);

    tableData = document.createElement("td");
    tableData.setAttribute("rowspan", "2");
    tableData.innerHTML += "<p align='center'>" + Tn + "</p>";
    tableRow.appendChild(tableData);

    tableData = document.createElement("td");
    tableData.setAttribute("rowspan", "2");
    tableData.innerHTML += "<p align='center'>" + Ky.toFixed(3) + "</p>";
    tableRow.appendChild(tableData);

    tableData = document.createElement("td");
    tableData.setAttribute("rowspan", "2");
    tableData.innerHTML += "<p align='center'>" + E.toFixed(3) + "</p>";
    tableRow.appendChild(tableData);

    tableData = document.createElement("td");
    tableData.setAttribute("rowspan", "2");
    tableData.innerHTML += "<p align='center'>" + " " + "</p>";
    tableRow.appendChild(tableData);
    table.appendChild(tableRow);

    tableRow = document.createElement("tr");
    tableData = document.createElement("td");
    tableData.innerHTML += "<p align='center'>Кол-во вызовов</p>";
    tableRow.appendChild(tableData);
    for (var i = 0; i < numberOperation.length; i++) {
        tableData = document.createElement("td");
        tableData.innerHTML += "<p align='center'>" + numberOperation[i] + "</p>";
        tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
    body.appendChild(table);
}

function createTable(matrix, parent) {
    var firstTable = document.querySelector("table");
    var table = document.createElement("table");
    var tableRow = "";
    var tableData = "";
    var text = "";
    var height = 60;
    table.setAttribute("width", 250);
    table.setAttribute("border", "1px")
    table.setAttribute("bordercolor", "grey");
    table.setAttribute("align", "center");
    for (var i = 0; i < matrix.length; i++) {
        tableRow = document.createElement("tr");
        for (var j = 0; j < matrix[0].length; j++) {
            tableData = document.createElement("td");
            tableData.innerHTML += "" + matrix[i][j];
            tableRow.appendChild(tableData);
            tableData.setAttribute("height", height);
        }
        table.appendChild(tableRow);
    }
    return parent.appendChild(table);
}

function genMatrix(row, column) {
    var res = [];
    for (var i = 0; i < row; i++) {
        res.push([]);
        for (var j = 0; j < column; j++) {
            res[i].push(Math.random() * 2 - 1);
        }
    }
    return res;
}

function absMatrix(matrix) {
    var res = [];
    var t = 0;
    for (var i = 0; i < matrix.length; i++) {
        res.push([]);
        for (var j = 0; j < matrix[i].length; j++) {
            res[i].push(Math.abs(matrix[i][j]));
            numberOperation[3] += 1;
            t += timeOperation[3];
        }
    }
    R += matrix.length * matrix[0].length;
    Tn += Math.ceil(t / n);
    return res;
}

function calculateMatrixD() {
    var res = [];
    var absA = absMatrix(A);
    var absB = absMatrix(B);
    var t = 0;
    for (var k = 0; k < m; k++) {
        res.push([]);
        for (var i = 0; i < p; i++) {
            res[k].push([]);
            for (var j = 0; j < q; j++) {
                numberOperation[4] += 1;
                t += timeOperation[4];

                t += timeOperation[2];
                numberOperation[2] += 1;

                if (absA[i][k] < absB[k][j]) {
                    res[k][i].push(A[i][k] * B[k][j]);
                    R += 1;
                } else {
                    numberOperation[4] += 1;
                    t += timeOperation[4];
                    R += 1;
                    if (A[i][k] * B[k][j] == 0) {
                        res[k][i].push(A[i][k] + B[k][j]);
                        numberOperation[0] += 1;
                        t += timeOperation[0];
                        R += 1;
                    } else {
                        res[k][i].push(A[i][k] / B[k][j] + B[k][j] / A[i][k]);

                        R += 3;
                        numberOperation[0] += 1;
                        t += timeOperation[0];

                        numberOperation[1] += 2;
                        t += 2 * timeOperation[1];

                    }
                }
            }
        }
    }
    Tn += Math.ceil(t / n);
    return res;
}

function calculateMatrixC(D) {
    var res = [];
    var t = 0;
    for (var i = 0; i < p; i++) {
        res.push([]);
        for (var j = 0; j < q; j++) {
            var sum = 0;
            for (var k = 0; k < m; k++) {
                sum += D[k][i][j];
                numberOperation[0] += 1;
                t += timeOperation[0];
            }
            res[i].push(sum);
        }
    }
    Tn += Math.ceil(t / n);
    return res;
}








