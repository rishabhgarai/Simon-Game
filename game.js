var gamePattern=[]; 
var userClickedPattern=[]; 
var buttonColours =["red", "blue", "green", "yellow"];
var randomNumber; 
var level=0; 
var srt;
//not start; 
$(document).keypress(function(){
    nextSequence()
})
$(".start").click(function(){
    animatePress("Start");
   
    nextSequence(); 


})
//now the game start; 
async function delayedFunction() {   
    await delay(1000); // Wait for 1 second
  }

function nextSequence(){
    level++; 
    userClickedPattern = [];
    $("h1").text("Level: "+level);
  
     $("#Start").hide(250); 

    var randomNumber = Math.floor((Math.random()*4)); 
    var randomChosenColour =buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour); 
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 
}
    function startOver(){
        level=0; 
        gamePattern=[]; 
        userClickedPattern=[]; 
    }
//user button click start; 
$(".btn").click(function(){
     var userChosenColour =  $(this).attr("id");
     playSound(userChosenColour); 
     userClickedPattern.push(userChosenColour); 
     animatePress(userChosenColour); 

     checkAnswer(userClickedPattern.length-1); 
     
}); 

function playSound(name){
    var audio1=new Audio("sounds/" + name+".mp3"); 
     audio1.play(); 
}

function animatePress(animate){
   switch(animate){
        case  "green" :
            $("#"+animate).addClass("pressedG"); 
        setTimeout(function(){
        $("#"+animate).removeClass("pressedG"); 
        },200); 
        break; 
        case  "red" :
            $("#"+animate).addClass("pressedR"); 
        setTimeout(function(){
        $("#"+animate).removeClass("pressedR"); 
        },200); 
        break; 

        case  "blue" :
            $("#"+animate).addClass("pressedB"); 
        setTimeout(function(){
        $("#"+animate).removeClass("pressedB"); 
        },200); 
        break; 

        case  "yellow" :
            $("#"+animate).addClass("pressedY"); 
        setTimeout(function(){
        $("#"+animate).removeClass("pressedY"); 
        },200)

        case  "yellow" :
            $("#"+animate).addClass("pressedY"); 
        setTimeout(function(){
        $("#"+animate).removeClass("pressedY"); 
        },200)
        break; 

        case  "Start" :
            $("#"+animate).addClass("pressedS"); 
        setTimeout(function(){
        $("#"+animate).removeClass("pressedS"); 
        },200)
        break; 
   }
}

function checkAnswer( currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        $("body").addClass("right-ans");
        setTimeout(function(){
            $("body").removeClass("right-ans");
        },200);

        if (userClickedPattern.length === gamePattern.length){
            
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
        var audio2=new  Audio("sounds/wrong.mp3");
        audio2.play();  
        $("body").addClass("game-over"); 
        setTimeout(function(){
            $("body").removeClass("game-over");
        },400);
        $("h1").text("Game Over, Press Any Key to Restart" );
        $("#Start").show();       
        startOver(); 
      }
}