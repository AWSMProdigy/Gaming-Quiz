var questionBank = [
    {
        question: "1.",
        answers:{
            a: "a",
            b: "b",
            c: "c",
            d: "d"
        },
        correct: "a"
    },
    {
        question: "2.",
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
var questionDisplay = document.querySelector("#question");
var aDisplay = document.querySelector("#answerA");
var bDisplay = document.querySelector("#answerB");
var cDisplay = document.querySelector("#answerC");
var dDisplay = document.querySelector("#answerD");
var resultsDisplay = document.querySelector("#results");
var scoreDisplay = document.querySelector("#scores");
var secondsLeft = 60;
var current = 0;

function storescores(){
    localStorage.setItem("scores", JSON.stringify(scores));
}
  
  function getscores(){
    var tempscores = JSON.parse(localStorage.getItem("scores"));
    console.log(tempscores);
  
    if(tempscores !== null || tempscores !== undefined){
      scores = tempscores;
    }
}

function startGame(){
    gameOver = false;
    setTime();
    aDisplay.style.visibility = "visible";
    bDisplay.style.visibility = "visible";
    cDisplay.style.visibility = "visible";
    dDisplay.style.visibility = "visible";
    startButton.style.visibilty = "hidden";
    showQuestions(current);
}

function endGame(result){
    gameOver = true;
    console.log("Game over!");
    if(result === true){
        questionDisplay.textContent = "You win! Play again?"
    }
    else{
        questionDisplay.textContent = "You lose! Play again?"
    }
    var outcome = {"name" : "xxx", "score": 69};
    scores.push(outcome);
    scoreDisplay.innterText = scores[scores.length];
    storescores();

}

function showQuestions(number){
    if(questionBank[number] !== undefined){
        questionDisplay.textContent = questionBank[number].question;
        aDisplay.textContent = questionBank[number].answers.a;
        bDisplay.textContent = questionBank[number].answers.b;
        cDisplay.textContent = questionBank[number].answers.c;
        dDisplay.textContent = questionBank[number].answers.d;
    }
}

function setTime() {
    myTimer.textContent = secondsLeft + " seconds left.";
    var timerInterval = setInterval(function() {
        secondsLeft--;
        myTimer.textContent = secondsLeft + " seconds left.";

        if(current === questionBank.length) {
            clearInterval(timerInterval);
            endGame(true);
        }
        else if(secondsLeft === 0){
            clearInterval(timerInterval);
            endGame(false);
        }

    }, 1000);
}

function checkAnswer(input){
    if(!gameOver){
        console.log(input);
        if(input === questionBank[current].correct){

        }
        else{
            secondsLeft = secondsLeft - 5;
        }
        showQuestions(++current);
    }
}





startButton.addEventListener("click", startGame);
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
