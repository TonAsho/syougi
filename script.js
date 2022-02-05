console.log("Hello, World!");
window.onload = function() {
    drawBoard();
    drawPieces();
    goPieces();
}// carifies here
let getedKomaMe = [];
let getedKomaYou = [];
let komaCount = 0;
let onClicked = false;
let onClickedNumber = 0;
let onClickedNumberGeted = 0;
function goPieces() {
    for (let n = 1; n <= 81; n++) {
        let clickCount = 0;
        document.getElementById(`${n}`).addEventListener("click" ,()=> {
            if (onClicked === true && onClickedNumberGeted !== 0) {
                let nedInArrayFGeted;
                let nedInArrayLGeted;
                if(n===9||n===18||n===27||n===36||n===45||n===54||n===63||n===72||n===81) {
                    nedInArrayFGeted = n/9-1;
                    nedInArrayLGeted = 8;
                } else {
                    nedInArrayFGeted = Math.floor(n/9);
                    nedInArrayLGeted = Math.floor(n%9-1);
                }
                document.getElementById(`${onClickedNumberGeted*100}`).remove();
                if (onClickedNumberGeted >= 10) {
                    pieces[nedInArrayFGeted][nedInArrayLGeted] = onClickedNumberGeted/10;
                    for (let nx = 0; nx < getedKomaMe.length; nx++) {
                        if(getedKomaMe[nx] === onClickedNumberGeted) {
                            getedKomaMe.splice(nx, 1);
                            break;
                        }
                    }
                } else {
                    pieces[nedInArrayFGeted][nedInArrayLGeted] = onClickedNumberGeted*10;
                    for (let nx = 0; nx < getedKomaMe.length; nx++) {
                        if(getedKomaYou[nx] === onClickedNumberGeted) {
                            getedKomaYou.splice(nx, 1);
                            break;
                        }
                    }
                }
                onClickedNumberGeted = 0;
                onClicked = false;
                drawPiecesBack();
                drawBoard();
                drawPieces();
                goPieces();
            } else if (onClicked === true && onClickedNumber !== n) {
                // 駒移動
                // onClickedNumberからnのますへ移動
                let clickedKomaInArrayF;
                let clickedKomaInArrayL;
                if(onClickedNumber===9||onClickedNumber===18||onClickedNumber===27||onClickedNumber===36||onClickedNumber===45||onClickedNumber===54||onClickedNumber===63||onClickedNumber===72||onClickedNumber===81) {
                    clickedKomaInArrayF = onClickedNumber/9-1;
                    clickedKomaInArrayL = 8;
                } else {
                    clickedKomaInArrayF = Math.floor(onClickedNumber/9);
                    clickedKomaInArrayL = Math.floor(onClickedNumber%9-1);
                }
                let nedInArrayF;
                let nedInArrayL
                if(n===9||n===18||n===27||n===36||n===45||n===54||n===63||n===72||n===81) {
                    nedInArrayF = n/9-1;
                    nedInArrayL = 8;
                } else {
                    nedInArrayF = Math.floor(n/9);
                    nedInArrayL = Math.floor(n%9-1);
                }
                ///let clickedKomaImage = choseKoma(pieces[clickedKomaInArrayF][clickedKomaInArrayL]);
                ///let first = document.getElementById(`${n}`);
                ///let last = document.getElementById(`${onClickedNumber}`);
                changeStyleBoardBack(onClickedNumber);
                ///first.childNodes[0].src = `/images/${clickedKomaImage}`;
                ///first.childNodes[0].style.display = "block";
                ///last.childNodes[0].src = "";
                ///last.childNodes[0].style.display = "none";
                getedKomaAdder(pieces[nedInArrayF][nedInArrayL]);  
                pieces[nedInArrayF][nedInArrayL] = pieces[clickedKomaInArrayF][clickedKomaInArrayL];
                pieces[clickedKomaInArrayF][clickedKomaInArrayL] = 0;                 
                onClicked = false;
                onClickedNumber = 0;
                komaCount+=1;
                drawPiecesBack();
                drawBoard();
                drawPieces();
                goPieces();
            } else {
                if(getNumber(n) != 0) {
                    if (clickCount === 0) {
                        onClicked = true;
                        onClickedNumber = n;
                        changeStyleBoard(n);
                        clickCount = 1;
                    } else {
                        onClicked = false;
                        onClickedNumber = 0;
                        changeStyleBoardBack(n)
                        clickCount = 0;
                    }  
                } 
            }
        })
    }
}
function getedKomaAdder(komaNumber) {
    if(komaNumber>=10) {
        let newele = document.createElement("img");
        let getedKomaImage = choseKoma(komaNumber/10);
        newele.src = `${getedKomaImage}`;
        getedKomaMe+=[komaNumber];
        newele.id = `${komaNumber*100}`;
        document.getElementById("getedKomaMe").appendChild(newele);
        goPiecesGeted(komaNumber);
    } else if(komaNumber<10&&komaNumber!==0){
        let newele = document.createElement("img");
        let getedKomaImage = choseKoma(komaNumber);
        newele.src = `${getedKomaImage}`;
        getedKomaYou+=[komaNumber];
        newele.style.transform = "rotate(180deg)"
        newele.id = `${komaNumber*100}`;
        document.getElementById("getedKomaYou").appendChild(newele);
        goPiecesGeted(komaNumber);
    }
}
function goPiecesGeted(number) {
    let clickCount = 0;
    document.getElementById(`${number*100}`).addEventListener("click", function() {
        if (clickCount === 0) {
            onClicked = true;
            onClickedNumberGeted  = number;
            changeStyleBoard(number*100);
            clickCount = 1;
        } else {
            onClicked = false;
            onClickedNumberGeted  = number;
            document.getElementById(number*100).style.backgroundColor = "rgb(160, 135, 88)"
            clickCount = 0;
        }  
    })
}
function changeStyleBoard(number) {
    document.getElementById(number).style.backgroundColor = "rgb(10, 103, 41)"
}
function changeStyleBoardBack(number) {
    document.getElementById(number).style.backgroundColor = "wheat"    
}
function getNumber(n) {
    if(n===9||n===18||n===27||n===36||n===45||n===54||n===63||n===72||n===81) {
        return pieces[n/9-1][8];
    } else {
        return pieces[Math.floor(n/9)][Math.floor(n%9-1)];
    }
}
function drawBoard() {
    let parents = document.getElementById("board");
    var parent = document.createElement("div");
    for (let n = 1; n <= 81; n++) {
        let newElement = document.createElement("div");
        if(n===1||n===10||n===19||n===28||n===37||n===46||n===55||n===64||n===73) {
            parent = document.createElement("div");
            parents.appendChild(parent);
            parent.className = "boardFloat";
            newElement.className = "boards";
            parent.appendChild(newElement);
        } else {
            newElement.className = "boards";
            parent.appendChild(newElement);
        }
        newElement.id = `${n}`;
    }
}
let pieces = [
    [20, 30, 40, 50, 80, 50, 40, 30, 20],
    [0, 60, 0, 0, 0, 0, 0, 70, 0],
    [10, 10, 10, 10, 10, 10, 10, 10, 10],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 7, 0, 0, 0, 0, 0, 6, 0],
    [2, 3, 4, 5, 8, 5, 4, 3, 2],
];
function drawPiecesBack() {
    document.getElementById("board").remove();
    let element = document.createElement("div");
    element.id = "board";
    element.className = "board";
    document.getElementById("body").append(element);
}
function drawPieces() { 
    for (let n = 0; n < pieces.length; n++) {
        for (let x = 0; x < pieces[n].length; x++) {
            let element = pieces[n][x];
            let newEle = document.createElement("img");
            if(element >= 10) {
                element/=10;
                newEle.style.transform = "rotate(180deg)"
            }
            const image = choseKoma(element);
            if(image != undefined) {
                newEle.src = `${image}`;
                document.getElementById(`${n*9+x+1}`).appendChild(newEle);
            } else {
                newEle.src = "";
                document.getElementById(`${n*9+x+1}`).appendChild(newEle)
                newEle.style.display = "none"
            }
            
        }
    }
}
function choseKoma(number) {
    switch (number) {
        case 1:
            return "hu.png";   
        case 2:
            return "kyou.png";
        case 3:
            return "kei.png";   
        case 4:
            return "ginn.png";
        case 5:
            return "kinn.png";   
        case 6:
            return "hisya.png";
        case 7:
            return "kaku.png";   
        case 8:
            return "ousyou.png";
        default:
            break;
    }
}
