var player1 = null;
var player2 = null;
var vs_computer;
var player1_score = 0;
var player2_score = 0;
var turn = 1;
var game_board = new Array(9).fill(0); //0-unused 1-player1 2-player2
var previous_board = new Array(9).fill(0);
var next_board = new Array(9).fill(0);
var reds = new Array(2);
reds[0] = Math.floor((Math.random() * 9));
reds[1] = Math.floor((Math.random() * 9));
while(reds[0] == reds[1]) {
    reds[0] = Math.floor((Math.random() * 9));
    reds[1] = Math.floor((Math.random() * 9));
}
var next_reds = new Array(2);

var win_sound = new Audio("./audio/good.wav");
var tie_sound = new Audio("./audio/bad.wav");



function bestMove() {
    // AI to make its turn
    var board = game_board.slice();
    var bestScore = -Infinity;
    var move;
    for (var i = 0; i < 9; i++) {
        // Is the spot available?
        if (board[i] == 0) {
            board[i] = 2;
            var score = minimax(board, 0, false);
            board[i] = 0;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    if(move == null) return -1;
    return move;
}

function checkWinner(board) {
  var winner = null;
    var j;

    if ((board[0] != 0) && (board[0] == board[1]) && (board[1] == board[2])) {
        winner = board[0];
    }
    
    if((board[3] != 0) && (board[3] == board[4]) && (board[4] == board[5])){
        winner = board[3];
    }
    
    if((board[6] != 0) && (board[6] == board[7]) && (board[7] == board[8])){
        winner = board[6];
    }

  // Vertical
    for(j=0;j<6;j++){
        for(i=0; i<3; i++){
            if((board[i+j] != 0) && (board[i+j] == board[i+j+3]) && (board[i+j+3] == board[i+j+6])){
                winner = board[i+j];
            }
        }
    }

    if((board[2] != 0) && (board[2] == board[4]) && (board[4] == board[6])){
        winner = board[2];
    } 

    if((board[0] != 0) && (board[0] == board[4]) && (board[4] == board[8])){
        winner = board[0];
    }

  var openSpots = 0;
  for (var i = 0; i < 9; i++) {
      if (board[i] == 0) {
        openSpots++;
      }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

var scores = {
  1: -10,
  2: 10,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
    var result = checkWinner(board);
    
    if (result != null) {
        return scores[result];
    }

    if (isMaximizing) {
        var bestScore = -Infinity;
        for (var i = 0; i < 9; i++) {
            // Is the spot available?
            if (board[i] == 0) {
              board[i] = 2;
              var score = minimax(board, depth + 1, false);
              board[i] = 0;
              bestScore = Math.max(score, bestScore);
            }
          }
        return bestScore;
    } 

    else {
        var bestScore = Infinity;
        for (var i = 0; i < 9; i++) {
            // Is the spot available?
            if (board[i] == 0) {
              board[i] = 1;
              var score = minimax(board, depth + 1, true);
              board[i] = 0;
              bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}




function random_colour(){
    var letters = "0123456789ABCDEF";
    var colour = "#";
    var i =0;
    for(i; i<6; i++){
        colour += letters.charAt(Math.floor(Math.random()*15));
    }
    return colour;
}

function colours(){
    var colorus_array = new Array(28);
    var code1 = "";
    var code2 = "";
    var i = 0;
    
    for(i;i<28;i++){
        colorus_array[i] = random_colour();
    }
    //colours for player1
    for(i=0;i<12;i++){
        //code += "<div class=\"random_colour\" id=\"colour"+i+"\" onclick=\"check("+i+")\">"+window.char[i]+"</div>"
        code1 += '<div class="random_colour" id="colour'+i+'" onclick="pick('+i+')"> </div>';
        if(((i+1)%4)==0) code1 += "<div style=\"clear:both;\"></div>";
    }
    for(i=12;i<14;i++){
        code1 += '<div class="random_colour" id="colour'+i+'" onclick="pick('+i+')"> </div>';
    }
    var r1 = random_colour();
    code1+='<input type="text" class ="colour_text" id="colour_text1" name="fname" value='+r1+' style="color:'+r1+'";>'
    code1 += "<div style=\"clear:both;\"></div>";
    document.getElementById("player1_colour").innerHTML = code1;
    
    //colours for player2
    for(i=14;i<26;i++){
        //code += "<div class=\"random_colour\" id=\"colour"+i+"\" onclick=\"check("+i+")\">"+window.char[i]+"</div>"
        code2 += '<div class="random_colour" id="colour'+i+'" onclick="pick('+i+')"> </div>';
        if(((i-1)%4)==0) code2 += "<div style=\"clear:both;\"></div>";
    }
    for(i=26;i<28;i++){
        code2 += '<div class="random_colour" id="colour'+i+'" onclick="pick('+i+')"> </div>';
    }
    var r2 = random_colour();
    code2+='<input type="text" class ="colour_text" id="colour_text2" name="fname" value='+r2+' style="color:'+r2+'";>'
    code2 += "<div style=\"clear:both;\"></div>";
    document.getElementById("player2_colour").innerHTML = code2;
    
    
    for(i=0; i<28; i++){
        if(i==12 || i==13 || i==26 || i==27){
            document.getElementById("colour"+i).style = 'background: linear-gradient(130deg,'+random_colour()+', '+random_colour()+', '+random_colour()+');background-size: 200% 200%; -webkit-animation: Animation 3s ease infinite; -moz-animation: Animation 3s ease infinite; animation: Animation 3s ease infinite;';
        }
        else document.getElementById("colour"+i).style.backgroundColor = colorus_array[i];
    }
}

function pick(num){
    $("#colour"+num).css("border", "3px solid green");
    
    if(num<14){
        if(player1 != null){
            $("#colour"+player1).css("border", "3px solid #fff");
            $("#colour"+player1).html("");
        }
        player1 = num;
        $("#colour"+num).html("P1");
    }
    else{
        if(player2 != null){
            $("#colour"+player2).css("border", "3px solid #fff");
            $("#colour"+player2).html("");
        }
        player2 = num;
        $("#colour"+num).html("P2");
    }

}

function board(){
    var i = 0;
    var code = "";
    
    $("#logo").html('<span class="span_logo">PLAYER1 Starts</span>');
    $("#upper").css("padding-left", "204");
    $("#upper").css("padding-right", "204");
    
    document.getElementById("logo").style = player1.cssText;
    //$("#logo").css("background", player1);
    
    $(".display").html("");
    $(".display").css("width", "950px");
    $(".display").css("height", "950px");
    $(".display").css("background-color", "#111");
    $(".display").css("border", "10px solid white");
    $(".display").css("border-radius", "2%");
    
    code += '<div id="previous_board" style="float:left"><div id="previous_label" class="label">PREVIOUS BOARD</div>';
    for(i;i<9;i++){
        code += '<div id="pbox'+i+'" class="box"></div>';
        if(((i+1)%3)==0) code += "<div style=\"clear:both;\"></div>";
    }
    code += '</div>';
    
    code += '<div id="game_board" style="float:left"><div id="game_label" class="label">GAME</div>';
    for(i=0;i<9;i++){
        code += '<div id="box'+i+'" class="box" onclick="choose('+i+')"></div>';
        if(((i+1)%3)==0) code += "<div style=\"clear:both;\"></div>";
    }
    code += '</div>';
    
    code += '<div id="next_board" style="float:left"><div id="next_label" class="label">NEXT BOARD</div>';
    for(i=0;i<9;i++){
        code += '<div id="nbox'+i+'" class="box"></div>';
        if(((i+1)%3)==0) code += "<div style=\"clear:both;\"></div>";
    }
    code += '</div>';
    
    
    $("#display").html(code);
    $("#P1score").html(player1_score);
    $("#P2score").html(player2_score);
    
    reds_rand();
    //document.getElementById("display").innerHTML = code;
}

function choose(where){
    if((((window.turn)%2 != 0 ) && window.game_board[where] == 0)){
        
        
        document.getElementById("box"+where).style = window.player1.cssText;
        if(where == reds[0]){
            document.getElementById("nbox"+where).style = window.player1.cssText;
            next_board[where] = 1;
        }
        if(where == reds[1]){
            document.getElementById("nbox"+where).style = window.player1.cssText;
            next_board[where] = 1;
        }
        turn ++;
        document.getElementById("logo").style = window.player2.cssText;
        game_board[where] = 1;
        previous_board[where] = 1;
        
        $("#logo").html('<span class="span_logo">PLAYER2</span>');
        check_win();
        
        if(((window.turn)%2 == 0 ) && vs_computer){
            $("#logo").html('<span class="span_logo">VS COMPUTER</span>');
            choose(bestMove());
            return 1;
        }
        
        return 1;
    }
        
        
        
        
        
        
        
    
    if((((window.turn)%2 == 0 ) && window.game_board[where] == 0)){
        
        document.getElementById("box"+where).style = window.player2.cssText;
        window.turn ++;
        if(where == reds[0]){
            document.getElementById("nbox"+where).style = window.player2.cssText;
            next_board[where] = 2;
        }
        if(where == reds[1]){
            document.getElementById("nbox"+where).style = window.player2.cssText;
            next_board[where] = 2;
        }
        document.getElementById("logo").style = window.player1.cssText;
        window.game_board[where] = 2;
        
        $("#logo").html('<span class="span_logo">PLAYER1</span>');
        
        check_win();

        return 1;
    }
    
}

function check_win(){
    var i = 0;
    var j = 0;
    var win = 0;
    // horizonatl
    if(((game_board[0] != 0) && (game_board[0] == game_board[1]) && (game_board[1] == game_board[2]))){
        win_sound.play();
                
        if(game_board[0] == 1){
            player1_score++;
            $("#P1score").html(player1_score);
        }
        if(game_board[0] == 2){
            player2_score++;
            $("#P2score").html(player2_score);
        }
        
        next_round();
        
        //return window.game_board[0];
        win = 1;
    }
    
    else if(((game_board[3] != 0) && (game_board[3] == game_board[4]) && (game_board[4] == game_board[5]))){
        win_sound.play();
        
        if(game_board[3] == 1){
            player1_score++;
            $("#P1score").html(player1_score);
        }
        if(game_board[3] == 2){
            player2_score++;
            $("#P2score").html(player2_score);
        }
                
        next_round();
        
        //return window.game_board[3];
        win = 1;
    }
    
    else if(((game_board[6] != 0) && (game_board[6] == game_board[7]) && (game_board[7] == game_board[8]))){
        win_sound.play();
        
        if(game_board[6] == 1){
            player1_score++;
            $("#P1score").html(player1_score);
        }
        if(game_board[6] == 2){
            player2_score++;
            $("#P2score").html(player2_score);
        }
                
        next_round();
        
        //return window.game_board[6];
        win = 1;
    }
    
    // vertical
    for(j=0;j<6;j++){
        for(i=0; i<3; i++){
            if((game_board[i+j] != 0) && (game_board[i+j] == game_board[i+j+3]) && (game_board[i+j+3] == game_board[i+j+6])){
                
                win_sound.play();
                
                if(game_board[i+j] == 1){
                    player1_score++;
                    $("#P1score").html(player1_score);
                }
                if(game_board[i+j] == 2){
                    player2_score++;
                    $("#P2score").html(player2_score);
                }
                
                
                next_round();
                
                //return window.game_board[i+j];
                win = 1;
                break;
            }
        } 
    }
    
    //diagonal right
    if((window.game_board[2] != 0) && (window.game_board[2] == window.game_board[4]) && (window.game_board[4] == window.game_board[6])){

        win_sound.play();
        
        if(game_board[2] == 1){
            player1_score++;
            $("#P1score").html(player1_score);
        }
        if(game_board[2] == 2){
            player2_score++;
            $("#P2score").html(player2_score);
        }
        
        next_round();
        //return window.game_board[2];
        win = 1;
    } 
    
    //diagonal left
    if((window.game_board[0] != 0) && (window.game_board[0] == window.game_board[4]) && (window.game_board[4] == window.game_board[8])){

        win_sound.play();
        
        if(game_board[0] == 1){
            player1_score++;
            $("#P1score").html(player1_score);
        }
        if(game_board[0] == 2){
            player2_score++;
            $("#P2score").html(player2_score);
        }
        
        next_round();
        //return window.game_board[0];
        win = 1;
    }
    
    var zeros = 0;
    for(i=0; i<9; i++){
        if(game_board[i] == 0){
            zeros++;
        }
    }
    
    if(zeros == 0){
        tie_sound.play();
        next_round();
        return 3;
    }
    
    if(win){
        if(player1_score == 2) {
            endgame(1);
            document.getElementById("pbox0").style = window.player2.cssText;
            document.getElementById("pbox1").style = window.player1.cssText;
            document.getElementById("pbox2").style = window.player1.cssText;
            document.getElementById("box0").style = window.player1.cssText;
            document.getElementById("box1").style = window.player1.cssText;
            document.getElementById("box2").style = window.player1.cssText;
            document.getElementById("nbox0").style = window.player1.cssText;
            document.getElementById("nbox1").style = window.player1.cssText;
            document.getElementById("nbox2").style = window.player2.cssText;
            
            document.getElementById("pbox3").style = window.player2.cssText;
            document.getElementById("pbox4").style = window.player2.cssText;
            document.getElementById("pbox5").style = window.player2.cssText;
            document.getElementById("box3").style = window.player1.cssText;
            document.getElementById("box4").style = window.player1.cssText;
            document.getElementById("box5").style = window.player1.cssText;
            document.getElementById("nbox3").style = window.player2.cssText;
            document.getElementById("nbox4").style = window.player2.cssText;
            document.getElementById("nbox5").style = window.player2.cssText;
            
            document.getElementById("pbox6").style = window.player2.cssText;
            document.getElementById("pbox7").style = window.player1.cssText;
            document.getElementById("pbox8").style = window.player1.cssText;
            document.getElementById("box6").style = window.player1.cssText;
            document.getElementById("box7").style = window.player1.cssText;
            document.getElementById("box8").style = window.player1.cssText;
            document.getElementById("nbox6").style = window.player1.cssText;
            document.getElementById("nbox7").style = window.player1.cssText;
            document.getElementById("nbox8").style = window.player2.cssText;
        }
        if(player2_score == 2){
            endgame(2);
            document.getElementById("pbox0").style = window.player1.cssText;
            document.getElementById("pbox1").style = window.player2.cssText;
            document.getElementById("pbox2").style = window.player2.cssText;
            document.getElementById("box0").style = window.player2.cssText;
            document.getElementById("box1").style = window.player2.cssText;
            document.getElementById("box2").style = window.player2.cssText;
            document.getElementById("nbox0").style = window.player2.cssText;
            document.getElementById("nbox1").style = window.player2.cssText;
            document.getElementById("nbox2").style = window.player1.cssText;
            
            document.getElementById("pbox3").style = window.player1.cssText;
            document.getElementById("pbox4").style = window.player1.cssText;
            document.getElementById("pbox5").style = window.player1.cssText;
            document.getElementById("box3").style = window.player2.cssText;
            document.getElementById("box4").style = window.player2.cssText;
            document.getElementById("box5").style = window.player2.cssText;
            document.getElementById("nbox3").style = window.player1.cssText;
            document.getElementById("nbox4").style = window.player1.cssText;
            document.getElementById("nbox5").style = window.player1.cssText;
            
            document.getElementById("pbox6").style = window.player1.cssText;
            document.getElementById("pbox7").style = window.player2.cssText;
            document.getElementById("pbox8").style = window.player2.cssText;
            document.getElementById("box6").style = window.player2.cssText;
            document.getElementById("box7").style = window.player2.cssText;
            document.getElementById("box8").style = window.player2.cssText;
            document.getElementById("nbox6").style = window.player2.cssText;
            document.getElementById("nbox7").style = window.player2.cssText;
            document.getElementById("nbox8").style = window.player1.cssText;
        }
    }

}

function reds_rand(){
    next_reds[0] = Math.floor((Math.random() * 9));
    next_reds[1] = Math.floor((Math.random() * 9));
    
    while( (next_reds[0] == reds[1]) || (next_reds[0] == reds[0]) || (next_reds[1] == reds[1]) || (next_reds[1] == reds[0]) || (reds[0] == reds[1]) || (next_reds[0] == next_reds[1]) ){
        next_reds[0] = Math.floor((Math.random() * 9));
        next_reds[1] = Math.floor((Math.random() * 9));
    }
    
    $("#box"+reds[0]).toggleClass("redbox");
    $("#box"+reds[1]).toggleClass("redbox");
    $("#nbox"+next_reds[0]).toggleClass("redbox");
    $("#nbox"+next_reds[1]).toggleClass("redbox");
}

function next_round(){
    var i;
    $("#box"+reds[0]).toggleClass("redbox");
    $("#box"+reds[1]).toggleClass("redbox");
    $("#nbox"+next_reds[0]).toggleClass("redbox");
    $("#nbox"+next_reds[1]).toggleClass("redbox");
    
    reds[0] = next_reds[0];
    reds[1] = next_reds[1];
    
    reds_rand();
    
    for(i=0;i<9;i++){
        previous_board[i] = game_board[i];
        game_board[i] = next_board[i];
        next_board[i] = 0;
        document.getElementById("pbox"+i).style = document.getElementById("box"+i).style.cssText;
        document.getElementById("box"+i).style = document.getElementById("nbox"+i).style.cssText;
        if(i != next_reds[0] && i != next_reds[1]){
            document.getElementById("nbox"+i).style = "";
        }
        else{
            document.getElementById("nbox"+i).style.backgroundColor = "#d1271b";
        }
    }
}

function endgame(player){
    var i;
    for(i=0;i<9;i++){
        document.getElementById("box"+i).onclick = null;
        document.getElementById("box"+i).style.cursor = "default";
    }
    if(player == 1) {
        $("#nbox1").html("1");
        //alert("Player1 won");
    }
    else if(player == 2) {
        $("#nbox1").html("2");
        //alert("Player2 won");
    }
    
    $("#pbox1").html("P");
    $("#pbox2").html("L");
    $("#box0").html("A");
    $("#box1").html("Y");
    $("#box2").html("E");
    $("#nbox0").html("R");
    
    $("#box3").html("W");
    $("#box4").html("O");
    $("#box5").html("N");
    
    $("#pbox7").html("T");
    $("#pbox8").html("H");
    $("#box6").html("E");
    $("#box7").html("G");
    $("#box8").html("A");
    $("#nbox6").html("M");
    $("#nbox7").html("E");
    
    $("#logo").html('<span class="span_logo">PLAY AGAIN</span>');
    document.getElementById("logo").style.cursor = 'pointer';
    document.getElementById("logo").onclick = function(){ location.reload(); return false;};
    
}

function move_mouse(event) {
    document.body.style.background = 'radial-gradient(circle at ' + event.clientX + 'px ' + event.clientY + 'px, #807a7a 0%, #000 10%)';
}

document.addEventListener("mousemove", move_mouse);


window.onload = function(){
    colours();
    $("#button").click(function(){
        if(document.getElementById("vs_computer").checked == true) vs_computer = true;
        if( player1 == null ) {
            document.getElementById("colour1").style.backgroundColor = document.getElementById("colour_text1").value;
            window.player1 = document.getElementById("colour1").style;
            //$("#colour1").css("background-color", $("#colour_text1").css("color"));
            //player1 = $("#colour1").css("background");
        }
        else player1 = document.getElementById("colour"+window.player1).style;
        //else player1 = $("#colour"+player1).css("background");
        
        if( player2 == null ) {
            document.getElementById("colour2").style.backgroundColor = document.getElementById("colour_text2").value;
            window.player2 = document.getElementById("colour2").style;
        }
        else window.player2 = document.getElementById("colour"+window.player2).style;
        
        player1.border = "2px solid #ddd";
        player2.border = "2px solid #ddd";
        
        document.getElementById("P1score").style = player1.cssText;
        document.getElementById("P2score").style = player2.cssText;
        board();
    });
}