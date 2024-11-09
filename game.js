const buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var start=false;
var userClickedPattern=[];
var level=0;


$(document).on("keydown",function(){
    if(!start){
        nextSequence();
        $("#level-title").text("Level "+level);
    } 
})

function nextSequence(){
    var randomNumber = Math.round((Math.random()*3));
    var randonChosenColor=buttonColors[randomNumber];
    gamePattern.push(randonChosenColor);
    userClickedPattern=[];

    $("#"+randonChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var sound=new Audio("./sounds/"+randonChosenColor+".mp3");
    sound.play();

    playSound(randonChosenColor);
    level++; 
    $("#level-title").text("Level "+level);    
}

$(".btn").on("click",function handler(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})


function playSound(name){
    var sound=new Audio("./sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() { 
       $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function() { nextSequence(); }, 1000);
        }

    }else{
        playSound("wrong");
        $("body").addClass("game-over");   
        setTimeout(function(){
            $("body").removeClass("game-over");  
        },200) 
        $("h1").text("Game Over, Press Any Key to Restart!");
        startOver();
    }  
}

function startOver(){
    level=0;
    gamePattern=[];
    start=falese;
}


