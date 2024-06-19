
let buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];

let userClickedPattern = [];

let toggle = false;
let level = 0;



$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour)
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});




function playSound(sound){
    let audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");

    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    },50);
}


$(document).keypress(function(){
    if(!toggle){
        console.log("han")
        nextSequence();
        
        toggle = true;
    }
});

function nextSequence(){
    userClickedPattern = [];

    $("#level-title").text("Level: " + level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChoosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    let audio = new Audio("sounds/" + randomChoosenColor + ".mp3");
    audio.play();

    
    level++;
   
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            console.log("Bhai success");
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }

    else{
        let audio = new Audio("sounds/" + "gameOver" + ".mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over,  Press Any Key to Restart");
        toggle = false;
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
    
}


