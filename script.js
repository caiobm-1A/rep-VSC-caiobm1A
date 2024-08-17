var spaces = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var names = ["one", "two", "thr", "fou", "fiv", "six", "sev", "eig", "nin"];

var c = document.getElementById("canv");
var ctx = c.getContext("2d");
ctx.strokeStyle = "black";
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
        //document.getElementById("num").innerHTML = x;
        document.getElementById(names[x-1]).setAttribute("src", "circle.png");
        spaces[x-1] = 1;
        document.getElementById(names[x-1]).setAttribute("disabled","disabled");
    }

    if (checkWin() == "nay") {
        botTurn();
    }
}

function botTurn() {
    let botsPlace = smortBotTurn();

    if (botsPlace == "redo") {
        botTurn();
    } else {
        if (spaces[botsPlace] == 0) {
            document.getElementById(names[botsPlace]).setAttribute("src", "xiss.png");
            spaces[botsPlace] = 2;
            document.getElementById(names[botsPlace]).setAttribute("disabled","disabled");
        } else if (spaces.includes(0)) {
            botTurn();
        }

        checkWin();
    }
}

function smortBotTurn() {
    let opt = [];

    for (p=1; p<=2; p++) {
        let a=(spaces[0]==p), b=(spaces[1]==p), c=(spaces[2]==p), d=(spaces[3]==p), e=(spaces[4]==p),
        f=(spaces[5]==p), g=(spaces[6]==p), h=(spaces[7]==p), i=(spaces[8]==p);
        
        if ((b&&c || d&&g || e&&i) && spaces[0]==0) {opt.push([0,p])};
        if ((a&&c || e&&h) && spaces[1]==0) {opt.push([1,p])};
        if ((a&&b || f&&i || e&&g) && spaces[2]==0) {opt.push([2,p])};
        if ((e&&f || a&&g) && spaces[3]==0) {opt.push([3,p])};
        if ((d&&f || b&&h || a&&i || c&&g) && spaces[4]==0) {opt.push([4,p])};
        if ((d&&e || c&&i) && spaces[5]==0) {opt.push([5,p])};
        if ((h&&i || a&&d || c&&e) && spaces[6]==0) {opt.push([6,p])};
        if ((g&&i || b&&e) && spaces[7]==0) {opt.push([7,p])};
        if ((g&&h || c&&f || a&&e) && spaces[8]==0) {opt.push([8,p])};
    }

    if (opt.length == 0) {
        let rand = Math.floor(Math.random() * 9);
        if (spaces[rand] == 0) {
            return rand;
        } else if (spaces.includes(0)) {
            return "redo";
        }
    } else if (opt.length >= 1) {
        let rand = Math.floor(Math.random() * opt.length);

        if (opt[rand][1] == 2) {
            return opt[rand][0];
        } else {
            for (n=0; n<9; n++) {
                if (opt.includes([n,2])) {
                    return "redo";
                } else {
                    if (n == 8) {
                        return opt[rand][0];
                    }
                }
            }
        }
    }
}

function checkWin() {
    let someoneWon = false;
    let a=spaces[0], b=spaces[1], c=spaces[2], d=spaces[3], e=spaces[4],
        f=spaces[5], g=spaces[6], h=spaces[7], i=spaces[8];
    for (p=1; p<=2; p++) {

        if (a==p&&b==p&&c==p||d==p&&e==p&&f==p||g==p&&h==p&&i==p) {
            if (p == 1) {
                document.getElementById("winner").innerHTML = "Jogador Venceu!!"
            } else {document.getElementById("winner").innerHTML = "Jogador Perdeu :c"}
            someoneWon = true;
        }

        if (a==p&&d==p&&g==p||b==p&&e==p&&h==p||c==p&&f==p&&i==p) {
            if (p == 1) {
                document.getElementById("winner").innerHTML = "Jogador Venceu!!"
            } else {document.getElementById("winner").innerHTML = "Jogador Perdeu :c"}
            someoneWon = true;
        }

        if (a==p&&e==p&&i==p||c==p&&e==p&&g==p) {
            if (p == 1) {
                document.getElementById("winner").innerHTML = "Jogador Venceu!!"
            } else {document.getElementById("winner").innerHTML = "Jogador Perdeu :c"}
            someoneWon = true;
        }
    }
    
    if (someoneWon) {
        return "stop";
    } else {
        if (spaces.includes(0)) {
            return "nay";
        } else {
            document.getElementsByClassName("totheside").item(0).setAttribute("style","position:absolute;border:5px solid rgb(165,165,165);padding:10px;width:auto;height:auto;left:calc(50% + 330px);top:30px");
            document.getElementById("winner").innerHTML
        }
    }
}