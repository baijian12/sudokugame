//等待输入
function listenInput(board){
    $(document).ready(function(){
      $('.cell').each(function() {
        var elem = $(this);
   
        //添加change事件
        elem.on("change input", function(event){
          var index = elem[0].getAttribute("name");
          var number = elem[0].value; 
          var x = index.charAt(0);
          var y = index.charAt(1);
          if (isNaN(number)){ 
            elem[0].style.color = "red";
          } else if(number == 0){
            elem[0].style.color = "red";
          } else if(!isValid(board, x, y, number)){ //输入不符合要求也要标红
            elem[0].style.color = "red";
          } else{
            elem[0].style.color = "blue";
            var attr = document.createAttribute("value");
            attr.value = number;
            elem[0].setAttributeNode(attr);
            board[x][y] = parseInt(number);
            return;
          }
        });
      });
    });
  }
  function reset(){
    if(answering){
      alert("You don't have chance!");
      return;
    }
    var ele = document.getElementsByClassName("cell");
    for (var i = 0; i < ele.length; i++){
      if (ele[i].readOnly == false){
        ele[i].value = ""; 
        var index = ele[i].getAttribute("name");      
        var x = index.charAt(0);
        var y = index.charAt(1);
        board[x][y] = "";
      } 
    }
  }
  var board = [];
var answer = [];
var answering = 0;
//新游戏 按钮
function startNew(){
  //清零STOP以及answering, 全局变量的设置一定要注意，否则有很多bug
  STOP = 0;
  answering = 0;
  var a = window.confirm("Sure to start a new game?\n \nYour work will be clear!");
  if(a){
    for(var i = 0; i < 9; i++){
      for(var j = 0; j < 9; j++)
        board[i][j] = "";
    }
    var ele = document.getElementsByClassName("cell");
    for(var i = 0; i < ele.length; i++){
      ele[i].value = "";
      ele[i].style.color = "black";
    }
    var mySelect = document.getElementById("diff_form");
    var diffMode = mySelect.options.selectedIndex;
    
    generateSudoku(board);
    solve(board);
    //document.getElementById("demo2").innerHTML=board;

    for(var i = 0; i < 9; i++){
      answer[i] = [];
      Object.assign(answer[i], board[i]);
    }
    //随机挖洞，传入难度参数
    hideValue(board, diffMode);
    //document.getElementById("demo3").innerHTML=board;
    clearInterval(int);
    Reset();
    start();
    setValue2(board);
  }
  else{
    return;
  }

}
//答案 按钮
function getAnswer(){
  //假如已经查看答案，这个按钮不能按(后期变灰)
  if(answering){
    alert("You are NOW viewing answer!");
    return;
  }
  //弹出提示信息
  var a = window.confirm("You want to give up?");
  if(a){
    if(STOP == 0){
      stop();
    }
    answering = 1;
    var ele = document.getElementsByClassName("cell");
    var count = 0;
    //用之前保存的answer二维数组填充盘，且填充的颜色是蓝色
    for(var i = 0; i < 9; i++){
      for(var j = 0; j < 9; j++){
        if(ele[count].readOnly == false){
          ele[count].value = answer[i][j];
          ele[count].style.color = "blue";
        }
        count++;
      }
    }
  }
  else{
    return;
  }
}