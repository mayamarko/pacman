var context = canvas.getContext("2d");
var shape = new Object();
var ghosts;
var ghost1 = new Object();
var ghost2 = new Object();
var ghost3 = new Object();
var lastPosGhost=0;
var board;
var score;
var pac_color;
var start_time;
var start_time1;
var time_elapsed;
var interval;
var intervalMosters;
var a;
var b;
var angle;
var col1;
var col2;
var col3;
var usersContent = new Map(); // map of users by username and password
var chosenSettings = new Array();
usersContent.set("a", "a");
var soundTrack;
var timeLeft = 20000;
var numGhost = 3; //need to be set at setting!!! ****
var colors;

//Start();

function setInvisibale(div) {
    document.getElementById(div).style.display = "none";
}
function setVisibale(div) {
    document.getElementById(div).style.display = "block";
}

/**
 * to show a div, call this function!
 */
function PageLoaded() {
    ShowDiv('Welcome');
    soundTrack = document.getElementById("soundTrack");
}

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
    }

    //show only one section
    var selected = document.getElementById(id);
    selected.style.display = "block";
}
function startGame(users) {
    usershow.value = users;
    ShowDiv('gameArea');
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
            form.submit();
        }
    });
});
$.validator.addMethod("regexp", function (value, element) {
    return this.optional(element) || /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(value);
}, 'Please enter password that contains 8 characters and at least one letter');
$.validator.addMethod("regexn", function (value, element) {
    return this.optional(element) || /^[A-Za-z]+$/.test(value);
}, 'Letters only!');
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
    submitOk = "true";
    if (usersContent.has(users)) {
        if (usersContent.get(users) === pass) {
            //return true;
            alert("hello You logged in");
            startGame(users);
        }
        else {
            //return false;
            alert("hello Your password is incorrect");
            submitOk = "false";
        }
    }
    else {
        //return false;
        alert("hello Your username is incorrect");
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

// function checkValidtion(){
//     submitOk="true";
//     var up=document.getElementById("up").value;
//     var down=document.getElementById("down").value;
//     var left=document.getElementById("left").value;
//     var right=document.getElementById("right").value;
//     var ballsNum=document.getElementById("ballsNum").value;
//     var color1=document.getElementById("color1").value;
//     var color2=document.getElementById("color2").value;
//     var color3=document.getElementById("color3").value;
//     var time=document.getElementById("time").value;
//     var monsters=document.getElementById("monsters").value;
//     if(up.length!=1||down.length!=1||left.length!=1||right.length!=1)
//     {
//         alert("must be only one key");
//         submitOk="false";
//     }
//     if(isNaN(up)||isNan(down)||isNan(left)||IsNaN(right)||isNaN(color1)||isNaN(color2)||isNan(color3))
//     {
//         alert("all fildes must be filled");
//         submitOk="false";
//     }
//     if(ballsNum<50||ballsNum>90)
//     {
//         alert("number of balls must be between 50 to 90");
//         submitOk="false";
//     }
//     if(time<60)
//     {
//         alert("game duration must be at least 60 min");
//         submitOk="false";
//     }
//     if(monsters<1|monsters>3)
//     {
//         alert("number of monsters must be between 1 and 3");
//         submitOk="false";
//     }
//     if(submitOk=="false"){
//         return false;
//     }else{
//         saveSetings();
//         form.submit();
//     }
// }



$(document).ready(function () {
    $("#SettingsForm").validate({
        rules: {
            up: {
                required: true,
                rangelength: [1, 1],
            },
            down: {
                required: true,
                rangelength: [1, 1],
            },
            left: {
                required: true,
                rangelength: [1, 1],
            },
            right: {
                required: true,
                rangelength: [1, 1],
            },

            ballsNum: {
                required: true,
                range: [50, 90],
            },
            color1: {
                required: true,
                regexletter: true,
            },
            color2: {
                required: true,
                regexletter: true,
            },
            color3: {
                required: true,
                regexletter: true,
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
                rangelength: "There must be only one key"
            },
            down: {
                rangelength: "There be only one key"
            },
            left: {
                rangelength: "There be only one key"
            },
            right: {
                rangelength: "There be only one key"
            },
        },
        highlight: function (element) {
            $(element).parent().addClass('error1')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error1')
        },
        errorElement: 'div1',
        submitHandler: function (form) {
            form.submit();
        }
    });
});
$.validator.addMethod("regexletter", function (value, element) {
    return this.optional(element) || /^[a-z]+$/.test(value);
}, 'Small etters only!');



// $(document).ready(function () {
//     $("#SettingsForm").validate({
//         rules: {
//             up,down,left,right:{
//                 required: true,
// 				 exactlength: 1
//             },
//             ballsNum: {
//                 required: true,
//                 range: [50,90]
//             },
//             color1,color2,color3: {
//                 required: true,
//             },        
//             time: {
//                 required: true,
// 				minStrict: 60,
// 				number: true
//             },
// 			 monsters: {
//                 required: true,
//                 range: [1,3]
//             }
//         },
//         messages: {
//             // up:{
//             //     required: "dir",
//             //     minlength:"min len"
//             // } ,
//             // down:{
//             //     required: "dir",
//             //     minlength:"min len"
//             // } ,           
//             // time: {
//             //     required: "Enter a time",
//             //     minStrict: jQuery.format("Must be grater then {0} min")              
//             // }
//         },
//         highlight: function (element) {
//             $(element).parent().addClass('error1')
//         },
//         unhighlight: function (element) {
//             $(element).parent().removeClass('error1')
//         },
//         errorElement: 'div',
//         submitHandler: function (form) {
//             form.submit();
//             saveSetings();
//         }
//     });
// });
// function adjust_textarea(h) {
//     h.style.height = "20px";
//     h.style.height = (h.scrollHeight) + "px";
// }


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
    document.getElementById("up").value = "r";
    document.getElementById("down").value = "d";
    document.getElementById("left").value = "f";
    document.getElementById("right").value = "c";
    document.getElementById("ballsNum").value = "60";
    document.getElementById("color1").value = "red";
    document.getElementById("color2").value = "blue";
    document.getElementById("color3").value = "yellow";
    document.getElementById("time").value = "60";
    document.getElementById("monsters").value = "3";
    //timeLeft=60000;
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
    //timeLeft=0;
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
    //timeLeft=chosenSettings[8]*100;
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
    var ballsnums = 50;
    var fivepoint = Math.floor(ballsnums * 0.6);
    var fifteenpoint = Math.floor(ballsnums * 0.3);
    var twentyfivepoint = Math.floor(ballsnums * 0.1);
    var pacman_remain = 1;
    var numGn = numGhost;
    start_time = new Date();
    start_time1 = new Date();
    createGhosts();
    for (var i = 0; i < 16; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
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
            else if (obstacles(i, j)) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                // if (randomNum <= 1.0 * food_remain / cnt) {
                //     food_remain--;
                //     board[i][j] = 1;
                // }
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
    interval = setInterval(UpdatePosition, 250);
    var g = 1;
    while (g <= numGhost) {
        intervalMosters[g - 1] = setInterval(UpdatePositionGhost(g), 1000);
        g++;
    }
}

function createGhosts() {
    if (numGhost === 1) {
        colors = new Array("blue");
        intervalMosters = new Array(0);
        ghosts = new Array(new Object());
    }
    if (numGhost === 2) {
        colors = new Array("blue", "pink");
        intervalMosters = new Array(0, 0);
        ghosts = new Array(new Object(), new Object());
    }
    if (numGhost === 3) {
        colors = new Array("blue", "pink", "purple");
        intervalMosters = new Array(0, 0, 0);
        ghosts = new Array(new Object(), new Object(), new Object());
    }
}

function obstacles(i, j) {
    // if (i === 0) {
    //     if (j === 5 || j === 6) {
    //         return true;
    //     }
    // }
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
    // else if (i === 3) {
    //     if (j === 0 || j === 3 || j === 7 || j === 8) {
    //         return true;
    //     }
    // }
    // else if (i === 4) {
    //     if (j === 0 || j === 5 || j === 10) {
    //         return true;
    //     }
    // }
    else if (i === 5) {
        if (j === 3 || j === 1 || j === 2 || j === 8 || j === 9 || j === 10) {
            return true;
        }
    }
    // else if (i === 6) {
    //     if (j === 0 || j === 5 || j === 10) {
    //         return true;
    //     }
    // }
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
    if (keysDown['ArrowUp']) {
        return 1;
    }
    if (keysDown['ArrowDown']) {
        return 2;
    }
    if (keysDown['ArrowLeft']) {
        return 3;
    }
    if (keysDown['ArrowRight']) {
        return 4;
    }
}

function Draw() {
    col1 = "green";
    col2 = "red";
    col3 = "orange";
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    lblRest.value = timeLeft / 1000;
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
            // else if (board[i][j] === 1) {
            //     context.beginPath();
            //     context.arc(center.x, center.y, 7.5, 0, 2 * Math.PI); // circle
            //     context.fillStyle = "white"; //color
            //     context.fill();
            // } 
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
                drawGhost(1, center.x - 15, center.y + 15);
            }
            else if (board[i][j] === 9) {
                drawGhost(2, center.x - 15, center.y + 15);
            }
            else if (board[i][j] === 10) {
                drawGhost(3, center.x - 15, center.y + 15);
            }
        }
    }
    drawOutline();
}


function drawGhost(numOfGhost, x, y) {
    var colorfill = colors[numOfGhost - 1];
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

    // context.fillStyle = 'white';
    // context.beginPath();
    // context.moveTo(91, 96);
    // context.bezierCurveTo(88, 96, 87, 99, 87, 101);
    // context.bezierCurveTo(87, 103, 88, 106, 91, 106);
    // context.bezierCurveTo(94, 106, 95, 103, 95, 101);
    // context.bezierCurveTo(95, 99, 94, 96, 91, 96);
    // context.moveTo(103, 96);
    // context.bezierCurveTo(100, 96, 99, 99, 99, 101);
    // context.bezierCurveTo(99, 103, 100, 106, 103, 106);
    // context.bezierCurveTo(106, 106, 107, 103, 107, 101);
    // context.bezierCurveTo(107, 99, 106, 96, 103, 96);
    // context.fill();

    // context.fillStyle = 'black';
    // context.beginPath();
    // context.arc(101, 102, 2, 0, Math.PI * 2, true);
    // context.fill();

    // context.beginPath();
    // context.arc(89, 102, 2, 0, Math.PI * 2, true);
    // context.fill();
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
    }
    if (board[shape.i][shape.j] === 6) {
        score += 15;
    }
    if (board[shape.i][shape.j] === 7) {
        score += 25;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    var delta = (currentTime - start_time1);
    timeLeft -= delta;
    start_time1 = currentTime;
    if (timeLeft <= 0) {
        timeLeft = 0;
        endGame();
        if (score < 150) {
            // alert("You can do better");
            // window.clearInterval(interval);
        } else {
            // alert("We have a Winner!!!");
            // window.clearInterval(interval);
        }

    }
    if (score >= 300 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (score === 400) {
        window.clearInterval(interval);
        window.alert("Game completed");
        endGame();
    } else {
        Draw();
    }
}

function UpdatePositionGhost(numofGhost) {
    // var move = chooseMove(numofGhost); //ghost gets the direstion to go
    var move=0;
    numofGhost--;
    board[ghosts[numofGhost].i][ghosts[numofGhost].j] = 0;
    if (move === 1) {
        if (ghosts[numofGhost].j > 0 && board[ghosts[numofGhost].i][ghosts[numofGhost].j - 1] !== 4) {
            if ((ghosts[numofGhost].j === 6 || ghosts[numofGhost].j === 5) && (ghosts[numofGhost].i === 0 || ghosts[numofGhost].i === 1 || ghosts[numofGhost].i === 2 || ghosts[numofGhost].i === 13 || ghosts[numofGhost].i === 14 || ghosts[numofGhost].i === 15)) {

            }
            else {
                board[ghosts[numofGhost].i][ghosts[numofGhost].j] = lastPosGhost;
                ghosts[numofGhost].j--;
                lastPosGhost = board[ghosts[numofGhost].i][ghosts[numofGhost].j]; //get the number of balls or empty space
            }
        }
    }
    if (move === 2) {
        if (ghosts[numofGhost].j < 11 && board[ghosts[numofGhost].i][ghosts[numofGhost].j + 1] !== 4) {
            if ((ghosts[numofGhost].j === 4 || ghosts[numofGhost].j === 5) && (ghosts[numofGhost].i === 0 || ghosts[numofGhost].i === 1 || ghosts[numofGhost].i === 2 || ghosts[numofGhost].i === 13 || ghosts[numofGhost].i === 14 || ghosts[numofGhost].i === 15)) {

            } else {
                board[ghosts[numofGhost].i][ghosts[numofGhost].j] = lastPosGhost;
                ghosts[numofGhost].j++;
                lastPosGhost = board[ghosts[numofGhost].i][ghosts[numofGhost].j]; //get the number of balls or empty space
            }
        }
    }
    if (move === 3) {
        if (ghosts[numofGhost].i > 0 && board[ghosts[numofGhost].i - 1][ghosts[numofGhost].j] !== 4) {
            board[ghosts[numofGhost].i][ghosts[numofGhost].j] = lastPosGhost;
            ghosts[numofGhost].i--;
            lastPosGhost = board[ghosts[numofGhost].i][ghosts[numofGhost].j]; //get the number of balls or empty space
        }
        else if (ghosts[numofGhost].j === 5 && ghosts[numofGhost].i === 0) {
            board[ghosts[numofGhost].i][ghosts[numofGhost].j] = lastPosGhost;
            ghosts[numofGhost].i = 15;
            lastPosGhost = board[ghosts[numofGhost].i][ghosts[numofGhost].j]; //get the number of balls or empty space
        }
    }
    if (move === 4) {
        if (ghosts[numofGhost].i < 15 && board[ghosts[numofGhost].i + 1][ghosts[numofGhost].j] !== 4) {
            board[ghosts[numofGhost].i][ghosts[numofGhost].j] = lastPosGhost;
            ghosts[numofGhost].i++;
            lastPosGhost = board[ghosts[numofGhost].i][ghosts[numofGhost].j]; //get the number of balls or empty space
        }
        else if (ghosts[numofGhost].j === 5 && ghosts[numofGhost].i === 15) {
            board[ghosts[numofGhost].i][ghosts[numofGhost].j] = lastPosGhost;
            ghosts[numofGhost].i = 0;
            lastPosGhost = board[ghosts[numofGhost].i][ghosts[numofGhost].j]; //get the number of balls or empty space
        }
    }
    board[ghosts[numofGhost].i][ghosts[numofGhost].j] = numofGhost + 8; //ghost signature
    if (move === 5) {
    } else {
        Draw();
    }
}
function chooseMove(numofGhost) {
    if (numofGhost === 3) {
        return 3;
    }
    else {
        return 4;
    }
}


function endGame() {
    endMusic();
}