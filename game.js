var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColor);

    //Creates a "flashing" animation, indicating to the player what color should be added to the sequence 
    $("#" + randomChosenColor).fadeOut(250).fadeIn(250);
    playSound(randomChosenColor);
      
}

function handleClick(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
}

function playSound(name){
    //plays the corresponding sound to the randomly chosen color from above
    var colorAudio = new Audio("./sounds/" + name + ".mp3");
    colorAudio.play();  
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){$(".btn").removeClass("pressed");}, 100);
}

$("[type=button]").click(handleClick);
