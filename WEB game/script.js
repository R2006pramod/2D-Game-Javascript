//Load a sound
var runSound = new Audio("run (1).mp3");
runSound.loop = true;

var jumpSound = new Audio("jump (1).mp3");

var deadSound = new Audio("dead (1).mp3");

var enviromentsound = new Audio("rashmika.mp3");

function keyCheck(event){

    //enter
    if(event.which == 13) {
        if(runWorkerId == 0){
            runWorkerId = setInterval(run,100);
            runSound.play();
            enviromentsound.play();

           
            moveBackgroundWorkerId = setInterval(moveBackground , 100);
            createBlockWorkerId = setInterval(createBlock,100);
            moveBlockWorkerId = setInterval(moveBlock,100);
            scoreWorkerId = setInterval(updateScore,100);
        }
    }

    //space
    if(event.which == 32){
       if(jumpWorkerId == 0){

        clearInterval(runWorkerId);
        runWorkerId = -1;
       
        runSound.pause();

        jumpWorkerId=setInterval(jump, 100);
        jumpSound.play();

        
       }
    }
}


//run
var playerId = document.getElementById("player");
var runImageNumber = 1;
var runWorkerId= 0;

function run() {

    runImageNumber++;

    if(runImageNumber == 9) {
        runImageNumber = 1;

    }

    playerId.src="Run (" + runImageNumber + ").png";

}

    
   
//jump
var jumpImageNumber = 1;
var jumpWorkerId=0;
var playerMarginTop=425;

function jump(){
    jumpImageNumber++; 

    if(jumpImageNumber<=7){
        playerMarginTop=playerMarginTop-60;
        playerId.style.marginTop = playerMarginTop+"px";
    
    }
    if(jumpImageNumber>=8){
        playerMarginTop=playerMarginTop + 60;
        playerId.style.marginTop=playerMarginTop+"px";

    }
    

    if(jumpImageNumber==13){
        jumpImageNumber =  1;

        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;

        runWorkerId = setInterval(run, 100);
        runSound.play();

      
    

        
        if(moveBackgroundWorkerId == 0){
            moveBackgroundWorkerId = setInterval(moveBackground,100);
        }

        if(createBlockWorkerId == 0){
            createBlockWorkerId = setInterval(createBlock,100);

        }

        if(moveBlockWorkerId==0){
            moveBlockWorkerId = setInterval(moveBlock, 100);

        }

        if(scoreWorkerId==0){
            scoreWorkerId = setInterval(updateScore,100);
            }
    
    }
   

    playerId.src="Jump ("+jumpImageNumber+").png";
}

//Move Background
var moveBackgroundId = document.getElementById("background");
var backgroundX = 0;
var moveBackgroundWorkerId = 0;

function moveBackground(){
    backgroundX = backgroundX - 20;
    moveBackgroundId.style.backgroundPositionX=backgroundX+"px";
}

//create Block

var createBlockWorkerId = 0;
var blockMarginLeft = 500;
var blockId = 1;

function createBlock(){

    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;

    blockId++;

    var gap = Math.random()*(1000-400)+400;

    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft +"px";

    document.getElementById("background").appendChild(block);
}

    //move Block
    var moveBlockWorkerId = 0;

     function moveBlock(){

        for(var i=1; i<=blockId; i++){

            var currentBlock = document.getElementById("block" + i);   
            var currentBlockMarginLeft = currentBlock.style.marginLeft;
            var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;

           currentBlock.style.marginLeft = newBlockMarginLeft + "px";

           //alert(newBlockMarginLeft);
           //106-49

           if(newBlockMarginLeft < 106 & newBlockMarginLeft > 49){

            //alert(playerMarginTop);
            //220
            //alert("dead");

            if(playerMarginTop > 320){

                clearInterval(runWorkerId);
                runSound.pause();

                clearInterval(jumpWorkerId);
                jumpWorkerId =-1;

                clearInterval(moveBackgroundWorkerId);
                clearInterval(scoreWorkerId);
                clearInterval(createBlockWorkerId);
                clearInterval(moveBlockWorkerId);

                deadWorkerId = setInterval(dead,100);
                deadSound.play();
               
                
            }
                




               
               
            }


           }


        }
     

     //Boy Dead
     var deadImageNumber = 1;
     var deadImageNumber = 0;

     function dead(){

        deadImageNumber++;

        if(deadImageNumber == 11){
            deadImageNumber = 10;

            playerId.style.marginTop = "440px";

            document.getElementById("endScreen").style.visibility = "visible";
            document.getElementById("endScore").innerHTML = newScore;
        }

        playerId.src = "Dead (" +deadImageNumber+ ").png";
     }




//score
var scoreId = document.getElementById("score");
var scoreWorkerId = 0;
var newScore = 0;

function updateScore(){

    newScore++;
    scoreId.innerHTML = newScore;

}
//Page Reload
function reload(){

    location.reload();

}


