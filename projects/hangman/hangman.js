window.onload = function(){        
    document.getElementById("button").onclick = function game(){
        window.pass = document.getElementById("frame").value;
        document.getElementById("display").innerHTML = '<img id="image" src="img/0a.jpg">';
        letters();
        password(window.pass);
    }
}
var good = new Audio("./audio/good.wav");
var bad = new Audio("./audio/bad.wav");

function password(p){
    if(window.pass==null || window.pass==""){
        var rand = Math.floor(Math.random() * (5));
        var passwords = new Array(5);
        passwords[0] = "Practice makes perfect";
        passwords[1] = "All good things must come to an end";
        passwords[2] = "Hope for the best but prepare for the worst";
        passwords[3] = "Better late than never";
        passwords[4] = "A picture is worth a thousand words";
        window.pass = passwords[rand];
    }
    else window.pass = p;
    window.pass = window.pass.toUpperCase();
    
    window.pass1 = "";
    for(i=0;i<window.pass.length;i++){
        if((window.pass.charAt(i)) != " ") window.pass1 += "*";
        else window.pass1 += " ";
    }

    document.getElementById("password").innerHTML = window.pass1;
        
    return window.pass;
}

function letters(){
    
    window.char = new Array(25);

    window.char[0] = "Q";
    window.char[1] = "W";
    window.char[2] = "E";
    window.char[3] = "R";
    window.char[4] = "T";
    window.char[5] = "Y";
    window.char[6] = "U";
    window.char[7] = "I";
    window.char[8] = "O";
    window.char[9] = "P";
    window.char[10] = "A";
    window.char[11] = "S";
    window.char[12] = "D";
    window.char[13] = "F";
    window.char[14] = "G";
    window.char[15] = "H"; 
    window.char[16] = "J";
    window.char[17] = "K";
    window.char[18] = "L";
    window.char[19] = "Z";
    window.char[20] = "X";
    window.char[21] = "C"; 
    window.char[22] = "V";
    window.char[23] = "B";
    window.char[24] = "N";
    window.char[25] = "M";
    var code = ""
    
    for(i=0;i<26;i++){
        code += "<div class=\"letter\" id=\"char"+i+"\" onclick=\"check("+i+")\">"+window.char[i]+"</div>"
        if(i==9) code += "<div style=\"clear:both;\"></div>"+"<div style=\"width:35px; height:25px; float:left;\"></div>";
        if(i==18) code += "<div style=\"clear:both;\"></div>"+"<div style=\"width:105px; height:25px; float:left;\"></div>";
    }
    document.getElementById("letters").innerHTML = code;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function check(nr){
    var hit = false;
    var miss = document.getElementById("image").src.slice(-6,-5);
    var lit = "char"+nr;
    
    for(i=0;i<window.pass.length;i++){
        if(window.pass.charAt(i) == window.char[nr]){
            window.pass1 = window.pass1.replaceAt(i,window.char[nr]);
            document.getElementById("password").innerHTML = window.pass1;
            hit = true;
        }
    }
    
    
    if(hit){
        good.play();
        document.getElementById(lit).style.border = "3px solid green";
    }
    else{
        bad.play();
        miss++;
        var path = "<img id=\"image\" src=\"img/" + miss + "a.jpg\">";
        document.getElementById(lit).style.border = "3px solid red";
        document.getElementById(lit).setAttribute("onclick",";");
        document.getElementById("display").innerHTML = path;
    }
    
    document.getElementById(lit).style.cursor = "default";
    document.getElementById(lit).style.color = "#555";
    
    win();
    lose();
}

function lose(){
    if(document.getElementById("image").src.slice(-6,-5) >= 9){
        document.getElementById("display").innerHTML = '<br><br>Ehh! You lost! <br> Password was: \"<span style="color:red">'+window.pass+'</span>\"<br><br> <span class="reset" onclick="location.reload()">PLAY AGAIN</span>';
        document.getElementById("password").innerHTML = window.pass;
    }
}

function win(){
    var win = false;
    var score = 9-document.getElementById("image").src.slice(-6,-5);
    
    for(i=0;i<window.pass1.length;i++){
        if((window.pass1.charAt(i)) == "*") {
            return;
        }
        else win = true;
    }
    
    if(win == true){
        document.getElementById("display").innerHTML = '<br>Nice! You won! <br> Password was: \"<span style="color:green">'+window.pass+'</span>\"<br>Your score was: \"<span style="color:green">'+score+'</span>\:9"<br><br><br><span class="reset" onclick="location.reload()">PLAY AGAIN</span>';
    }
}