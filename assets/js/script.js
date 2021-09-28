var questionBank = [
    {
        question: "1. What is the Master Chief's calltag?",
        answers:{
            a: "Sierra-117",
            b: "Brave-069",
            c: "Romeo-420",
            d: "Delta-006"
        },
        correct: "a"
    },
    {
        question: "2. ",
        answers:{
            a: "a",
            b: "b",
            c: "c",
            d: "d"
        },
        correct: "b"
    },
    {
        question: "3.",
        answers:{
            a: "a",
            b: "b",
            c: "c",
            d: "d"
        },
        correct: "c"
    },
    {
        question: "4.",
        answers:{
            a: "a",
            b: "b",
            c: "c",
            d: "d"
        },
        correct: "d"
    },
    {
        question: "5.",
        answers:{
            a: "a",
            b: "b",
            c: "c",
            d: "d"
        },
        correct: "a"
    },
];
var scores = [];

if(localStorage.getItem("scores") == null){
    storescores();
  }
  else{
    getscores();
}


var myTimer = document.querySelector("#theTimer");
var gameOver;
var startButton = document.querySelector("#starto");
var resetButton = document.querySelector("#reseto");
var questionDisplay = document.querySelector("#question");
var aDisplay = document.querySelector("#answerA");
var bDisplay = document.querySelector("#answerB");
var cDisplay = document.querySelector("#answerC");
var dDisplay = document.querySelector("#answerD");
var answerButtons = document.querySelectorAll(".answers");
var resultsDisplay = document.querySelector("#results");
var gameDisplay = document.querySelector("#gameDisplay");
var highScoreList = document.querySelector("#highScore");
var submitScoreBtn = document.querySelector("#submitScore");
var myForm = document.querySelector("#myForm");
var input = myForm.elements['nickName'];
var secondsLeft = 60;
var current = 0;
var timerInterval;
var total;

myForm.style.visibility = "hidden";

function storescores(){
    localStorage.setItem("scores", JSON.stringify(scores));
}
  
function getscores(){
    var tempscores = JSON.parse(localStorage.getItem("scores"));
  
    if(tempscores !== null || tempscores !== undefined){
      scores = tempscores;
    }
}

function startGame(){
    clearInterval(timerInterval);
    secondsLeft = 60;
    current = 0;
    gameOver = false;
    total = 0;
    setTime();
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].style.visibility = "visible";
    }
    resetButton.style.visibility = "hidden";
    gameDisplay.style.visibility = "visible";
    startButton.style.visibility = "hidden";
    console.log(startDiv.style.visibilty);
    resultsDisplay.style.visibility = "hidden";
    myForm.style.visibility = "hidden";
    
    showQuestions(current);
}

function endGame(result){
    myForm.style.visibility = "visible";
    resultsDisplay.style.visibility = "visible";
    for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].style.visibility = "hidden";
    }
    total += secondsLeft;
    gameOver = true;
    if(result === true){
        questionDisplay.textContent = "You win!"
    }
    else{
        questionDisplay.textContent = "You lose!"
    }    
}

function postScore(name){
    resetButton.style.visibility = "visible";
    gameDisplay.style.visibility = "hidden";
    myForm.style.visibility = "hidden";
    startButton.style.visibility = "visible";
    var newScore = {name, total};
    scores.push(newScore);
    var child = highScoreList.lastElementChild;
    while(child){
        highScoreList.removeChild(child);
        child = highScoreList.lastElementChild;
    }
    for(var i = 0; i < scores.length; i++){
        newLI = document.createElement("li");
        newLI.innerHTML = "Name: " + Object.values(scores[i])[0] + " Score: " + Object.values(scores[i])[1];
        highScoreList.append(newLI);
    }
    storescores();
}

function showQuestions(number){
    startButton.style.visibilty = "hidden";

        questionDisplay.textContent = questionBank[number].question;
        aDisplay.textContent = questionBank[number].answers.a;
        bDisplay.textContent = questionBank[number].answers.b;
        cDisplay.textContent = questionBank[number].answers.c;
        dDisplay.textContent = questionBank[number].answers.d;
    
}

function setTime() {
    myTimer.textContent = secondsLeft + " seconds left.";
    timerInterval = setInterval(function() {
        secondsLeft--;
        myTimer.textContent = secondsLeft + " seconds left.";
        if(secondsLeft === 0){
            clearInterval(timerInterval);
            endGame(false);
        }

    }, 1000);
}

function checkAnswer(input){
    if(!gameOver){
        console.log(input);
        if(input !== questionBank[current].correct){
            secondsLeft = secondsLeft - 5;
        }
        else if(input === questionBank[current].correct){
            total += 5;
        }
        if(current + 1 === questionBank.length) {
            clearInterval(timerInterval);
            endGame(true);
            return;
        }
        showQuestions(++current);
    }
}

function resetScores(){
    if(gameOver){
        localStorage.clear();
        scores = [];
        var child = highScoreList.lastElementChild;
        while(child){
        highScoreList.removeChild(child);
        child = highScoreList.lastElementChild;
        }
    }
}




myForm.addEventListener('submit', function(event){
    event.preventDefault();
    postScore(input.value);
})
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetScores);
aDisplay.addEventListener("click", function(){
    checkAnswer("a")
});
bDisplay.addEventListener("click", function(){
    checkAnswer("b")
});
cDisplay.addEventListener("click", function(){
    checkAnswer("c")
});
dDisplay.addEventListener("click", function(){
    checkAnswer("d")
});
