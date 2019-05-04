var context = canvas.getContext("2d");
var shape = new Object();
var ghosts;
var ghost1 = new Object();
var ghost2 = new Object();
var ghost3 = new Object();
var lastPosGhost = new Array();
var cherry = new Object();
var board;
var score;
var pac_color;
var start_time;
var start_time1;
var time_elapsed;
var interval;
var intervalMosters;
var intervalCherry;
var a;
var b;
var eyes;
var angle;
var col1;
var col2;
var col3;
var usersContent = new Map(); // map of users by username and password
var chosenSettings = new Array();
usersContent.set("a", "a");
var soundTrack;
var timeLeft;
var numGhost; //need to be set at setting!!! ****
var colors;
var usernameDisplay;
var lifeRemaining;
var lastPosChherry=0;
var ballsLeft;
var upkey;
var downkey;
var leftkey;
var rightkey;
var addTime=new Object();

function PageLoaded() {
    ShowDiv('Welcome');
    soundTrack = document.getElementById("soundTrack");
}

/**
 * to show a div, call this function!
 */
function ShowDiv(id) {
    //hide all sections
    var div1 = document.getElementById('Welcome');
    div1.style.display = "none";
    var div2 = document.getElementById('signin');
    div2.style.display = "none";
    var div3 = document.getElementById('login');
    div3.style.display = "none";
    var div4 = document.getElementById('setting');
    div4.style.display = "none";
    var div5 = document.getElementById('gameArea');
    div5.style.display = "none";

    if (id == 'Welcome') {
        endMusic();
        //closeInter();
    }
    if (id == 'login') {
        resetLogin();
    }
    if (id == 'signin') {
        resetSignIn();
    }
    if (id == 'setting') {
        resetSett();
        endMusic();
        //closeInter();
    }

    //show only one section
    var selected = document.getElementById(id);
    selected.style.display = "block";
}
function startGame() {
    usershow.value = usernameDisplay;
    ShowDiv('gameArea');
    document.getElementById('sett').style.display="block";
    Start();
}

function endMusic() {

    if (soundTrack && !soundTrack.paused) {
        soundTrack.pause();
        soundTrack.currentTime = 0.0;
    }
}
/**
 * Modal operation! 
 * Generic function, we can add as many modal as we like!!
 */

// Get the button that opens the modal
var btn = document.querySelectorAll("button.modal-button");

// All page modals
var modals = document.querySelectorAll('.modal');

// Get the <span> element that closes the modal
var spans = document.getElementsByClassName("close");

// When the user clicks the button, open the modal
for (var i = 0; i < btn.length; i++) {
    btn[i].onclick = function (e) {
        //e.preventDefault();
        modal = document.querySelector(e.target.getAttribute("href"));
        modal.style.display = "block";
    }
}

// When the user clicks on <span> (x), close the modal
for (var i = 0; i < spans.length; i++) {
    spans[i].onclick = function () {
        for (var index in modals) {
            if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
        }
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        for (var index in modals) {
            if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
        }
    }
}
$(document).keydown(function (event) {
    if (event.keyCode == 27) {
        $('#aboutModal').hide();
    }
});

//when user press esc close the modal

/**
 * All related to the sigh in form! - start
 */
$(document).ready(function () {
    $("#date").datepicker({
        changeMonth: true,
        changeYear: true
    });
});
$(document).ready(function () {
    $("#singupForm").validate({
        rules: {
            username: {
                required: true,
                reguser: true,
            },
            date: 'required',
            first_name: {
                required: true,
                regexn: true,
            },
            last_name: {
                required: true,
                regexn: true,
            },
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
                regexp: true,
            }
        },
        messages: {},
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        errorElement: 'div',
        submitHandler: function (form) {
            var usernameI = document.getElementById("username");
            var passwordI = document.getElementById("password");
            usersContent.set(usernameI.value, passwordI.value); //adds the username and password to map
            // form.submit();
            alert("You sign up successfully!");
            ShowDiv("Welcome");
        }
    });
});
$.validator.addMethod("regexp", function (value, element) {
    return this.optional(element) || /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(value);
}, 'Please enter password that contains 8 characters and at least one letter');
$.validator.addMethod("regexn", function (value, element) {
    return this.optional(element) || /^[A-Za-z]+$/.test(value);
}, 'Letters only!');
$.validator.addMethod("reguser", function (value, element) {
    return this.optional(element) || !usersContent.has(value);
}, 'Sorry..Username is taken.');
function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight) + "px";
}

function saveData() {
    var usernameI = document.getElementById("username");
    var passwordI = document.getElementById("password");
    usersContent.set(usernameI.value, passwordI.value);
}
/**
 * checks if the users exist in the map of users.
 */
function isUserExist() {
    var users = document.getElementById("username1").value;
    var pass = document.getElementById("password1").value;
    usernameDisplay = document.getElementById("username1").value;
    submitOk = "true";
    if (usersContent.has(users)) {
        if (usersContent.get(users) === pass) {
            //    alert("hello You logged in");
            // startGame(users);
            ShowDiv('setting');
        }
        else {
            alert("Your password is incorrect");
            submitOk = "false";
        }
    }
    else {
        alert("Your username is incorrect");
        submitOk = "false";
    }
    if (submitOk == "false") {
        return false;
    }
}
/**
 * All related to the sigh in form! - End
 */

/******************************************************************************/
function resetLogin() {
    document.getElementById("username1").value = "";
    document.getElementById("password1").value = "";
}

/**
settings- start
*/


$(document).ready(function () {
    $("#SettingsForm").validate({
        rules: {
            up: {
                required: true,
                regexup:true,
                // rangelength: [1, 1],
            },
            down: {
                required: true,
                regexdown:true,
                // rangelength: [1, 1],
            },
            left: {
                required: true,
                regexleft:true,
                // rangelength: [1, 1],
            },
            right: {
                required: true,
                regexright:true,
                // rangelength: [1, 1],
            },

            ballsNum: {
                required: true,
                range: [50, 90],
            },
            color1: {
                required: true,
                // regexletter: true,
            },
            color2: {
                required: true,
                // regexletter: true,
            },
            color3: {
                required: true,
                // regexletter: true,
            },
            time: {
                required: true,
                min: 60,
            },
            monsters: {
                required: true,
                range: [1, 3],
            }
        },
        messages: {
            up: {
                // rangelength: "There must be only one key"
            },
            down: {
                // rangelength: "There be only one key"
            },
            left: {
                // rangelength: "There be only one key"
            },
            right: {
                // rangelength: "There be only one key"
            },
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        errorElement: 'div',
        submitHandler: function (form) {
            saveSetings();
            // form.submit();
        }
    });
});
$.validator.addMethod("regexletter", function (value, element) {
    return this.optional(element) || /^[a-z]+$/.test(value);
}, 'Small letters only!');
$.validator.addMethod("regexup", function (value, element) {
    return this.optional(element) || /^[a-z]{1}$/.test(value) || value==='ArrowUp';
}, 'One small letter only. For arrows: ArrowUp (or any direction)');
$.validator.addMethod("regexdown", function (value, element) {
    return this.optional(element) || /^[a-z]{1}$/.test(value) || value==='ArrowDown';
},'One small letter only. For arrows: ArrowDown (or any direction)');
$.validator.addMethod("regexleft", function (value, element) {
    return this.optional(element) || /^[a-z]{1}$/.test(value) || value==='ArrowLeft';
},'One small letter only. For arrows: ArrowLeft (or any direction)');
$.validator.addMethod("regexright", function (value, element) {
    return this.optional(element) || /^[a-z]{1}$/.test(value) || value==='ArrowRight';
},'One small letter only. For arrows: ArrowRight (or any direction)');
// function keyPressedUp(event) {
// chosenSettings[0] = event.keyCode;
// }
// function keyPressedDown(event) {
// chosenSettings[1] = event.keyCode;
// }
// function keyPressedLeft(event) {
// chosenSettings[2] = event.keyCode;
// }
// function keyPressedRight(event) {
// chosenSettings[3] = event.keyCode;
// }


function resetSignIn() {
    document.getElementById("username").value = "";
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("date").value = "";
    document.getElementById("password").value = "";
}

function defaultSett() {
    document.getElementById("up").value = "ArrowUp";
    document.getElementById("down").value = "ArrowDown";
    document.getElementById("left").value = "ArrowLeft";
    document.getElementById("right").value = "ArrowRight";
    document.getElementById("ballsNum").value = Math.floor(Math.random() * 41) + 50;
    var getcol = randColors();
    document.getElementById("color1").value = getcol[0];
    document.getElementById("color2").value = getcol[1];
    document.getElementById("color3").value = getcol[2];
    document.getElementById("time").value = Math.floor(Math.random() * 241) + 60;;
    document.getElementById("monsters").value = Math.floor(Math.random() * 3) + 1;
    timeLeft = 60000;
}
function resetSett() {
    document.getElementById("up").value = "";
    document.getElementById("down").value = "";
    document.getElementById("left").value = "";
    document.getElementById("right").value = "";
    document.getElementById("ballsNum").value = "";
    document.getElementById("color1").value = "";
    document.getElementById("color2").value = "";
    document.getElementById("color3").value = "";
    document.getElementById("time").value = "";
    document.getElementById("monsters").value = "";
    timeLeft = 0;
}

function saveSetings() {
    chosenSettings = new Array();
    chosenSettings.push(document.getElementById("up").value);
    chosenSettings.push(document.getElementById("down").value);
    chosenSettings.push(document.getElementById("left").value);
    chosenSettings.push(document.getElementById("right").value);
    chosenSettings.push(document.getElementById("ballsNum").value);
    chosenSettings.push(document.getElementById("color1").value);
    chosenSettings.push(document.getElementById("color2").value);
    chosenSettings.push(document.getElementById("color3").value);
    chosenSettings.push(document.getElementById("time").value);
    chosenSettings.push(document.getElementById("monsters").value);
    timeLeft = chosenSettings[8] * 1000;
    numGhost = parseInt(chosenSettings[9]);
    ballsLeft=chosenSettings[4];
    startGame();
    setKeys();
}
function randColors() {
    var col = new Array("#7bd148", "#5484ed", "#a4bdfc", "#46d6db", "#7ae7bf", "#51b749", "#ffb878", "#cc0000", "#dc2127", "#dbadff", "#e1e1e1");
    var rand1 = Math.floor(Math.random() * 11) + 0;
    var rand2 = Math.floor(Math.random() * 11) + 0;
    var rand3 = Math.floor(Math.random() * 11) + 0;
    while ((rand1 === rand2) || (rand1 === rand3) || (rand2 === rand3)) {
        rand1 = Math.floor(Math.random() * 11) + 0;
        rand2 = Math.floor(Math.random() * 11) + 0;
        rand3 = Math.floor(Math.random() * 11) + 0;
    }
    return new Array(col[rand1], col[rand2], col[rand3]);
}
function setKeys(){
    if(chosenSettings[0].includes("Arrow")){
        upkey=chosenSettings[0];
    }
    else{
        upkey="Key"+chosenSettings[0].toUpperCase();
    }
    if(chosenSettings[1].includes("Arrow")){
        downkey=chosenSettings[1];
    }
    else{
        downkey="Key"+chosenSettings[1].toUpperCase();
    }
    if(chosenSettings[2].includes("Arrow")){
        leftkey=chosenSettings[2];
    }
    else{
        leftkey="Key"+chosenSettings[2].toUpperCase();
    }
    if(chosenSettings[3].includes("Arrow")){
        rightkey=chosenSettings[3];
    }
    else{
        rightkey="Key"+chosenSettings[3].toUpperCase();
    }
    
    
    
}
/**
*settings- end
*/


function Start() {
    board = new Array();
    score = 0;
    a = 2.5;
    b = -7.5;
    angle = 0;
    pac_color = "yellow";
    var cnt = 192;
    var food_remain = 50;
    var ballsnums = chosenSettings[4];
    var fivepoint = Math.floor(ballsnums * 0.6);
    var fifteenpoint = Math.floor(ballsnums * 0.3);
    var twentyfivepoint = Math.floor(ballsnums * 0.1);
    var pacman_remain = 1;
    var numGn = numGhost;   
    lifeRemaining=3;
    ballsLeft=chosenSettings[4];
    document.getElementById("life").src="images/life3.png";
    timeLeft = chosenSettings[8] * 1000;
    start_time = new Date();
    start_time1 = new Date();
    createGhosts();
    for (var i = 0; i < 16; i++) {
        board[i] = new Array();
        for (var j = 0; j < 12; j++) {
            if (i === 0 && j === 0) {
                numGn--;
                board[i][j] = 8;
                ghosts[0].i = i;
                ghosts[0].j = j;
            }
            else if (numGn > 0 && (i === 0 && j === 11)) {
                numGn--;
                board[i][j] = 9;
                ghosts[1].i = i;
                ghosts[1].j = j;
            }
            else if (numGn > 0 && (i === 15 && j === 0)) {
                numGn--;
                board[i][j] = 10;
                ghosts[2].i = i;
                ghosts[2].j = j;
            }
            else if (i == 15 && j == 11) {   //mooving score cherry 
                board[i][j] = 11;
                cherry.i = i;
                cherry.j = j;
            }
            else if (i == 4 && j == 0) {   //add time
                board[i][j] = 12;
               addTime.i=i;
               addTime.j=j;
            }
            else if (obstacles(i, j)) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if ((randomNum <= 1.0 * food_remain / cnt) && fivepoint > 0) {
                    food_remain--;
                    fivepoint--;
                    board[i][j] = 5;
                } else if ((randomNum <= 1.0 * food_remain / cnt) && fifteenpoint > 0) {
                    food_remain--;
                    fifteenpoint--;
                    board[i][j] = 6;
                } else if ((randomNum <= 1.0 * food_remain / cnt) && twentyfivepoint > 0) {
                    food_remain--;
                    twentyfivepoint--;
                    board[i][j] = 7;
                } else if ((randomNum < 1.0 * (pacman_remain + food_remain) / cnt)) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }

    //************************************ To Open Before Submitting *********************************** */
    //soundTrack.play();
    //************************************ To Open Before Submitting *********************************** */

    // while (food_remain > 0) {
    //     var emptyCell = findRandomEmptyCell(board);
    //     board[emptyCell[0]][emptyCell[1]] = 1;
    //     food_remain--;
    // }
    while (fivepoint > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 5;
        fivepoint--;
        food_remain--;
    }
    while (fifteenpoint > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 6;
        fifteenpoint--;
        food_remain--;
    }
    while (twentyfivepoint > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 7;
        twentyfivepoint--;
        food_remain--;
    }
    if (pacman_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        shape.i = emptyCell[0];
        shape.j = emptyCell[1];
        board[emptyCell[0]][emptyCell[1]] = 2;
        pacman_remain--;
    }
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    document.getElementById("colorg1").addEventListener("click", function () {
        colors[0] = document.getElementById("colorg1").value;
    });
    document.getElementById("colorg2").addEventListener("click", function () {
        colors[1] = document.getElementById("colorg2").value;
    });
    document.getElementById("colorg3").addEventListener("click", function () {
        colors[2] = document.getElementById("colorg3").value;
    });
    interval = setInterval(UpdatePosition, 250);
    intervalMosters[0] = setInterval(chomo1, 2000);
    if (numGhost > 1) {
        intervalMosters[1] = setInterval(chomo2, 2000);
    }
    if (numGhost > 2) {
        intervalMosters[2] = setInterval(chomo3, 2000);
    }
    intervalCherry = setInterval(UpdatePositionCherry, 2000);
    intervalclock=setInterval(setRandomClock,8500);
}

function createGhosts() {
    if (numGhost === 1) {
        colors = new Array("#0033cc");
        intervalMosters = new Array(0);
        ghosts = new Array(new Object());
        lastPosGhost = new Array(0);
        eyes = new Array(new Array(2, 0));
        document.getElementById("colorg1").value="#0033cc";
    }
    if (numGhost === 2) {
        colors = new Array("#0033cc", "#ff66ff");
        intervalMosters = new Array(0, 0);
        ghosts = new Array(new Object(), new Object());
        lastPosGhost = new Array(0, 0);
        eyes = new Array(new Array(2, 0), new Array(2, 0));
        document.getElementById("colorg1").value="#0033cc";
        document.getElementById("colorg2").value="#ff66ff";
        document.getElementById('colorg2').style.visibility = "visible";
    }
    if (numGhost === 3) {
        colors = new Array("#0033cc", "#ff66ff", "#6600cc");
        intervalMosters = new Array(0, 0, 0);
        ghosts = new Array(new Object(), new Object(), new Object());
        lastPosGhost = new Array(0, 0, 0);
        eyes = new Array(new Array(2, 0), new Array(2, 0), new Array(2, 0));
        document.getElementById("colorg1").value="#0033cc";
        document.getElementById("colorg2").value="#ff66ff";
        document.getElementById("colorg3").value="#6600cc";
        document.getElementById('colorg2').style.visibility = "visible";
        document.getElementById('colorg3').style.visibility = "visible";
    }
}

function obstacles(i, j) {
    if (i === 1) {
        if (j === 1 || j === 2 || j === 9 || j === 10) {
            return true;
        }
    }
    else if (i === 2) {
        if (j === 1 || j === 2 || j === 9 || j === 10) {
            return true;
        }
    }
    else if (i === 5) {
        if (j === 3 || j === 1 || j === 2 || j === 8 || j === 9 || j === 10) {
            return true;
        }
    }
    else if (i === 7) {
        if (j === 2 || j === 6 || j === 9) {
            return true;
        }
    }
    else if (i === 8) {
        if (j === 2 || j === 5 || j === 9) {
            return true;
        }
    }
    else if (i === 10) {
        if (j === 3 || j === 1 || j === 2 || j === 8 || j === 9 || j === 10) {
            return true;
        }
    }
    else if (i === 13) {
        if (j === 1 || j === 2 || j === 9 || j === 10) {
            return true;
        }
    }
    else if (i === 14) {
        if (j === 1 || j === 2 || j === 9 || j === 10) {
            return true;
        }
    } else {
        return false;
    }

}

function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 15) + 1);
    var j = Math.floor((Math.random() * 11) + 1);
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * 15) + 1);
        j = Math.floor((Math.random() * 11) + 1);
    }
    return [i, j];
}

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown[upkey]) {
        return 1;
    }
    if (keysDown[downkey]) {
        return 2;
    }
    if (keysDown[leftkey]) {
        return 3;
    }
    if (keysDown[rightkey]) {
        return 4;
    }

}

function Draw() {
    col1 = chosenSettings[5];
    col2 = chosenSettings[6];
    col3 = chosenSettings[7];
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score;
    //lblTime.value = time_elapsed;
    lblRest.value = timeLeft / 1000;
  //  lbllife.value = lifeRemaining;

    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 12; j++) {
            var center = new Object();
            center.x = i * 30 + 15;
            center.y = j * 30 + 15;
            if (board[i][j] === 2) {
                context.beginPath();
                context.arc(center.x, center.y, 13, 0.15 * Math.PI + angle, 1.85 * Math.PI + angle); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + a, center.y + b, 2.5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            }
            else if (board[i][j] == 11) {
                drawCherry(center.x - 10, center.y + 5, 20)
            }
            else if (board[i][j] == 12) {
                drawClock(center.x-7 , center.y-2 )
            }
            else if (board[i][j] === 5) {
                createColBalls(col1, 5, center.x, center.y);
            }
            else if (board[i][j] === 6) {
                createColBalls(col2, 15, center.x, center.y);
            }
            else if (board[i][j] === 7) {
                createColBalls(col3, 25, center.x, center.y);
            }
            else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - 15, center.y - 15, 30, 30);
                context.fillStyle = "rgb(19, 4, 99)"; //color
                context.fill();
            }
            else if (board[i][j] === 8) {
                drawGhost(0, center.x - 15, center.y + 15);
            }
            else if (board[i][j] === 9) {
                drawGhost(1, center.x - 15, center.y + 15);
            }
            else if (board[i][j] === 10) {
                drawGhost(2, center.x - 15, center.y + 15);
            }
        }
    }
    drawOutline();
}


function drawGhost(numOfGhost, x, y) {
    var colorfill = colors[numOfGhost];
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y - 14);
    context.bezierCurveTo(x, y - 22, x + 6, y - 28, x + 14, y - 28);
    context.bezierCurveTo(x + 22, y - 28, x + 28, y - 22, x + 28, y - 14);
    context.lineTo(x + 28, y);
    context.lineTo(x + 23.333, y - 4.667);
    context.lineTo(x + 18.333, y);
    context.lineTo(x + 14, y - 4.667);
    context.lineTo(x + 9.333, y);
    context.lineTo(x + 4.666, y - 4.667);
    context.lineTo(x, y);
    context.fillStyle = colorfill; //color
    context.fill();

    //eyes
    context.fillStyle = 'white';
    context.beginPath();
    context.moveTo(x + 8, y - 20);
    context.bezierCurveTo(x + 5, y - 20, x + 4, y - 17, x + 4, y - 15);
    context.bezierCurveTo(x + 4, y - 13, x + 5, y - 10, x + 8, y - 10);
    context.bezierCurveTo(x + 11, y - 10, x + 12, y - 13, x + 12, y - 15);
    context.bezierCurveTo(x + 12, y - 17, x + 11, y - 20, x + 8, y - 20);
    context.moveTo(x + 20, y - 20);
    context.bezierCurveTo(x + 17, y - 20, x + 16, y - 17, x + 16, y - 15);
    context.bezierCurveTo(x + 16, y - 13, x + 17, y - 10, x + 20, y - 10);
    context.bezierCurveTo(x + 23, y - 10, x + 24, y - 13, x + 24, y - 15);
    context.bezierCurveTo(x + 24, y - 17, x + 23, y - 20, x + 20, y - 20);
    context.fill();

    context.fillStyle = 'black';
    context.beginPath();
    context.arc(x + 18 + eyes[numOfGhost][0], y - 14 + eyes[numOfGhost][1], 2, 0, Math.PI * 2, true);
    context.fill();

    context.beginPath();
    context.arc(x + 6 + eyes[numOfGhost][0], y - 14 + eyes[numOfGhost][1], 2, 0, Math.PI * 2, true);
    context.fill();
}


function createColBalls(colorballs, number, x, y) {
    context.beginPath();
    context.arc(x, y, 7.5, 0, 2 * Math.PI); // circle
    context.fillStyle = colorballs; //color
    context.fill();
    context.fillStyle = "black";
    if (number === 5) {
        context.fillText(number, x - 3, y + 3);
    } else {
        context.fillText(number, x - 5.5, y + 3);
    }
}

function roundedRect(x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x, y + radius);
    context.lineTo(x, y + height - radius);
    context.arcTo(x, y + height, x + radius, y + height, radius);
    context.lineTo(x + width - radius, y + height);
    context.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    context.lineTo(x + width, y + radius);
    context.arcTo(x + width, y, x + width - radius, y, radius);
    context.lineTo(x + radius, y);
    context.arcTo(x, y, x, y + radius, radius);
    context.stroke();
}

function drawOutline() {
    var h = canvas.height;
    var w = canvas.width;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, h / 2 - 29);
    context.lineTo(90, h / 2 - 29);
    context.moveTo(90, h / 2);
    context.lineTo(0, h / 2);
    context.lineTo(0, h);
    context.lineTo(w, h);
    context.lineTo(w, h / 2);
    context.lineTo(w - 90, h / 2);
    context.moveTo(w - 90, h / 2 - 29);
    context.lineTo(w, h / 2 - 29);
    context.lineTo(w, 0);
    context.lineTo(0, 0);
    context.lineWidth = 2;
    context.lineJoin = "bevel";
    context.lineCap = "butt";
    context.strokeStyle = "rgb(19, 4, 99)"
    context.stroke();
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
            if ((shape.j === 6 || shape.j === 5) && (shape.i === 0 || shape.i === 1 || shape.i === 2 || shape.i === 13 || shape.i === 14 || shape.i === 15)) {

            }
            else {
                shape.j--;
                angle = 0.5 * Math.PI * 3;
                a = -7.5;
                b = 2.5;
            }
        }
    }
    if (x === 2) {
        if (shape.j < 11 && board[shape.i][shape.j + 1] !== 4) {
            if ((shape.j === 4 || shape.j === 5) && (shape.i === 0 || shape.i === 1 || shape.i === 2 || shape.i === 13 || shape.i === 14 || shape.i === 15)) {

            } else {
                shape.j++;
                angle = 0.5 * Math.PI * 1;
                a = -7.5;
                b = 2.5;
            }
        }
    }
    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
            shape.i--;
            angle = 0.5 * Math.PI * 2;
            a = 2.5;
            b = -7.5;
        }
        else if (shape.j === 5 && shape.i === 0) {
            shape.i = 15;
            angle = 0.5 * Math.PI * 2;
            a = 2.5;
            b = -7.5;
        }
    }
    if (x === 4) {
        if (shape.i < 15 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
            angle = 0.5 * Math.PI * 0;
            a = 2.5;
            b = -7.5;
        }
        else if (shape.j === 5 && shape.i === 15) {
            shape.i = 0;
            angle = 0.5 * Math.PI * 0;
            a = 2.5;
            b = -7.5;
        }
    }
    // if (board[shape.i][shape.j] === 1) {
    //     score++;
    // }
    if (board[shape.i][shape.j] === 5) {
        score += 5;
        ballsLeft--;
    }
    if (board[shape.i][shape.j] === 6) {
        score += 15;
        ballsLeft--;
    }
    if (board[shape.i][shape.j] === 7) {
        score += 25;
        ballsLeft--;
    }
    if (board[shape.i][shape.j] === 11) {
        score += 50;
        cherry=null;
    }
    if (board[shape.i][shape.j] === 12) {
        timeLeft=timeLeft+60000;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    var delta = (currentTime - start_time1);
    timeLeft -= delta;
    start_time1 = currentTime;
    if (timeLeft <= 0) {
        timeLeft = 0;
        endGame(1);
    }
    else if (ballsLeft === 0) {
        endGame(3);
    } 
    else if (score === 400) {
        endGame(2);
    }else {
        Draw();
        meetGhost();
    }
    
  
}

function UpdatePositionGhost(move, numofGhost) {
    var isSuc = false;
    board[ghosts[numofGhost].i][ghosts[numofGhost].j] = 0;
    if (move === 1) {
        if (ghosts[numofGhost].j > 0 && board[ghosts[numofGhost].i][ghosts[numofGhost].j - 1] !== 4) {
            if ((ghosts[numofGhost].j === 6 || ghosts[numofGhost].j === 5) && (ghosts[numofGhost].i === 0 || ghosts[numofGhost].i === 1 || ghosts[numofGhost].i === 2 || ghosts[numofGhost].i === 13 || ghosts[numofGhost].i === 14 || ghosts[numofGhost].i === 15)) {

            }
            else if (isHitGhostGhost(numofGhost, ghosts[numofGhost].i, ghosts[numofGhost].j - 1)) {
                isSuc = false;
            }
            else {
                board[ghosts[numofGhost].i][ghosts[numofGhost].j] = lastPosGhost[numofGhost];
                ghosts[numofGhost].j--;
                isSuc = true;
                eyes[numofGhost][0] = 2;
                eyes[numofGhost][1] = -4;
                lastPosGhost[numofGhost] = board[ghosts[numofGhost].i][ghosts[numofGhost].j]; //get the number of balls or empty space
            }
        }
    }
    if (move === 2) {
        if (ghosts[numofGhost].j < 11 && board[ghosts[numofGhost].i][ghosts[numofGhost].j + 1] !== 4) {
            if ((ghosts[numofGhost].j === 4 || ghosts[numofGhost].j === 5) && (ghosts[numofGhost].i === 0 || ghosts[numofGhost].i === 1 || ghosts[numofGhost].i === 2 || ghosts[numofGhost].i === 13 || ghosts[numofGhost].i === 14 || ghosts[numofGhost].i === 15)) {

            }
            else if (isHitGhostGhost(numofGhost, ghosts[numofGhost].i, ghosts[numofGhost].j + 1)) {
                isSuc = false;
            } else {
                board[ghosts[numofGhost].i][ghosts[numofGhost].j] = lastPosGhost[numofGhost];
                ghosts[numofGhost].j++;
                isSuc = true;
                eyes[numofGhost][0] = 2;
                eyes[numofGhost][1] = 2;
                lastPosGhost[numofGhost] = board[ghosts[numofGhost].i][ghosts[numofGhost].j]; //get the number of balls or empty space
            }
        }
    }
    if (move === 3) {
        if (ghosts[numofGhost].i > 0 && board[ghosts[numofGhost].i - 1][ghosts[numofGhost].j] !== 4) {
            if (isHitGhostGhost(numofGhost, ghosts[numofGhost].i - 1, ghosts[numofGhost].j)) {
                isSuc = false;
            } else {
                board[ghosts[numofGhost].i][ghosts[numofGhost].j] = lastPosGhost[numofGhost];
                ghosts[numofGhost].i--;
                eyes[numofGhost][0] = 0;
                eyes[numofGhost][1] = 0;
                isSuc = true;
                lastPosGhost[numofGhost] = board[ghosts[numofGhost].i][ghosts[numofGhost].j]; //get the number of balls or empty space
            }
        }
        else if (ghosts[numofGhost].j === 5 && ghosts[numofGhost].i === 0) {
            if (isHitGhostGhost(numofGhost, 15, ghosts[numofGhost].j)) {
                isSuc = false;
            } else {
                board[ghosts[numofGhost].i][ghosts[numofGhost].j] = lastPosGhost[numofGhost];
                ghosts[numofGhost].i = 15;
                eyes[numofGhost][0] = 0;
                eyes[numofGhost][1] = 0;
                isSuc = true;
                lastPosGhost[numofGhost] = board[ghosts[numofGhost].i][ghosts[numofGhost].j]; //get the number of balls or empty space
            }
        }
    }
    if (move === 4) {
        if (ghosts[numofGhost].i < 15 && board[ghosts[numofGhost].i + 1][ghosts[numofGhost].j] !== 4) {
            if (isHitGhostGhost(numofGhost, ghosts[numofGhost].i + 1, ghosts[numofGhost].j)) {
                isSuc = false;
            } else {
                board[ghosts[numofGhost].i][ghosts[numofGhost].j] = lastPosGhost[numofGhost];
                ghosts[numofGhost].i++;
                eyes[numofGhost][0] = 4;
                eyes[numofGhost][1] = 0;
                isSuc = true;
                lastPosGhost[numofGhost] = board[ghosts[numofGhost].i][ghosts[numofGhost].j]; //get the number of balls or empty space
            }
        }
        else if (ghosts[numofGhost].j === 5 && ghosts[numofGhost].i === 15) {
            if (isHitGhostGhost(numofGhost, 0, ghosts[numofGhost].j)) {
                isSuc = false;
            } else {
                board[ghosts[numofGhost].i][ghosts[numofGhost].j] = lastPosGhost[numofGhost];
                ghosts[numofGhost].i = 0;
                eyes[numofGhost][0] = 4;
                eyes[numofGhost][1] = 0;
                isSuc = true;
                lastPosGhost[numofGhost] = board[ghosts[numofGhost].i][ghosts[numofGhost].j]; //get the number of balls or empty space
            }
        }
    }
    if (isSuc) {
        board[ghosts[numofGhost].i][ghosts[numofGhost].j] = numofGhost + 8; //ghost signature
        Draw();
    }
    return isSuc;
}

function chomo1() {
    chooseMove(0);
}
function chomo2() {
    chooseMove(1);
}
function chomo3() {
    chooseMove(2);
}

function chooseMove(numofGhost) {
    var pacCordinationx = shape.i;
    var pacCordinationy = shape.j;
    var ghoCordinationx = ghosts[numofGhost].i;
    var ghoCordinationy = ghosts[numofGhost].j;
    var up = new Array(1, distance(pacCordinationx, pacCordinationy, ghoCordinationx, ghoCordinationy - 1));
    var down = new Array(2, distance(pacCordinationx, pacCordinationy, ghoCordinationx, ghoCordinationy + 1));
    var left = new Array(3, distance(pacCordinationx, pacCordinationy, ghoCordinationx - 1, ghoCordinationy));
    var right = new Array(4, distance(pacCordinationx, pacCordinationy, ghoCordinationx + 1, ghoCordinationy));
    var ary = new Array(up, down, left, right);
    ary.sort(function (a, b) { return a[1] - b[1] });
    var isSuc = false;
    var tmp = 0;
    while (!isSuc && tmp < 4) {
        isSuc = UpdatePositionGhost(ary[tmp][0], numofGhost);
        tmp++;
    }
    meetGhost();
}

function distance(x, y, xp, yp) {
    var dist = Math.pow(Math.abs(x - xp), 2) + Math.pow(Math.abs(y - yp), 2);
    return Math.sqrt(dist);
}


function setRandomPac() {
    board[shape.i][shape.j] = 0;
    var emptyCell = findRandomEmptyCell(board);
    while (emptyCell[0] === shape.i && emptyCell[1] === shape.j) {
        emptyCell = findRandomEmptyCell(board);
    }
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];
    board[emptyCell[0]][emptyCell[1]] = 2;
}

function meetGhost() {
    if (isHitGhost()) {
        lifeRemaining--;
        if(lifeRemaining==2)
            document.getElementById("life").src="images/life2.png";
        if(lifeRemaining==1)
            document.getElementById("life").src="images/life1.png"
        if(lifeRemaining==0)
            document.getElementById("life").src="images/life0.png"
        score = score - 10;
        setRandomPac();
        Draw();
    }
    if (lifeRemaining <= 0) {
        endGame(0);
    }
}
function isHitGhost() {
    var px = shape.i;
    var py = shape.j;
    var g1x = ghosts[0].i;
    var g1y = ghosts[0].j;
    if (px === g1x && py === g1y) {
        resetGhost(0);
        return true;
    }
    if (numGhost > 1) {
        var g2x = ghosts[1].i;
        var g2y = ghosts[1].j;
        if (px === g2x && py === g2y) {
            resetGhost(1);
            return true;
        }
    }
    if (numGhost > 2) {
        var g2x = ghosts[1].i;
        var g2y = ghosts[1].j;
        var g3x = ghosts[2].i;
        var g3y = ghosts[2].j;
        if (px === g3x && py === g3y) {
            resetGhost(2);
            return true;
        }
    }
    return false;
}

function resetGhost(numMeet) {
    lastPosGhost[numMeet] = 0;
    var g1x = ghosts[0].i;
    var g1y = ghosts[0].j;
    ghosts[0].i = 0;
    ghosts[0].j = 0;
    board[0][0] = 8;
    board[g1x][g1y] = lastPosGhost[0];
    if (numGhost > 1) {
        var g2x = ghosts[1].i;
        var g2y = ghosts[1].j;
        ghosts[1].i = 0;
        ghosts[1].j = 11;
        board[0][11] = 9;
        board[g2x][g2y] = lastPosGhost[1];
        lastPosGhost[1] = 0;
    }
    if (numGhost > 2) {
        var g3x = ghosts[2].i;
        var g3y = ghosts[2].j;
        ghosts[2].i = 15;
        ghosts[2].j = 0;
        board[15][0] = 10;
        board[g3x][g3y] = lastPosGhost[2];
        lastPosGhost[2] = 0;
    }
}
function isHitGhostGhost(numOfGhost, x, y) {
    var g1x = x;
    var g1y = y;
    for (var i = 0; i < numGhost; i++) {
        if (i === numOfGhost) {
            continue;
        }
        var gx = ghosts[i].i;
        var gy = ghosts[i].j;
        if (gx === g1x && gy === g1y) {
            return true;
        }
    }
    if (cherry !== null) {
        var chx = cherry.i;
        var chy = cherry.j;
        if (chx === g1x && chy === g1y) {
            return true;
        }
    }
    return false;
}

function drawCherry(x, y, size) {
    context.beginPath();
    // context.moveTo(x,y);
    context.fillStyle = "#ff0000";
    context.arc(x, y, 6, 0, 2 * Math.PI, -2 * Math.PI, true);
    context.moveTo(x + 17, y);
    context.arc(x + 12, y, 6, 0, 2 * Math.PI, -2 * Math.PI, true);
    context.fill()
    context.closePath();
    context.stroke();
    context.beginPath();
    context.fillStyle = "#670303";
    context.arc(x, y - 3.5, 2, Math.PI * 2, -Math.PI * 2, true);
    context.arc(x + 12, y - 3.5, 2, Math.PI * 2, -Math.PI * 2, true);
    context.fill()
    context.closePath();
    context.beginPath();
    context.strokeStyle = "#959817";
    context.lineWidth = 4;
    context.moveTo(x, y - 8);
    context.bezierCurveTo(x + 8, y - 10, x - 10, y - 30, x + 20, y - 15);
    context.moveTo(x + 12, y - 8);
    context.bezierCurveTo(x + 8, y - 15, x - 10, y - 30, x + 20, y - 15);
    context.stroke();
    context.closePath();
    context.fillStyle = "#959817";
    // ctx.fillRect(120, 180, 50, 50);
    // ctx.closePath();
    //context.fillRect(size - size / 3, size / 12, size / 9, size / 9);
    context.closePath();
}

function UpdatePositionCherry() {
    if(cherry!=null){
        var i = cherry.i;
        var j = cherry.j;
        var rand = Math.floor(Math.random() * 4) + 1;
        var bool = true;
        while (bool) {
            rand = Math.floor(Math.random() * 4) + 1;
            if (rand == 1) {
                if (i + 1 >= 0 && i + 1 <= 15 && board[i + 1][j] !== 4 && board[i+1][j]!=8 &&board[i+1][j]!=9 &&board[i+1][j]!=10) {
                    board[i][j] = lastPosChherry;
                    lastPosChherry= board[i + 1][j];
                    board[i + 1][j] = 11;
                    cherry.i = i + 1;
                    bool = false;
                }
    
            }
            else if (rand == 2) {
                if (i - 1 >= 0 && i - 1 <= 15 && board[i - 1][j] !== 4 && board[i - 1][j] !== 8 && board[i - 1][j] !== 9 && board[i - 1][j] !== 10) {
                    board[i][j] = lastPosChherry;
                    lastPosChherry= board[i - 1][j];
                    board[i - 1][j] = 11;               
                    cherry.i = i - 1;
                    bool = false;
                }
            }
            else if (rand == 3) {
                if (j - 1 >= 0 && j - 1 <= 11 && board[i][j - 1] !== 4 && board[i][j - 1] !== 8 && board[i][j - 1] !== 9 && board[i][j - 1] !== 10) {
                    board[i][j] = lastPosChherry;
                    lastPosChherry= board[i][j-1];
                    board[i][j - 1] = 11;            
                    cherry.j = j - 1;
                    bool = false;
                }   
            }
            else if (rand == 4) {
                if (j + 1 >= 0 && j + 1 <= 11 && board[i][j + 1] !== 4 && board[i][j + 1] !== 8 && board[i][j + 1] !== 9 && board[i][j + 1] !== 10 ) {
                    board[i][j] = lastPosChherry;
                    lastPosChherry= board[i][j+1];
                    board[i][j + 1] = 11;
                    cherry.j = j + 1;
                    bool = false;
                }

            }
        }
        Draw();
    }
}


function drawClock(x,y){
    context.fillStyle ="white" ;
    context.strokeStyle ="#670303" ;
    context.lineWidth = 3;
    context.beginPath(); 
    context.moveTo(x, y);
    context.lineTo(x+18, y);
    context.lineTo(x+9, y+9);
    context.stroke();
    context.moveTo(x+9, y+9);
    context.lineTo(x, y);
    context.stroke();
    context.moveTo(x, y+18);
    context.lineTo(x+9, y+9);
    context.lineTo(x+18, y+18);
    context.moveTo(x-1, y+18);
    context.lineTo(x+19, y+18);
    context.stroke();
    context.closePath();
    context.fill();
}

function setRandomClock() {
    board[addTime.i][addTime.j] = 0;
    var emptyCell = findRandomEmptyCell(board);
    while (emptyCell[0] === addTime.i && emptyCell[1] === addTime.j) {
        emptyCell = findRandomEmptyCell(board);
    }
    addTime.i = emptyCell[0];
    addTime.j = emptyCell[1];
    board[emptyCell[0]][emptyCell[1]] = 12;
    Draw();
}
// function drawCherry(x, y, size) {

//     context.moveTo(x - (size / 2), y - (size / 2) + 1)
//     context.beginPath();
//     context.fillStyle = "#ff0000";
//     context.arc(size / 8, size - (size / 2.8), size / 4, Math.PI * 2, -Math.PI * 2, true);
//     context.arc(size - size / 3, size - (size / 4), size / 4, Math.PI * 2, -Math.PI * 2, true);
//     context.fill();
//     context.closePath();
//     context.beginPath();
//     context.fillStyle = "#670303";
//     context.arc(size / 7.2, size - (size / 2.25), size / 14, Math.PI * 2, -Math.PI * 2, true);
//     context.arc(size - size / 3, size - (size / 3), size / 14, Math.PI * 2, -Math.PI * 2, true);
//     context.fill();
//     context.closePath();
//     context.beginPath();
//     context.strokeStyle = "#959817";
//     context.lineWidth = 2;
//     context.moveTo(size / 8, size - (size / 2));
//     context.bezierCurveTo(size / 6, size / 1.5, size / 7, size / 4, size - size / 4, size / 8);
//     context.moveTo(size - size / 2.5, size - size / 3);
//     context.bezierCurveTo(size / 1.3, size / 1.5, size / 3, size / 2.5, size - size / 4, size / 8);
//     context.stroke();
//     context.closePath();
//     context.fillStyle = "#959817";
//     context.fillRect(size - size / 3, size / 12, size / 9, size / 9);
//     context.closePath();
// }

function endGame(vers) {
    endMusic();
    if(vers==0){                                             //life is over
        alert("Your lives are over.. you lost");
        closeInter();
    }
    if(vers==1){                                             //time is over
        if (score < 150) {
             alert("You can do better");
             closeInter();
        } else {
             alert("We have a Winner!!!");
             closeInter();
        }
    }
    if(vers==2){                            // got to exectly 400 points
        window.alert("Game completed"); 
        closeInter();
    }
    if(vers==3){
        window.alert("You ate all the food! Game completed");    //ate all the balls
        closeInter();
    }
}
function closeInter(){
    window.clearInterval(interval);
    window.clearInterval(intervalMosters[0]);
    if(numGhost>1){
       window.clearInterval(intervalMosters[1]);
    }
    if(numGhost>2){
        window.clearInterval(intervalMosters[2]);
    }
    window.clearInterval(intervalCherry);
    window.clearInterval(intervalclock);
    
}