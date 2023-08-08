var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isGameActive = false;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    //getting random color from buttonColors array
    var randomChosenColor = buttonColors[randomNumber];
    //adding random color to the end of gamePattern array
    gamePattern.push(randomChosenColor);

    //Creates a "flashing" animation, indicating to the player what color should be added to the sequence 
    $("#" + randomChosenColor).fadeOut(250).fadeIn(250);
    playSound(randomChosenColor);

    //increases level, updates text to indicate level change
    level++;
    $("#level-title").text("Level " + level);
}


function handleClick() {
    var userChosenColor = $(this).attr("id"); //gets color id attr from clicked buttton
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(gamePattern, userClickedPattern);
}

function playSound(color) {
    //plays the corresponding sound to the randomly chosen color from above
    var colorAudio = new Audio("./sounds/" + color + ".mp3");
    colorAudio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () { $(".btn").removeClass("pressed"); }, 100);
}

function startGame() {
    $("#level-title").text("Level " + level);
    nextSequence();
    isGameActive = true;
}

function restartGame() {
    isGameActive = true;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function gameOver() {
    isGameActive = false;
    $("#level-title").text("Game over! Press any key to restart.");
    var gameOverAudio = new Audio("./sounds/wrong.mp3");
    gameOverAudio.play();
    $("body").addClass("game-over");
    setTimeout(function () { $("body").removeClass("game-over") }, 200);
}

function checkAnswer(game, user) {
    if (user.length === game.length) {
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
        return;
    }
    for (var i = 0; i < user.length; i++) {
        if (user[i] !== game[i]) {
            gameOver();
        }
    }
}

if (isGameActive != true) {
    $(document).keypress(restartGame);
}

$(document).keypress(startGame);
$("[type=button]").click(handleClick);







