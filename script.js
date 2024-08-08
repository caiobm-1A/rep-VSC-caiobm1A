var spaces = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var names = ["one", "two", "thr", "fou", "fiv", "six", "sev", "eig", "nin"];

var c = document.getElementById("canv");
var ctx = c.getContext("2d");
ctx.strokeStyle = "white";
createLines();

function createLines() {
    for (let i=1; i<=2; i++) {
        ctx.moveTo(200*i, 0);
        ctx.lineTo(200*i, 600);
        ctx.moveTo(0, 200*i);
        ctx.lineTo(600, 200*i);
    }
    ctx.stroke();
}

function clicked(x) {
    if (document.getElementById(names[x-1]).getAttribute("src") == "empty.png" && checkWin() == "nay") {
        document.getElementById("num").innerHTML = x;
        document.getElementById(names[x-1]).setAttribute("src", "circle.png");
        spaces[x-1] = 1
    }

    if (checkWin() == "nay") {
        botTurn();
    }
}

function botTurn() {
    let randomPlace = Math.floor(Math.random() * 9);
    if (spaces[randomPlace] == 0) {
        document.getElementById(names[randomPlace]).setAttribute("src", "xiss.png");
        spaces[randomPlace] = 2;
    } else if (spaces.includes(0)) {
        botTurn();
    }

    checkWin();
}

function checkWin() {
    let someoneWon = false;
    let a=spaces[0], b=spaces[1], c=spaces[2], d=spaces[3], e=spaces[4],
        f=spaces[5], g=spaces[6], h=spaces[7], i=spaces[8];
    for (p=1; p<=2; p++) {

        if (a==p&&b==p&&c==p||d==p&&e==p&&f==p||g==p&&h==p&&i==p) {
            if (p == 1) {
                document.getElementById("winner").innerHTML = "Player Wins!!"
            } else {document.getElementById("winner").innerHTML = "Player Loses :c"}
            someoneWon = true;
        }

        if (a==p&&d==p&&g==p||b==p&&e==p&&h==p||c==p&&f==p&&i==p) {
            if (p == 1) {
                document.getElementById("winner").innerHTML = "Player Wins!!"
            } else {document.getElementById("winner").innerHTML = "Player Loses :c"}
            someoneWon = true;
        }

        if (a==p&&e==p&&i==p||c==p&&e==p&&g==p) {
            if (p == 1) {
                document.getElementById("winner").innerHTML = "Player Wins!!"
            } else {document.getElementById("winner").innerHTML = "Player Loses :c"}
            someoneWon = true;
        }
    }

    if (someoneWon) {
        return "stop";
    } else {
        return "nay";
    }
}