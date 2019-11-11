//初始化界面，给每个cell添加坐标属性(name = "" + row + col)
function initializePage() {
    generateBoard();
    var board = getBoardArray();
    //name属性代表了坐标
    var ele = document.getElementsByClassName("cell");
    var i = 0;
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            var nameAttr = document.createAttribute("name");
            nameAttr.value = "" + row + col;
            ele[i].setAttributeNode(nameAttr);
            i += 1;
        }
    }
}

function init() {
    generateSudoku(board);
    solve(board);
    for (var i = 0; i < 9; i++) {
        answer[i] = [];
        Object.assign(answer[i], board[i]);
    }
    hideValue(board, 1);
    setValue(board);
    start();
    listenInput(board);
    console.log(board);
}