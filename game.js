var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!(started)){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    playsound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosencolor = buttonColors[randomNumber];
    $("#" + randomChosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosencolor);
    playsound(randomChosencolor);
}

function playsound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    var currentButton = $("#"+currentColor);
    currentButton.addClass("pressed");
    setTimeout(function(){
        currentButton.removeClass("pressed");
    }), 100;
}

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
        if(gamePattern.length===userClickedPattern.length){
            console.log("Success");
            setTimeout(function(){
                nextSequence();
            }, 1000);
            console.log(gamePattern);
            console.log(userClickedPattern);
        }
    } else {
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("Wrong");
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}



