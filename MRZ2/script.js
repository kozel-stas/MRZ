var data;
google.charts.load('current', {'packages': ['line']});

var m;
var p;
var q;
var n;
var timeOperation = [];
var numberOperation = [];
var nodes = [];

var T1;
var Time;
var Tn;
var R;
var Ky;
var E;
var kD;
var Lavg;

var A = [];
var B = [];

function drawCharts() {
    Kyr();
    Kyn();
    en();
    er();
    Dn();
    Dr();
}

function Kyr() {
    dataChartR("Ky", 50, 20, true);
    drawChartKyR();
    dataChartR("Ky", 50, 20, false);
    drawChartKyR();
}

function er() {
    dataChartR("e", 100, 20, true);
    drawChartER();
    dataChartR("e", 100, 20, false);
    drawChartER();
}

function Dr() {
    dataChartR("D", 30, 20, true);
    drawChartDR();
    dataChartR("D", 30, 20, false);
    drawChartDR();
}

function Kyn() {
    dataChartN("Ky", 20, 100, true);
    drawChartKyN();
    dataChartN("Ky", 20, 100, false);
    drawChartKyN();
}

function en() {
    dataChartN("e", 20, 100, true);
    drawChartEN();
    dataChartN("e", 20, 100, false);
    drawChartEN();
}

function Dn() {
    dataChartN("D", 20, 100, true);
    drawChartDN();
    dataChartN("D", 20, 100, false);
    drawChartDN();
}

function drawChartKyN() {

    var chartData = new google.visualization.DataTable();
    chartData.addColumn('number', '');
    for (var i = 1; i <= 20; i++)
        chartData.addColumn('number', 'r = ' + (i).toString());

    chartData.addRows(data);

    var options = {
        chart: {
            title: 'Коэффициент ускорения от количества процессорных элементов'
        },
        width: 900,
        height: 500
    };

    var div = document.createElement("div");
    div.setAttribute("class", "Charts");
    var body = document.querySelector("body");
    body.appendChild(div);

    var chart = new google.charts.Line(div);


    chart.draw(chartData, options);
}

function drawChartEN() {

    var chartData = new google.visualization.DataTable();
    chartData.addColumn('number', '');
    for (var i = 1; i <= 20; i++)
        chartData.addColumn('number', 'r = ' + (i).toString());

    chartData.addRows(data);

    var options = {
        chart: {
            title: 'Эффективность от количества процессорных элементов'
        },
        width: 900,
        height: 500
    };

    var div = document.createElement("div");
    div.setAttribute("class", "Charts");
    var body = document.querySelector("body");
    body.appendChild(div);

    var chart = new google.charts.Line(div);

    chart.draw(chartData, options);
}

function drawChartDN() {

    var chartData = new google.visualization.DataTable();
    chartData.addColumn('number', '');
    for (var i = 1; i <= 20; i++)
        chartData.addColumn('number', 'r = ' + (i).toString());

    chartData.addRows(data);

    var options = {
        chart: {
            title: 'Коэффициент расхождения от количества процессорных элементов'
        },
        width: 900,
        height: 500
    };

    var div = document.createElement("div");
    div.setAttribute("class", "Charts");
    var body = document.querySelector("body");
    body.appendChild(div);
    var chart = new google.charts.Line(div);

    chart.draw(chartData, options);
}

function drawChartKyR() {
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('number', '');
    for (var i = 1; i <= 20; i++)
        chartData.addColumn('number', 'n = ' + (i).toString());

    chartData.addRows(data);

    var options = {
        chart: {
            title: 'Коэффициент ускорения от ранга задачи'
        },
        width: 900,
        height: 500
    };

    var div = document.createElement("div");
    div.setAttribute("class", "Charts");
    var body = document.querySelector("body");
    body.appendChild(div);

    var chart = new google.charts.Line(div);

    chart.draw(chartData, options);
}

function drawChartER() {

    var chartData = new google.visualization.DataTable();
    chartData.addColumn('number', '');
    for (var i = 1; i <= 20; i++)
        chartData.addColumn('number', 'n = ' + (i).toString());

    chartData.addRows(data);

    var options = {
        chart: {
            title: 'Эффективность от ранга задачи'
        },
        width: 900,
        height: 500
    };

    var div = document.createElement("div");
    div.setAttribute("class", "Charts");
    var body = document.querySelector("body");
    body.appendChild(div);

    var chart = new google.charts.Line(div);

    chart.draw(chartData, options);
}

function drawChartDR() {

    var chartData = new google.visualization.DataTable();
    chartData.addColumn('number', '');
    for (var i = 1; i <= 20; i++)
        chartData.addColumn('number', 'n = ' + (i).toString());

    chartData.addRows(data);

    var options = {
        chart: {
            title: 'Коэффициент расхождения от ранга задачи'
        },
        width: 900,
        height: 500
    };

    var div = document.createElement("div");
    div.setAttribute("class", "Charts");
    var body = document.querySelector("body");
    body.appendChild(div);

    var chart = new google.charts.Line(div);

    chart.draw(chartData, options);
}

function dataChartR(str, rmax, nmax, flag) {
    data = new Array(rmax);
    for (var r = 0; r < rmax; r++) {
        data[r] = new Array(nmax + 1);
        for (var n = 0; n < nmax; n++)
            data[r][n] = buildValue(str, r, n, flag);
    }

    for (var i = 0; i < rmax; i++) {
        data[i][0] = i + 1;
    }
}

function dataChartN(str, rmax, nmax, flag) {
    data = new Array(nmax);
    for (var n = 0; n < nmax; n++) {
        data[n] = new Array(rmax + 1);
        for (var r = 0; r < rmax; r++)
            data[n][r] = buildValue(str, r, n, flag);
    }

    for (var i = 0; i < nmax; i++) {
        data[i][0] = i + 1;
    }
}

function buildValue(str, r, n, flag) {
    var p = 1;
    var m = 1;
    var q = r;

    var compareTime = +document.getElementById('inputT5').value;
    var absTime = +document.getElementById('inputT4').value;
    var multiplicationTime = +document.getElementById('inputT3').value;
    var divisionTime = +document.getElementById('inputT2').value;
    var additionTime = +document.getElementById('inputT1').value;


    var firstBranch = 0;
    var secondBranch = 0;
    var thirdBranch = 0;

    var firstNode = 0, secondNode = 0, thirdNode = 0, fourthNode = 0, fivethNode = 0;


    var A = [];
    var B =[];
    if(flag){
        A = genMatrixTest(p,m);
        B = genMatrixTest(m,q);
    } else {
        A = genMatrix(p,m);
        B = genMatrix(m,q);
    }

    for (var k = 0; k < m; k++) {
        for (var i = 0; i < p; i++) {
            for (var j = 0; j < q; j++) {
                firstNode++;
                if (Math.abs(A[i][k]) < Math.abs(B[k][j])) {
                    secondNode++;
                    firstBranch++;
                }
                else if ((A[i][k]) * (B[k][j]) == 0) {
                    thirdNode++;
                    fourthNode++;
                    secondBranch++;
                }
                else {
                    thirdNode++;
                    fivethNode++;
                    thirdBranch++;
                }
            }
        }
    }

    var allTime = 0;

    allTime += (compareTime + 2 * absTime + multiplicationTime) * Math.ceil(firstBranch / n);
    allTime += (compareTime + 2 * absTime + multiplicationTime + compareTime + additionTime) * Math.ceil(secondBranch / n);
    allTime += (compareTime + 2 * absTime + multiplicationTime + compareTime + divisionTime * 2 + additionTime) * Math.ceil(thirdBranch / n);

    var consistentTime = 0;

    consistentTime += (compareTime + 2 * absTime + multiplicationTime) * firstBranch;
    consistentTime += (compareTime + 2 * absTime + multiplicationTime + compareTime + additionTime) * secondBranch;
    consistentTime += (compareTime + 2 * absTime + multiplicationTime + compareTime + divisionTime * 2 + additionTime) * thirdBranch;

    var middleTime = 0;

    middleTime += (compareTime + 2 * absTime) * firstNode;
    middleTime += (multiplicationTime) * secondNode;
    middleTime += (compareTime + multiplicationTime) * thirdNode;
    middleTime += (additionTime) * fourthNode;
    middleTime += (divisionTime * 2 + additionTime) * fivethNode;


    var left = m;
    var numAdditions = 0;
    while (left > 1) {
        if (2 * n >= left) {
            left -= Math.floor(left / 2);
        }
        else {
            left -= n;
        }
        numAdditions++;
    }

    allTime += additionTime * numAdditions * p * q;

    consistentTime += (m - 1) * additionTime * p * q;

    middleTime += additionTime * numAdditions * p * q * m;
    middleTime /= p * m * q;

    var Ky = consistentTime / allTime;
    var e = Ky / n;
    var D = allTime / middleTime;

    if (str == 'Ky')
        return Ky;

    if (str == 'e')
        return e;

    if (str == 'D')
        return D;
}

function genMatrixTest(row, column) {
    var res = [];
    for (var i = 0; i < row; i++) {
        res.push([]);
        for (var j = 0; j < column; j++) {
            res[i].push(1);
        }
    }
    return res;
}

/////////////////////////////////////Data

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

    numberOperation = [];
    nodes = [];
    for (var i = 0; i < timeOperation.length; i++) {
        numberOperation.push(0);
        nodes.push(0);
    }
    nodes.push(0);
    Time = 0;
    A = genMatrix(p, m);
    B = genMatrix(m, q);
    var D = calculateMatrixD();

    var C = [];

    for (var i = 0; i < p; i++) {
        C.push([]);
        for (var j = 0; j < q; j++) {
            C[i].push(Math.round(calculateCElem(i, j, D) * 1000) / 1000);
        }
    }
    R = p * m * q;
    Ky = Time / Tn;
    E = Ky / n;

    //i=0...p; j=0...q; k=0...m
    //t[0] - "+"
    //t[1] - "/"
    //t[2] - "*"
    //t[3] - "||"
    //t[4] - "<"

    Lavg = 0;

    Lavg += (timeOperation[3] * 2 + timeOperation[4]) * nodes[0];
    Lavg += (timeOperation[2]) * nodes[1];
    Lavg += (timeOperation[4] + timeOperation[2]) * nodes[2];
    Lavg += (timeOperation[0]) * nodes[3];
    Lavg += (timeOperation[1] * 2 + timeOperation[0]) * nodes[4];
    Lavg += nodes[5];
    Lavg /= R;

    kD = Tn / Lavg;

    generateTables(C, D);
}

function generateTables(C, D) {
    document.getElementById('AllTables').parentNode.removeChild(document.getElementById('AllTables'));
    var div = document.createElement("div");
    div.setAttribute("id", "AllTables");
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

    div.appendChild(table);
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
    div.appendChild(table);

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
    div.appendChild(table);

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

    tableHeader = document.createElement("th");
    var text = document.createTextNode("r");
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
    tableData.innerHTML += "<p align='center'>" + Time + "</p>";
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
    tableData.innerHTML += "<p align='center'>" + kD.toFixed(3) + "</p>";
    tableRow.appendChild(tableData);
    table.appendChild(tableRow);

    tableData = document.createElement("td");
    tableData.setAttribute("rowspan", "2");
    tableData.innerHTML += "<p align='center'>" + R + "</p>";
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
    div.appendChild(table);
    body.appendChild(div);
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
    Tn += Math.ceil(t / n);
    Time += t;
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
                //<=>
                numberOperation[4] += 1;
                t += timeOperation[4];
                //*
                numberOperation[2] += 1;
                t += timeOperation[2];

                nodes[0] += 1;

                if (absA[i][k] < absB[k][j]) {
                    res[k][i].push(A[i][k] * B[k][j]);

                    nodes[1] += 1;
                } else {

                    nodes[2] += 1;

                    //<=>
                    numberOperation[4] += 1;
                    t += timeOperation[4];
                    if (A[i][k] * B[k][j] === 0) {
                        res[k][i].push(A[i][k] + B[k][j]);
                        //+
                        numberOperation[0] += 1;
                        t += timeOperation[0];

                        nodes[3] += 1;
                    } else {
                        res[k][i].push(A[i][k] / B[k][j] + B[k][j] / A[i][k]);
                        //+
                        numberOperation[0] += 1;
                        t += timeOperation[0];
                        // /
                        numberOperation[1] += 2;
                        t += 2 * timeOperation[1];

                        nodes[4] += 1;
                    }
                }
            }
        }
    }
    Time += t;
    Tn += Math.ceil(t / n);
    return res;
}

function calculateCElem(i, j, D) {
    var Dk = [];
    for (var k = 0; k < D.length; k++) {
        Dk.push(D[k][i][j]);
    }
    return sumArray(Dk);
}

function sumArray(D) {
    if (D.length == 1) {
        var res = D[0];
        return res;
    } else {
        var t = 0;
        var nIter = 0;
        var res = [];
        if (D.length % 2 === 1) {
            res.push(D[D.length - 1]);
        }
        for (var i = 0; i < (D.length - D.length % 2); i += 2) {
            if (nIter === n) {
                for (var j = i; j < D.length; j++) {
                    res.push(D[j]);
                }
                break;
            }

            res.push(D[i] + D[i + 1]);

            nIter += 1;

            numberOperation[0] += 1;
            t += timeOperation[0];

        }
        Time += t;
        Tn += Math.ceil(t / n);
        nodes[5] += Math.ceil(t / n);
        return (sumArray(res));
    }
}







