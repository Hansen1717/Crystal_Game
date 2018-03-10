$(document).ready(function() {
    var crystalValue = [[1,2,3],[4,5,6],[7,8,9],[10,11,12]]
    var crystalImages = ["assets/images/crystal1.png","assets/images/crystal2.png","assets/images/crystal3.png","assets/images/crystal4.png"]
    var targetNumber = 0;
    var yourScore = 0;
    var count = 0;
    var highScore = 0;
    var wins = 0;
    var losses = 0;
    var activeGame = true;

    newGame = function() {
        targetNumber = 0;
        yourScore = 0;
        count = 0;
        activeGame = true;
        $("#your-score").html(yourScore);
        $("#game-over-alert").css("visibility","hidden");
        reassignCrystalValues();
    }

    reset = function() {
        targetNumber = 0;
        yourScore = 0;
        count = 0;
        highScore = 0;
        wins = 0;
        losses = 0;
        activeGame = true;
        $("#high-score").html(highScore)
        $("#losses").html(losses);
        $("#wins").html(wins)
        $("#your-score").html(yourScore);
        $("#game-over-alert").css("visibility","hidden");
        reassignCrystalValues();          
    }

    randomValuedCrystals = function() {
        for (var i = 0; i < crystalImages.length; i++) {
            var value = (crystalValue[i][Math.floor(Math.random() * crystalValue[i].length)]);
            var imgTags = "<img id='crystal-image" + i +"' class='col-md-3' src=" + crystalImages[i] + " alt=Crystal-" + (i+1) + "/>";
            $("#crystals").append(imgTags);
            var imgById = "#crystal-image" +i;
            $(imgById).attr("value", value);
            if (targetNumber === 0) {
                targetNumber = value*(Math.floor((Math.random()*3)+1));
            }
            else {
                targetNumber = targetNumber + value*(Math.floor((Math.random()*3)+1));
            };
            $("#target-score").html(targetNumber);
        }
    }

    reassignCrystalValues = function() {
        for (var i = 0; i < crystalImages.length; i++) {
            var value = (crystalValue[i][Math.floor(Math.random() * crystalValue[i].length)]);
            var imgById = "#crystal-image" +i;
            $(imgById).attr("value", value);
            if (targetNumber === 0) {
                targetNumber = value*(Math.floor((Math.random()*3)+1));
            }
            else {
                targetNumber = targetNumber + value*(Math.floor((Math.random()*3)+1));
            };
            $("#target-score").html(targetNumber);
        }           
    }

    youWin = function() {
        var newScore = (30 - count) * 75;
        wins++;
        activeGame = false;
        if (newScore > highScore) {
            highScore = newScore;
            $("#high-score").html(count + " crystals collected " + "<br>" + highScore + " points")
        }
        $("#wins").html(wins);
        $("#result-message").html("You're a winner! Play Again?")
        $("#game-over-alert").css("visibility","visible");
        
    }

    youLose = function(){
        losses++;
        activeGame = false;
        $("#losses").html(losses)
        $("#result-message").html("Sorry,You've Lost. Try Again?")
        $("#game-over-alert").css("visibility","visible");
    }

    userScore = function() {
        if (activeGame){
        count++;
        console.log(count);
        var userInput = $(this).attr("value");
        if (yourScore === 0) {
            yourScore = parseInt(userInput);
        }
        else{ 
            yourScore = yourScore + parseInt(userInput);
        }
        $("#your-score").html(yourScore);
        if (yourScore === targetNumber) {
            userInput = 0;
            $("#your-score").html(yourScore);
            setTimeout(youWin,10);
        }
        else if (yourScore > targetNumber) {
            userInput = 0;
            $("#your-score").html(yourScore);
            setTimeout(youLose,10);
        }
//      console.log(yourScore)
//      console.log(targetNumber)
        }
    }

    randomValuedCrystals();
        $("img").on("click", userScore);
        $("#play-again").on("click", newGame);
        $("#reset-game").on("click", reset);

}) 