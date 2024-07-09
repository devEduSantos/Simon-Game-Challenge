var buttonColours = ["red","blue","green","yellow"]
var gamePattern = [];
var userClickPattern = [];  
var level = 0;
function nextSequence(){
    var randomNumber = Math.floor(Math.random(0) * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    userClickPattern = [];
    return level++; 
}
$("body").on("keypress",function(e){
    var keyPressed = e.key;
    if(keyPressed === "a" && level == 0){
        $("#level-title").html("Level " + level);
        nextSequence()
    }
})
function playSound(name){
    $("#"+name).fadeOut(100).fadeIn(100);
    var myAudio = new Audio("./sounds/"+name + ".mp3")
    myAudio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
$(".btn").on("click",function(event){
    var userChosenColour = event.target.id;
    userClickPattern.push(userChosenColour)
    playSound(userChosenColour);
    console.log(userClickPattern)
    animatePress(userChosenColour)
    checkAnswer()
})

function checkAnswer(currentLevel){
    if(gamePattern.length === userClickPattern.length){
        if(gamePattern.toString() === userClickPattern.toString()){
            setTimeout(() => {
                nextSequence();
                $("#level-title").html("Level " + level);
            }, 1000);
        }
    }
}