function sumBitNumber(a, b) {
    if (a.length > b.length) {
        b = addBitEnd(b, a.length - b.length);
    } else {
        if (a.length < b.length) {
            a = addBitEnd(a, b.length - a.length);
        }
    }
    var answer = "";
    var over = 0;
    for (var i = a.length - 1; i > -1; i--) {
        var curr = parseInt(a[i]) + parseInt(b[i]) + over;
        switch (curr) {
            case 0:
                over = 0;
                answer += "0";
                break;
            case 1:
                over = 0;
                answer += "1";
                break;
            case 2:
                over = 1;
                answer += "0";
                break;
            case 3:
                over = 1;
                answer += "1";
                break;
        }
    }
    if (over == 1) answer += "1";
    answer = answer.split("").reverse().join("");
    return answer;
}

function addBit(a, num) {
    var temp = a;
    a = "";
    for (var i = 0; i < num; i++) {
        a += "0";
    }
    a += temp;
    return a;
}

function addBitEnd(a, num) {
    for (var i = 0; i < num; i++) {
        a += "0";
    }
    return a;
}

function shift(a, num) {
    for (var i = 0; i < num + 1; i++) {
        a = "0" + a;
    }
    return a;
}

function multiply(a, b, index) {
    if (index > a.length) return null;
    if (b[index] == '0')
        return "000000"
    else return a;
}

function createTable(num) {
    var body = document.querySelector("body"),
        table = document.querySelector("table"),
        height = 60,
        width = 3500,
        rows = (5 + num),
        columns = 20,
        tableRow = "",
        tableData = "",
        tableHeader = "",
        firstTable = document.querySelector("table");
////////////////////////////////////////////////////////////////////////////////
    table = document.createElement("table");
    table.setAttribute("width", width);
    table.setAttribute("border", "1px")
    table.setAttribute("bordercolor", "black");
    table.setAttribute("align", "center");
//////////////////////////////////////////////////////////////////////////////////
    tableRow = document.createElement("tr");
    tableHeader = document.createElement("th");
    tableHeader.setAttribute("rowspan", "2");
    text = document.createTextNode("Такты");
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
////////////////////////////////////////////////////////////////////////////////////
    for (var i = 0; i < 6; i++) {
        tableHeader = document.createElement('th');
        tableHeader.setAttribute("colspan", "3");
        text = document.createTextNode('Этап ' + (i + 1));
        tableHeader.appendChild(text);
        tableRow.appendChild(tableHeader);
    }
//////////////////////////////////////////////////////////////////////////////////////////////
    tableHeader = document.createElement("th");
    tableHeader.setAttribute("rowspan", "2");
    text = document.createTextNode("Результат");
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
    table.appendChild(tableRow);
    tableRow = document.createElement("tr");
///////////////////////////////////////////////////////////////////////////////////////////
    for (var i = 0; i < 6; i++) {
        tableHeader = document.createElement("th");
        text = document.createTextNode("A*b[" + i + "]");
        tableHeader.appendChild(text);
        tableRow.appendChild(tableHeader);
        tableHeader = document.createElement("th");
        text = document.createTextNode("Сдвиг");
        tableHeader.appendChild(text);
        tableRow.appendChild(tableHeader);
        tableHeader = document.createElement("th");
        text = document.createTextNode("Сумма+A*b[" + i + "]");
        tableHeader.appendChild(text);
        tableRow.appendChild(tableHeader);
    }
    table.appendChild(tableRow);
//////////////////////////////////////////////////////////////////////////////////////////////////
    for (var rowNum = 0; rowNum < rows; rowNum++) {
        tableRow = document.createElement("tr");
        for (var colNum = 0; colNum < columns; colNum++) {
            tableData = document.createElement("td");
            tableData.id = ((rowNum + 1) + "." + (colNum + 1));
            tableRow.appendChild(tableData);
            tableData.setAttribute("height", height);
        }
        table.appendChild(tableRow);
    }
    table.appendChild(tableRow);
///////////////////////////////////////////////////////////////////////////////////////////////////
    if (firstTable == null) {
        return body.appendChild(table);
    } else {
        var newTable = body.appendChild(table);
        return document.body.replaceChild(newTable, firstTable);
    }
}

function insertInTable(firstNumbers, secondNumbers, P, num, numOfBit, i, j, numberTic) {
    var ansMultiply;
    var ansShift;
    if (numOfBit < 0 || numOfBit > 5) {
        return;
    }
    document.getElementById(i + "." + j).innerHTML = "<p>A[" + (num + 1) + "]=" + firstNumbers[num] + "</p><p>B[" + (num + 1) + "]=" + secondNumbers[num] + "</p><p>Сумма=" + P[num] + "</p><hr>";
    ansMultiply = multiply(firstNumbers[num], secondNumbers[num], numOfBit);
    document.getElementById(i + "." + j).innerHTML += "<p>A[" + (num + 1) + "]*B[" + (num + 1) + "][" + numOfBit + "]=" + ansMultiply + "</p>"
    document.getElementById(i + "." + (j + 1)).innerHTML = "<p>A[" + (num + 1) + "]=" + firstNumbers[num] + "</p><p>B[" + (num + 1) + "]=" + secondNumbers[num] + "</p><p>Сумма=" + P[num] + "</p><hr>";
    ansShift = shift(ansMultiply, numOfBit);
    document.getElementById(i + "." + (j + 1)).innerHTML += "<p>Сдвиг=" + ansShift + "</p>";
    document.getElementById(i + "." + (j + 2)).innerHTML = "<p>A[" + (num + 1) + "]=" + firstNumbers[num] + "</p><p>B[" + (num + 1) + "]=" + secondNumbers[num] + "</p><p>Сумма=" + P[num] + "</p><hr>";
    P[num] = sumBitNumber(P[num], ansShift);
    document.getElementById(i + "." + (j + 2)).innerHTML += "<p>Cумма+A[" + (num + 1) + "]*B[" + (num + 1) + "][" + numOfBit + "]=" + P[num] + "</p>";
    if (numOfBit == 5) {
        document.getElementById((numOfBit + num + 1) + "." + 20).innerHTML = "<p>Время: " + (numOfBit + num + 1) * numberTic + " тактов</p>";
    }
}

function parseSet(Set) {
    var num = [];
    var index = 0;
    for (var i = 0; i < Set.length + 1; i++) {
        if (Set.charAt(i) === "," || i == Set.length) {
            num.push(parseInt(Set.substring(index, i), 10));
            index = i + 1;
        }
    }
    return num;
}

function start() {
    var setA = document.getElementById("setA").value;
    var setB = document.getElementById("setB").value;
    var numberTic = document.getElementById('T').value;
    if (numberTic == 0 || numberTic.match(/\d+/) == null || (setB.match(/(\d{1,2},)*\d{1,2}$/) == null && setB.match(/(\d{1,2}){1}$/) == null) || (setA.match(/(\d{1,2},)*\d{1,2}$/) == null && setA.match(/(\d{1,2}){1}$/) == null)) {
        alert("Введены некорректные данные, попробуйте снова!");
        return;
    }
    var firstNumbers = parseSet(setA);
    var secondNumbers = parseSet(setB);
    if (firstNumbers.length != secondNumbers.length) {
        alert("Введены вектора различной длины!");
        return;
    }
    for (var i = 0; i < firstNumbers.length; i++) {
        if (firstNumbers[i] > 63 || firstNumbers[i] < 0 || secondNumbers[i] > 63 || secondNumbers[i] < 0 || numberTic < 0) {
            alert("Введены некорректные данные, попробуйте снова!");
            return;
        }
    }
    createTable(firstNumbers.length);
    for (var i = 1; i < 6 + firstNumbers.length; i++) {
        document.getElementById(i + "." + 1).innerHTML = "Такты: " + (i * numberTic);
    }
    for (var i = 0; i < firstNumbers.length; i++) {
        firstNumbers[i] = addBit(firstNumbers[i].toString(2), 6 - firstNumbers[i].toString(2).length);
        secondNumbers[i] = addBit(secondNumbers[i].toString(2), 6 - secondNumbers[i].toString(2).length);
    }
    var Ans = [];
    for (var i = 0; i < firstNumbers.length; i++) {
        Ans.push("000000000000");
        document.getElementById((i + 1) + "." + 1).innerHTML += "<p>A[" + (i + 1) + "]<sub>10</sub>=" + parseInt(firstNumbers[i], 2) + "</p><p>A[" + (i + 1) + "]<sub>2</sub>=" + firstNumbers[i] + "</p><p>B[" + (i + 1) + "]<sub>10</sub>=" + parseInt(secondNumbers[i], 2) + "</p></p>B[" + (i + 1) + "]<sub>2</sub>=" + secondNumbers[i] + "</p>";
    }
    for (var tic = 0; tic < 5 + firstNumbers.length; tic++) {
        for (var j = 0; j < firstNumbers.length; j++) {
            insertInTable(firstNumbers, secondNumbers, Ans, j, tic - j, (tic + 1), (tic * 3) + 2 - j * 3, numberTic);
        }
    }
    for (var i = 0; i < Ans.length; i++) {
        document.getElementById((6 + i) + "." + 20).innerHTML += Ans[0] + "<sub>2</sub>=" + parseInt(Ans[i], 2) + "<sub>10</sub>";
    }
}
